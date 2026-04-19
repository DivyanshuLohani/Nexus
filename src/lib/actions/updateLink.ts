"use server";
import { auth } from "@/lib/auth";
import { updateLink } from "@/lib/services/linkPage";
import { headers } from "next/headers";

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
