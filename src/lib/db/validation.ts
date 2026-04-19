import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { pagesTable, user } from "./schema";

export const createUserSchema = createInsertSchema(user)
  .pick({
    // username: true,
    email: true,
  })
  .extend({
    username: z
      .string()
      .min(3)
      .max(20)
      .regex(/^[a-z0-9_]+$/),
    email: z.string().email(),
  })
  .strict();

export const createPageSchema = createInsertSchema(pagesTable)
  .pick({
    title: true,
    subtitle: true,
    slug: true,
  })
  .extend({
    title: z.string().min(2),
    slug: z
      .string()
      .min(3)
      .max(50)
      .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, hyphens"),
  })
  .strict();
export type CreatePageInput = z.infer<typeof createPageSchema>;
