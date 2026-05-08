"use server";

import { eq } from "drizzle-orm";
import db from "../db/drizzle";
import { plansTable } from "../db/schema";

export async function getPlanBySlug(slug: string) {
  const plan = await db
    .select()
    .from(plansTable)
    .where(eq(plansTable.slug, slug))
    .limit(1)
    .then((res) => res[0] ?? null);
  return plan;
}
