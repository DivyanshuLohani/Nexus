"use server";
import { auth } from "@/lib/auth";
import { updateLink } from "@/lib/services/linkPage";
import { headers } from "next/headers";
import db from "../db/drizzle";
import { linksTable, pagesTable } from "../db/schema";
import { and, eq, isNotNull } from "drizzle-orm";
import { getLinksWithImages } from "../services/user";
import { PlanRequiredError } from "../types/errors";

export async function updateLinkAction(
  linkId: string,
  label: string,
  url: string,
  image?: string | null,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  // Check plan
  const linksWithImages = await getLinksWithImages(session.user.id);
  if (image != null) {
    if (!session.user.plan) {
      throw new PlanRequiredError("You need a plan to create image links");
    }

    if (linksWithImages.length + 1 > session.user.plan.maxLinkImages) {
      throw new PlanRequiredError("You have reached your image link limit");
    }
  }

  return await updateLink(session.user.id, linkId, label, url, image);
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
