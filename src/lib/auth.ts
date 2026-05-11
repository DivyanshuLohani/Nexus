import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "./db/drizzle";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins"; // Import customSession
import {
  account,
  session,
  user,
  verification,
  plansTable,
  DbUser,
} from "./db/schema"; // Import plansTable
import { eq } from "drizzle-orm";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      account,
      verification,
      session,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),

    customSession(async ({ user, session }) => {
      // Fetch the full plan data based on activePlanId
      let plan = null;
      if ((user as DbUser).activePlanId) {
        const result = await db
          .select()
          .from(plansTable)
          .where(eq(plansTable.id, (user as DbUser).activePlanId as string))
          .limit(1);
        plan = result[0] || null;
      }

      return {
        user: {
          ...user,
          plan, // Include full plan object (or null if no plan)
        },
        session,
      };
    }),
  ],
  user: {
    additionalFields: {
      activePlanId: {
        type: "string",
        required: false,
        input: false,
      },
      activePlanValidUntil: {
        type: "date",
        required: false,
        input: false,
      },
    },
  },
});
