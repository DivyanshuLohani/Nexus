"use server";
import { auth } from "@/lib/auth";
import { deleteLink } from "@/lib/services/linkPage";
import { headers } from "next/headers";

export async function deleteLinkAction(linkId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return await deleteLink(session.user.id, linkId);
}
