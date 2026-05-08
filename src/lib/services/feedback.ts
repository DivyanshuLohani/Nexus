"use server";
import db from "@/lib/db/drizzle";
import { feedbacksTable } from "@/lib/db/schema";
import { nanoid } from "nanoid";

export async function createFeedback({
  userId,
  name,
  email,
  message,
  context,
}: {
  userId?: string | null;
  name?: string | null;
  email?: string | null;
  message: string;
  context?: string | null;
}) {
  const [created] = await db
    .insert(feedbacksTable)
    .values({
      id: nanoid(),
      userId: userId ?? null,
      name: name?.trim() || null,
      email: email?.trim() || null,
      message: message.trim(),
      context: context?.trim() || "feedback",
    })
    .returning();

  return created;
}
