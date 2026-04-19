"use server";

import { auth } from "@/lib/auth";
import { createLink } from "@/lib/services/linkPage";
import { headers } from "next/headers";

export async function createLinkAction(
  pageId: string,
  label: string,
  url: string,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return await createLink(session.user.id, pageId, label, url);
}
