"use server";
import db from "../db/drizzle";
import { linksTable, pagesTable, user } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { CreatePageInput, createPageSchema } from "../db/validation";
import { nanoid } from "nanoid";

export async function getUserDefaultPage(userId: string) {
  const page = await db
    .select()
    .from(pagesTable)
    .where(and(eq(pagesTable.userId, userId), eq(pagesTable.isDefault, true)))
    .limit(1);

  if (!page || page.length === 0) {
    // We have to create that default page
    return await createDefaultPage(userId);
  }

  return page[0] ?? null;
}
export async function getPageBySlug(userId: string, slug: string) {
  const rows = await db
    .select({
      page: pagesTable,
      link: linksTable,
    })
    .from(pagesTable)
    .leftJoin(linksTable, eq(linksTable.pageId, pagesTable.id))
    .where(and(eq(pagesTable.userId, userId), eq(pagesTable.slug, slug)));

  if (!rows.length) return null;

  // 🧠 extract page once
  const page = rows[0].page;

  // 🧠 collect links (filter nulls from left join)
  const links = rows.map((r) => r.link).filter((l) => l !== null);

  return {
    ...page,
    links,
  };
}
export async function createDefaultPage(userId: string) {
  const [page] = await db
    .insert(pagesTable)
    .values({
      id: nanoid(),
      userId,
      title: "My Links",
      subtitle: "",
      slug: "home",
      isDefault: true,
    })
    .returning();

  return page;
}

export async function createPage(userId: string, data: CreatePageInput) {
  const parsed = createPageSchema.parse(data);

  const [page] = await db
    .insert(pagesTable)
    .values({
      id: nanoid(),
      userId,
      title: parsed.title,
      subtitle: parsed.subtitle ?? "",
      slug: parsed.slug,
    })
    .returning();

  return page;
}

export async function createLink(
  userId: string,
  pageId: string,
  label: string,
  url: string,
) {
  const page = await db
    .select({ id: pagesTable.id })
    .from(pagesTable)
    .where(eq(pagesTable.id, pageId))
    .limit(1);

  if (!page.length) {
    throw new Error("Page not found");
  }

  const [link] = await db
    .insert(linksTable)
    .values({
      id: nanoid(),
      pageId,
      label,
      url,
    })
    .returning();

  return link;
}

export async function deleteLink(userId: string, linkId: string) {
  const [deletedLink] = await db
    .delete(linksTable)
    .where(eq(linksTable.id, linkId))
    .returning();

  return deletedLink;
}

export async function updateLink(
  userId: string,
  linkId: string,
  label: string,
  url: string,
) {
  const [updatedLink] = await db
    .update(linksTable)
    .set({
      label,
      url,
    })
    .where(eq(linksTable.id, linkId))
    .returning();

  return updatedLink;
}

export async function getPublicPage(username: string, slug?: string) {
  // 1. get user
  const [foundUser] = await db
    .select()
    .from(user)
    .where(eq(user.name, username));

  if (!foundUser) return null;

  // 2. get page
  const pageQuery = slug
    ? and(eq(pagesTable.userId, foundUser.id), eq(pagesTable.slug, slug))
    : and(eq(pagesTable.userId, foundUser.id), eq(pagesTable.isDefault, true));

  const rows = await db
    .select({
      page: pagesTable,
      link: linksTable,
    })
    .from(pagesTable)
    .leftJoin(linksTable, eq(linksTable.pageId, pagesTable.id))
    .where(pageQuery);

  if (!rows.length) return null;

  const page = rows[0].page;

  const links = rows.map((r) => r.link).filter((l) => l !== null);

  return {
    user: foundUser,
    page,
    links,
  };
}
