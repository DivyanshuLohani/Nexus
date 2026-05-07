"use client";

import { useState } from "react";

import BillingToggle from "./billing-toggle";
import PricingCard from "./pricing-card";
import { DbPlan } from "@/lib/db/schema";

interface Props {
  plans: DbPlan[];
}

export default function PricingGridClient({ plans }: Props) {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="px-6 pb-20">
      <BillingToggle yearly={yearly} setYearly={setYearly} />

      <div
        className="
          max-w-7xl mx-auto
          grid gap-6
          md:grid-cols-3
        "
      >
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={{
              ...plan,
              price: yearly
                ? plan.yearlyPrice || plan.monthlyPrice * 12
                : plan.monthlyPrice,
            }}
            yearly={yearly}
          />
        ))}
      </div>
    </section>
  );
}
