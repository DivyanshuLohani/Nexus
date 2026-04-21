"use server";

import db from "@/lib/db/drizzle";
import { IconStyle, pagesTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { v2 as cloudinary } from "cloudinary";

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
