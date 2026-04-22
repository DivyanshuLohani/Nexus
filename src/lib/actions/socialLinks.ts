"use server";
import { nanoid } from "nanoid";
import { pageSocials, pagesTable } from "../db/schema";
import db from "../db/drizzle";
import { headers } from "next/headers";
import { auth } from "../auth";
import { eq } from "drizzle-orm";

/**
 * 🔐 helper: ensure user owns page
 */
async function assertOwnership(pageId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const page = await db
    .select()
    .from(pagesTable)
    .where(eq(pagesTable.id, pageId))
    .limit(1);

  if (!page.length || page[0].userId !== session.user.id) {
    throw new Error("Forbidden");
  }

  return session.user.id;
}

export async function createSocialLink(
  pageId: string,
  platform: string,
  url: string,
) {
  await assertOwnership(pageId);

  const id = nanoid();

  const [created] = await db
    .insert(pageSocials)
    .values({
      id,
      pageId,
      platform,
      url,
    })
    .returning();

  return created;
}

export async function updateSocialLink(
  id: string,
  platform: string,
  url: string,
) {
  // get social first
  const existing = await db
    .select()
    .from(pageSocials)
    .where(eq(pageSocials.id, id))
    .limit(1);

  if (!existing.length) throw new Error("Not found");

  // 🔐 check ownership via page
  await assertOwnership(existing[0].pageId);

  const [updated] = await db
    .update(pageSocials)
    .set({
      platform,
      url,
    })
    .where(eq(pageSocials.id, id))
    .returning();

  return updated;
}

export async function deleteSocialLink(id: string) {
  const existing = await db
    .select()
    .from(pageSocials)
    .where(eq(pageSocials.id, id))
    .limit(1);

  if (!existing.length) throw new Error("Not found");

  // 🔐 check ownership
  await assertOwnership(existing[0].pageId);

  await db.delete(pageSocials).where(eq(pageSocials.id, id));

  return { success: true };
}
