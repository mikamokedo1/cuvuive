import { pgTable, text, timestamp, integer, boolean, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  // ... (unchanged)
  id: text("id").primaryKey(), // Clerk User ID
  email: text("email").notNull(),
  isPro: boolean("is_pro").default(false),
  subscriptionId: text("subscription_id"), // Stripe Subscription ID
  currentStreak: integer("current_streak").default(0),
  lastActiveDate: timestamp("last_active_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userActivityLogs = pgTable(
  "user_activity_logs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: timestamp("date").notNull(), // The exact day (start of day) the activity occurred
  },
  (table) => {
    return {
      uniqueUserDate: uniqueIndex("unique_user_date_idx").on(table.userId, table.date),
    };
  },
);

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

// Courses, Groups, and Lessons
export const courses = pgTable("courses", {
  id: text("id").primaryKey(), // e.g., "learn-numbers"
  title: text("title").notNull(),
  description: text("description"),
  thumbnail: text("thumbnail"),
  sortIndex: integer("sort_index").default(0),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  groups: many(groups),
}));

export const groups = pgTable("groups", {
  id: text("id").primaryKey(), // UUID
  slug: text("slug").notNull(), // e.g., "group1"
  courseId: text("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  sortIndex: integer("sort_index").default(0),
});

export const groupsRelations = relations(groups, ({ one, many }) => ({
  course: one(courses, {
    fields: [groups.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessons = pgTable(
  "lessons",
  {
    id: text("id").primaryKey(), // UUID
    slug: text("slug").notNull(), // e.g., "lesson1"
    groupId: text("group_id")
      .notNull()
      .references(() => groups.id, { onDelete: "cascade" }),
    courseId: text("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }), // Denormalized for query ease
    title: text("title").notNull(),
    isFree: boolean("is_free").default(false),
    sortIndex: integer("sort_index").default(0),
  },
  (table) => {
    return {
      // Ensure unique lesson slugs within a group
      uniqueLessonSlug: uniqueIndex("unique_lesson_slug_idx").on(table.groupId, table.slug),
    };
  },
);

export const lessonsRelations = relations(lessons, ({ one }) => ({
  group: one(groups, {
    fields: [lessons.groupId],
    references: [groups.id],
  }),
  course: one(courses, {
    fields: [lessons.courseId],
    references: [courses.id],
  }),
}));

// Deprecated: courseAccess is removed

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

export const feedbacks = pgTable("feedbacks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").references(() => users.id), // Nullable for guest feedback
  title: text("title").notNull(),
  description: text("description").notNull(),
  email: text("email").notNull(),
  phone: text("phone"), // Optional
  isResponded: boolean("is_responded").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
