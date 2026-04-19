import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

declare global {
  var __drizzleDb: ReturnType<typeof drizzle> | undefined;
}

const db = (globalThis.__drizzleDb ??= drizzle(process.env.DATABASE_URL));

export default db;
