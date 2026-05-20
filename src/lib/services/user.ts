import { headers } from "next/headers";
import { auth } from "../auth";
import db from "../db/drizzle";
import { linksTable, pagesTable, user } from "../db/schema";
import { and, eq, isNotNull } from "drizzle-orm";

export async function getUserById(userId: string) {
  const dbUser = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1)
    .then((res) => res[0] ?? null);
  return dbUser;
}

export async function getUserByEmail(email: string) {
  const dbUser = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1)
    .then((res) => res[0] ?? null);
  return dbUser;
}

export async function getLinksWithImages(userId: string) {
  const linksWithImages = await db
    .select({
      linkId: linksTable.id,
      label: linksTable.label,
      url: linksTable.url,
      image: linksTable.image,
      pageId: pagesTable.id,
      pageTitle: pagesTable.title,
    })
    .from(linksTable)
    .innerJoin(pagesTable, eq(linksTable.pageId, pagesTable.id))
    .where(
      and(
        eq(pagesTable.userId, userId), // specific user id
        isNotNull(linksTable.image), // only links with images
      ),
    );

  return linksWithImages;
}
