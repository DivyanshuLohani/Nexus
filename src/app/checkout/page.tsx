"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import BillingOptionCard from "@/components/checkout/BillingOptionCard";
import OrderSummary from "@/components/checkout/OrderSummary";
import ProceedPaymentButton from "@/components/checkout/ProceedPaymentButton";

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();

  const planParam = "pro";

  const tenureParam =
    (params.get("tenure") as "monthly" | "yearly") ?? "monthly";

  // const plan = plans[planParam];

  const [tenure, setTenure] = useState<"monthly" | "yearly">(tenureParam);

  const monthlyPrice = 100;
  const yearlyPrice = 1200;

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

        {/* title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Pro plan</h1>

          <p className="text-muted-foreground">Choose your billing cycle</p>
        </div>

        {/* billing options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <BillingOptionCard
            title="Monthly"
            subtitle={`USD ${monthlyPrice}/month`}
            selected={tenure === "monthly"}
            onClick={() => {
              setTenure("monthly");

              router.replace(`/checkout?plan=${planParam}&tenure=monthly`, {
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

              router.replace(`/checkout?plan=${planParam}&tenure=yearly`, {
                scroll: false,
              });
            }}
          />
        </div>

        {/* summary */}
        <OrderSummary planName={"Pro Plan"} tenure={tenure} amount={amount} />

        <ProceedPaymentButton />
      </div>
    </main>
  );
}
