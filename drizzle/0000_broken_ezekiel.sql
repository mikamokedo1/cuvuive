CREATE TABLE "course_access" (
	"id" text PRIMARY KEY NOT NULL,
	"course_id" text NOT NULL,
	"group_id" text NOT NULL,
	"lesson_id" text NOT NULL,
	"access_type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "progress" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"group_id" text NOT NULL,
	"lesson_id" text NOT NULL,
	"score" integer DEFAULT 0,
	"completed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"is_pro" boolean DEFAULT false,
	"subscription_id" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;