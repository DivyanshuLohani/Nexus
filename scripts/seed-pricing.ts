import db from "@/lib/db/drizzle";
import { plansTable } from "@/lib/db/schema";

async function seedPricing() {
  console.log("🌱 Seeding pricing plans...");

  await db.insert(plansTable).values([
    {
      name: "Free",
      slug: "free",

      description: "Perfect for getting started.",

      featured: false,
      mostPopular: false,
      shownInPricing: true,

      monthlyPrice: 0,
      yearlyPrice: 0,

      maxLinks: 10,
      maxLinkImages: 2,

      includedLayouts: ["stack"],

      branding: true,

      analytics: false,
      detailedAnalytics: false,

      customDomains: false,

      prioritySupport: false,

      active: true,
    },

    {
      name: "Pro",
      slug: "pro",

      description: "Best for creators and professionals.",

      featured: true,
      mostPopular: true,
      shownInPricing: true,

      monthlyPrice: 12,
      yearlyPrice: 120,

      maxLinks: 500,
      maxLinkImages: 100,

      includedLayouts: ["stack", "grid", "carousel", "minimal"],

      branding: false,

      analytics: true,
      detailedAnalytics: true,

      customDomains: true,

      prioritySupport: true,

      active: true,
    },

    {
      name: "Business",
      slug: "business",

      description: "Advanced features for teams and brands.",

      featured: false,
      mostPopular: false,
      shownInPricing: true,

      monthlyPrice: 39,
      yearlyPrice: 390,

      maxLinks: 5000,
      maxLinkImages: 1000,

      includedLayouts: ["stack", "grid", "carousel", "minimal", "immersive"],

      branding: false,

      analytics: true,
      detailedAnalytics: true,

      customDomains: true,

      prioritySupport: true,

      active: true,
    },
  ]);

  console.log("✅ Pricing plans seeded");
}

seedPricing()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed");
    console.error(err);

    process.exit(1);
  });
