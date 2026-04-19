"use server";

import db from "@/lib/db/drizzle";
import { pagesTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function updatePageAction(
  pageId: string,
  title: string,
  subtitle: string,
) {
  const [updated] = await db
    .update(pagesTable)
    .set({
      title,
      subtitle,
      updatedAt: new Date(),
    })
    .where(eq(pagesTable.id, pageId))
    .returning();

  return updated;
}
