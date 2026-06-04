-- Add weekly_report_enabled to users
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "weekly_report_enabled" boolean DEFAULT true;

-- Create learning_sessions table
CREATE TABLE IF NOT EXISTS "learning_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"course_id" text NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ended_at" timestamp with time zone,
	"duration_seconds" integer DEFAULT 0
);

-- Add foreign key
DO $$ BEGIN
 ALTER TABLE "learning_sessions" ADD CONSTRAINT "learning_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Add indexes
CREATE INDEX IF NOT EXISTS "learning_sessions_user_id_idx" ON "learning_sessions" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "learning_sessions_user_date_idx" ON "learning_sessions" USING btree ("user_id","started_at");
