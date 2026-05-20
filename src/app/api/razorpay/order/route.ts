import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { createOrder, getPlanBySlug } from "@/lib/services/pricing";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Authentication required to create a payment order." },
      { status: 401 },
    );
  }

  // 🛡️ Block if user already has an active plan
  const hasActivePlan = !!(
    (session.user as any).activePlanId &&
    (session.user as any).activePlanValidUntil &&
    new Date((session.user as any).activePlanValidUntil) > new Date()
  );

  if (hasActivePlan) {
    return NextResponse.json(
      { error: "You already have an active plan." },
      { status: 400 },
    );
  }

  const payload = await request.json();
  const planSlug = payload?.planSlug;
  const tenure = payload?.tenure;

  if (!planSlug || (tenure !== "monthly" && tenure !== "yearly")) {
    return NextResponse.json(
      { error: "Invalid planSlug or tenure supplied." },
      { status: 400 },
    );
  }

  const plan = await getPlanBySlug(planSlug);

  if (!plan) {
    return NextResponse.json(
      { error: "The selected pricing plan could not be found." },
      { status: 400 },
    );
  }

  try {
    const order = await createOrder(session.user.id, plan.id, tenure);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to create Razorpay order." },
      { status: 500 },
    );
  }
}
