CREATE TABLE "feedbacks" (
    "id" text PRIMARY KEY NOT NULL,
    "user_id" text,
    "name" text,
    "email" text,
    "message" text NOT NULL,
    "context" text DEFAULT 'feedback' NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "feedbacks_user_id_idx" ON "feedbacks" USING btree ("user_id");