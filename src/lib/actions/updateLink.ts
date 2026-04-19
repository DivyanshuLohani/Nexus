"use server";
import { auth } from "@/lib/auth";
import { updateLink } from "@/lib/services/linkPage";
import { headers } from "next/headers";
import db from "../db/drizzle";
import { linksTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function updateLinkAction(
  linkId: string,
  label: string,
  url: string,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return await updateLink(session.user.id, linkId, label, url);
}

interface OrderItem {
  id: string;
  order: number;
}

export async function updateLinksOrderAction(items: OrderItem[]) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    // 🔥 run all updates in parallel
    await Promise.all(
      items.map((item) =>
        db
          .update(linksTable)
          .set({ order: item.order })
          .where(eq(linksTable.id, item.id)),
      ),
    );

    return { success: true };
  } catch (err) {
    console.error("Order update failed:", err);
    throw new Error("Failed to update order");
  }
}
