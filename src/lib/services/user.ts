import db from "../db/drizzle";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";

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
