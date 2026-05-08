import crypto from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import Razorpay from "razorpay";
import { auth } from "@/lib/auth";
import db from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";
import { plansTable, user } from "@/lib/db/schema";
import { createTransaction } from "@/lib/services/pricing";

const getRazorpayClient = () => {
  const keyId = process.env.RAZORPAY_KEY;
  const keySecret = process.env.RAZORPAY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("RAZORPAY_KEY and RAZORPAY_SECRET are required");
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
};

const verifySignature = (
  orderId: string,
  paymentId: string,
  signature: string,
) => {
  const secret = process.env.RAZORPAY_SECRET;
  if (!secret) {
    throw new Error("RAZORPAY_SECRET is required for signature verification.");
  }

  const payload = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return expected === signature;
};

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Authentication required to verify payment." },
      { status: 401 },
    );
  }

  const payload = await request.json();
  const razorpayOrderId = payload?.razorpay_order_id;
  const razorpayPaymentId = payload?.razorpay_payment_id;
  const razorpaySignature = payload?.razorpay_signature;

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return NextResponse.json(
      { error: "Missing Razorpay response fields." },
      { status: 400 },
    );
  }

  const isValid = verifySignature(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  );

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid payment signature." },
      { status: 400 },
    );
  }

  const razorpay = getRazorpayClient();
  const order = await razorpay.orders.fetch(razorpayOrderId);

  const planId = order?.notes?.planId as string;
  const tenure = order?.notes?.tenure;
  const userId = order?.notes?.userId;

  if (!planId || !tenure || !userId) {
    return NextResponse.json(
      { error: "Razorpay order metadata is incomplete." },
      { status: 400 },
    );
  }

  if (userId !== session.user.id) {
    return NextResponse.json(
      { error: "Payment does not belong to the authenticated user." },
      { status: 403 },
    );
  }

  const plan = await db
    .select()
    .from(plansTable)
    .where(eq(plansTable.id, planId))
    .limit(1)
    .then((res) => res[0] ?? null);

  if (!plan) {
    return NextResponse.json(
      { error: "Associated plan was not found." },
      { status: 400 },
    );
  }

  const validUntil = new Date();
  if (tenure === "yearly") {
    validUntil.setFullYear(validUntil.getFullYear() + 1);
  } else {
    // First add 1 to the date and check if the date remains the same if not then set it to the last day of the month else only increase the month
    const currentDate = validUntil.getDate();
    validUntil.setMonth(validUntil.getMonth() + 1);
    if (validUntil.getDate() !== currentDate) {
      validUntil.setDate(0); // Set to last day of previous month
    }
  }

  await db
    .update(user)
    .set({
      activePlanId: plan.id,
      activePlanValidUntil: validUntil,
    })
    .where(eq(user.id, session.user.id));

  // Log the transaction
  await createTransaction(
    session.user.id,
    plan.id,
    (order.amount as number) / 100, // Convert from paise to dollars
    tenure as "monthly" | "yearly",
    "completed",
    "razorpay",
    razorpayPaymentId,
    "captured",
  );

  return NextResponse.json({ success: true });
}
