import { pgTable, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk User ID
  email: text("email").notNull(),
  isPro: boolean("is_pro").default(false),
  subscriptionId: text("subscription_id"), // Stripe Subscription ID
  createdAt: timestamp("created_at").defaultNow(),
});

export const progress = pgTable("progress", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  groupId: text("group_id").notNull(), // e.g., "group1"
  lessonId: text("lesson_id").notNull(), // e.g., "lesson1"
  score: integer("score").default(0),
  completedAt: timestamp("completed_at").defaultNow(),
});
