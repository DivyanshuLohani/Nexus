import { asc, eq } from "drizzle-orm";

import PricingGridClient from "./pricing-grid-client";
import { plansTable } from "@/lib/db/schema";
import db from "@/lib/db/drizzle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PricingGrid() {
  const plans = await db
    .select()
    .from(plansTable)
    .where(eq(plansTable.active, true))
    .orderBy(asc(plansTable.monthlyPrice));

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const hasActivePlan = !!(
    (session?.user as any)?.activePlanId &&
    (session?.user as any)?.activePlanValidUntil &&
    new Date((session?.user as any).activePlanValidUntil) > new Date()
  );

  return <PricingGridClient plans={plans} hasActivePlan={hasActivePlan} />;
}
