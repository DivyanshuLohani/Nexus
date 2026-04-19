ALTER TABLE "pages" DROP CONSTRAINT "pages_slug_unique";--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "is_default" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "user_slug_idx" ON "pages" USING btree ("userId","slug");