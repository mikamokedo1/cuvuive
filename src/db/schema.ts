import { pgTable, text, timestamp, integer, boolean, uniqueIndex } from "drizzle-orm/pg-core";

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
  courseId: text("course_id").notNull().default("learn-numbers"),
  groupId: text("group_id").notNull(), // e.g., "group1"
  lessonId: text("lesson_id").notNull(), // e.g., "lesson1"
  score: integer("score").default(0),
  completedAt: timestamp("completed_at").defaultNow(),
});

// Access control for freemium model
export const courseAccess = pgTable(
  "course_access",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    courseId: text("course_id").notNull(), // e.g., "learn-numbers"
    groupId: text("group_id").notNull(), // e.g., "group1"
    lessonId: text("lesson_id").notNull(), // e.g., "lesson1"
    accessType: text("access_type").notNull(), // "free" | "premium"
  },
  (table) => {
    return {
      uniqeLesson: uniqueIndex("course_access_unique_lesson_idx").on(table.courseId, table.groupId, table.lessonId),
    };
  },
);

export const plans = pgTable("plans", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(), // "Lớp Mầm", "Lớp Chồi", "Lớp Lá"
  code: text("code").notNull().unique(), // "seed", "bud", "leaf"
  price: integer("price").notNull(),
  durationMonths: integer("duration_months").notNull(),
  description: text("description"),
});

export const subscriptions = pgTable("subscriptions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  planId: text("plan_id")
    .notNull()
    .references(() => plans.id),
  status: text("status").notNull(), // "active", "cancelled", "expired"
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  paymentProvider: text("payment_provider"), // "vnpay", "manual"
  transactionId: text("transaction_id"),
  createdAt: timestamp("created_at").defaultNow(),
});
