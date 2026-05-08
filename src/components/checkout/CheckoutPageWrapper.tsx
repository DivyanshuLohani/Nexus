"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import BillingOptionCard from "@/components/checkout/BillingOptionCard";
import OrderSummary from "@/components/checkout/OrderSummary";
import ProceedPaymentButton from "@/components/checkout/ProceedPaymentButton";

interface Plan {
  id: string;
  name: string;
  slug: string;

  monthlyPrice: number;
  yearlyPrice: number;
}

interface Props {
  plan: Plan;

  initialTenure: "monthly" | "yearly";
}

export default function CheckoutPageClient({ plan, initialTenure }: Props) {
  const router = useRouter();

  const [tenure, setTenure] = useState<"monthly" | "yearly">(initialTenure);

  const monthlyPrice = plan.monthlyPrice;
  const yearlyPrice = plan.yearlyPrice;

  const yearlyDiscount = useMemo(() => {
    if (!monthlyPrice || !yearlyPrice) return 0;

    const original = monthlyPrice * 12;

    return Math.round(((original - yearlyPrice) / original) * 100);
  }, [monthlyPrice, yearlyPrice]);

  const amount = tenure === "monthly" ? monthlyPrice : yearlyPrice;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-xl mx-auto px-6 py-10">
        <CheckoutHeader />

        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{plan.name} plan</h1>

          <p className="text-muted-foreground">Choose your billing cycle</p>
        </div>

        {/* OPTIONS */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <BillingOptionCard
            title="Monthly"
            subtitle={`USD ${monthlyPrice}/month`}
            selected={tenure === "monthly"}
            onClick={() => {
              setTenure("monthly");

              router.replace(`/checkout?plan=${plan.slug}&tenure=monthly`, {
                scroll: false,
              });
            }}
          />

          <BillingOptionCard
            title="Yearly"
            subtitle={`USD ${yearlyPrice}/year`}
            badge={yearlyDiscount > 0 ? `Save ${yearlyDiscount}%` : undefined}
            selected={tenure === "yearly"}
            onClick={() => {
              setTenure("yearly");

              router.replace(`/checkout?plan=${plan.slug}&tenure=yearly`, {
                scroll: false,
              });
            }}
          />
        </div>

        {/* SUMMARY */}
        <OrderSummary planName={plan.name} tenure={tenure} amount={amount} />

        {/* PAYMENT */}
        <ProceedPaymentButton
          planSlug={plan.slug}
          planName={plan.name}
          tenure={tenure}
          amount={amount}
        />
      </div>
    </main>
  );
}
