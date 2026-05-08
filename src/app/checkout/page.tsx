import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import CheckoutPageClient from "@/components/checkout/CheckoutPageWrapper";
import { getPlanBySlug } from "@/lib/services/pricing";

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

  const plan = await getPlanBySlug(planSlug);

  // invalid plan
  if (!plan) {
    redirect("/pricing");
  }

  return (
    <CheckoutPageClient
      plan={{
        ...plan,
        yearlyPrice: plan.yearlyPrice ?? plan.monthlyPrice * 12,
      }}
      initialTenure={tenure}
    />
  );
}
