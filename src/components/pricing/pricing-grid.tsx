import { asc, eq } from "drizzle-orm";

import PricingGridClient from "./pricing-grid-client";
import { plansTable } from "@/lib/db/schema";
import db from "@/lib/db/drizzle";

export default async function PricingGrid() {
  const plans = await db
    .select()
    .from(plansTable)
    .where(eq(plansTable.active, true))
    .orderBy(asc(plansTable.monthlyPrice));

  return <PricingGridClient plans={plans} />;
}
