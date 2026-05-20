import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import CheckoutPageClient from "@/components/checkout/CheckoutPageWrapper";
import { getPlanBySlug } from "@/lib/services/pricing";
import { Suspense } from "react";
import CheckoutPageSkeleton from "@/components/checkout/CheckoutSkeleton";

interface Props {
  searchParams: Promise<{
    plan?: string;
    tenure?: "monthly" | "yearly";
  }>;
}

export default async function CheckoutPage({ searchParams }: Props) {
  const params = await searchParams;

  const planSlug = params.plan ?? "pro";
  const tenure = params.tenure ?? "monthly";

  // 🔐 session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/auth/signup?plan=${planSlug}&tenure=${tenure}`);
  }

  // 🛡️ Block if user already has an active plan
  const hasActivePlan = !!(
    (session.user as any).activePlanId &&
    (session.user as any).activePlanValidUntil &&
    new Date((session.user as any).activePlanValidUntil) > new Date()
  );

  if (hasActivePlan) {
    redirect("/dashboard");
  }

  const plan = await getPlanBySlug(planSlug);

  // invalid plan
  if (!plan) {
    redirect("/pricing");
  }

  return (
    <Suspense fallback={<CheckoutPageSkeleton />}>
      <CheckoutPageClient
        plan={{
          ...plan,
          yearlyPrice: plan.yearlyPrice ?? plan.monthlyPrice * 12,
        }}
        initialTenure={tenure}
      />
    </Suspense>
  );
}
