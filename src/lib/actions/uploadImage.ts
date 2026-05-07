"use server";

import { v2 as cloudinary } from "cloudinary";

export async function uploadImageAction(formData: FormData): Promise<string> {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file provided");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Invalid file type. Please upload an image.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size exceeds 5MB limit");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Upload to Cloudinary
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const upload = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "linktree/links",
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: "auto" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      )
      .end(buffer);
  });

  return upload.secure_url;
}
