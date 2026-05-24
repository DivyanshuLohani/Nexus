"use server";

import db from "@/lib/db/drizzle";
import { IconStyle, PageLayout, pagesTable } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "../auth";
import { headers } from "next/headers";
import { isValidBackground } from "../background-validator";

export async function updatePageAction(pageId: string, subtitle: string) {
  const [updated] = await db
    .update(pagesTable)
    .set({
      subtitle,
      updatedAt: new Date(),
    })
    .where(eq(pagesTable.id, pageId))
    .returning();

  return updated;
}

export async function updatePageImageAction(
  pageId: string,
  formData: FormData,
) {
  const file = formData.get("file") as File;

  if (!file) throw new Error("No file");
  if (!file.type.startsWith("image/")) {
    throw new Error("Invalid file type");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Max size 5MB");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 🔥 upload to cloudinary
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const upload = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "linktree",
          transformation: [
            { width: 300, height: 300, crop: "fill", gravity: "face" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      )
      .end(buffer);
  });

  // ✅ save to DB
  const [updated] = await db
    .update(pagesTable)
    .set({
      image: upload.secure_url,
      updatedAt: new Date(),
    })
    .where(eq(pagesTable.id, pageId))
    .returning();

  return updated;
}

export async function updatePageAppearanceAction(
  pageId: string,
  background: string,
  textColor: string,
  iconStyle: IconStyle,
  iconsOff: boolean = false,
) {
  if (!isValidBackground(background)) {
    throw new Error("Invalid background value");
  }

  const [updated] = await db
    .update(pagesTable)
    .set({
      background,
      textColor,
      updatedAt: new Date(),
      iconStyle,
      iconsOff,
    })
    .where(eq(pagesTable.id, pageId))
    .returning();

  return updated;
}

export async function updatePageBrandingStatusAction(
  pageId: string,
  brandingBadge: boolean,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw Error("Unauthenticated");
  // Check plan if user can perform this action
  if (!session.user.plan || !session.user.plan.branding)
    throw Error("Cannot perform this action. Mission Permissions");

  const [page] = await db
    .update(pagesTable)
    .set({
      brandingBadge,
      updatedAt: new Date(),
    })
    .where(eq(pagesTable.id, pageId))
    .returning();

  return page;
}

export async function updatePageLayoutAction(
  pageId: string,
  layout: PageLayout,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw Error("Unauthenticated");
  }

  const allowedLayouts = session.user.plan?.includedLayouts ?? [];

  const normalizedLayout = layout.toLowerCase();

  const canUseLayout = allowedLayouts.includes(normalizedLayout);

  if (!canUseLayout) {
    throw Error("Your current plan does not include this layout");
  }

  const [page] = await db
    .update(pagesTable)
    .set({
      layout,
      updatedAt: new Date(),
    })
    .where(
      and(eq(pagesTable.userId, session.user.id), eq(pagesTable.id, pageId)),
    )
    .returning();

  if (!page) {
    throw Error("Page not found");
  }

  return page;
}
