import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  yearly: boolean;
  hasActivePlan: boolean;

  plan: {
    id: string;
    name: string;
    description: string | null;
    slug: string;

    price: number;

    featured: boolean;
    mostPopular: boolean;

    maxLinks: number;
    maxLinkImages: number;

    analytics: boolean;
    detailedAnalytics: boolean;

    customDomains: boolean;
    prioritySupport: boolean;

    includedLayouts: string[];

    monthlyPrice: number;
    yearlyPrice: number;
  };
}

export default function PricingCard({ plan, yearly, hasActivePlan }: Props) {
  const features = [
    `${plan.maxLinks} links`,
    `${plan.maxLinkImages} image uploads`,
    `${plan.includedLayouts.length} layouts included`,
    plan.analytics && "Analytics",
    plan.detailedAnalytics && "Detailed analytics",
    plan.customDomains && "Custom domains",
    plan.prioritySupport && "Priority support",
  ].filter(Boolean);
  const router = useRouter();
  const discountPercentage = Math.round(
    ((plan.monthlyPrice * 12 - plan.yearlyPrice) / (plan.monthlyPrice * 12)) *
      100,
  );
  return (
    <div
      className={`
        relative rounded-md p-8
        transition-all duration-300
        border

        ${
          plan.featured
            ? "border-primary bg-primary text-primary-foreground scale-[1.02]"
            : "border-border bg-card text-card-foreground"
        }
      `}
    >
      {plan.mostPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
          Recommended
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>

        <div className="flex items-end gap-1">
          <span className="text-5xl font-black">${plan.price}</span>

          <span
            className={
              plan.featured
                ? "text-primary-foreground/70"
                : "text-muted-foreground"
            }
          >
            /{yearly ? "yr" : "mo"}
          </span>
        </div>

        {yearly && discountPercentage > 0 && (
          <div
            className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              plan.featured
                ? "bg-primary-foreground/15 text-primary-foreground"
                : "bg-green-100 text-green-700"
            }`}
          >
            Save {discountPercentage}% anually
          </div>
        )}
        <p
          className={`mt-4 text-sm ${
            plan.featured
              ? "text-primary-foreground/70"
              : "text-muted-foreground"
          }`}
        >
          {plan.description}
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {features.map((feature) => (
          <div
            key={feature as string}
            className="flex items-center gap-3 text-sm"
          >
            <Check size={16} />

            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          if (hasActivePlan) return;
          router.push(
            `/auth/signup?plan=${plan.slug}&tenure=${yearly ? "yearly" : "monthly"}`,
          );
        }}
        disabled={hasActivePlan}
        className={`
          w-full py-3 rounded-xl font-medium transition
          ${hasActivePlan ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${
            plan.featured
              ? "bg-background text-foreground hover:bg-background/90"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }
        `}
      >
        {hasActivePlan ? "Plan Active" : "Get Started"}
      </button>
    </div>
  );
}
