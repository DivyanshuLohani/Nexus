import { Suspense } from "react";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

import PricingCTA from "@/components/pricing/pricing-cta";
import PricingFAQ from "@/components/pricing/pricing-faq";
import PricingGrid from "@/components/pricing/pricing-grid";
import PricingGridSkeleton from "@/components/pricing/pricing-grid-skeleton";
import PricingHero from "@/components/pricing/pricing-hero";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <PricingHero />

      <Suspense fallback={<PricingGridSkeleton />}>
        <PricingGrid />
      </Suspense>

      <PricingFAQ />

      <PricingCTA />

      <Footer />
    </main>
  );
}
