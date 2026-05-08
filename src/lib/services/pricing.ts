"use server";

import Razorpay from "razorpay";
import { and, eq } from "drizzle-orm";
import db from "../db/drizzle";
import { plansTable, transactionsTable } from "../db/schema";

const getRazorpayClient = () => {
  const keyId = process.env.RAZORPAY_KEY;
  const keySecret = process.env.RAZORPAY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("RAZORPAY_KEY and RAZORPAY_SECRET are required");
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
};

export async function getPlanBySlug(slug: string) {
  const plan = await db
    .select()
    .from(plansTable)
    .where(and(eq(plansTable.slug, slug), eq(plansTable.active, true)))
    .limit(1)
    .then((res) => res[0] ?? null);
  return plan;
}

export async function createOrder(
  userId: string,
  planId: string,
  tenure: "monthly" | "yearly",
) {
  const plan = await db
    .select()
    .from(plansTable)
    .where(eq(plansTable.id, planId))
    .limit(1)
    .then((res) => res[0] ?? null);

  if (!plan) {
    throw new Error("Invalid plan");
  }

  const price =
    tenure === "yearly"
      ? (plan.yearlyPrice ?? plan.monthlyPrice * 12)
      : plan.monthlyPrice;

  const razorpay = getRazorpayClient();

  const order = await new Promise<unknown>((resolve, reject) => {
    razorpay.orders.create(
      {
        amount: price * 100,
        currency: "USD",
        receipt: `nx_${Date.now().toString(36)}_${Math.random()
          .toString(36)
          .slice(2, 8)}`,
        payment_capture: true,
        notes: {
          userId,
          planId: plan.id,
          tenure,
        },
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      },
    );
  });

  return order as {
    id: string;
    amount: number;
    currency: string;
  };
}

export async function createTransaction(
  userId: string,
  planId: string,
  amount: number,
  tenure: "monthly" | "yearly",
  status: "pending" | "completed" | "failed" | "refunded",
  paymentProvider: string,
  paymentProviderId: string,
  paymentProviderStatus: string,
) {
  const transaction = await db
    .insert(transactionsTable)
    .values({
      userId,
      planId,
      amount,
      tenure,
      status,
      paymentProvider,
      paymentProviderId,
      paymentProviderStatus,
    })
    .returning();

  return transaction[0];
}
