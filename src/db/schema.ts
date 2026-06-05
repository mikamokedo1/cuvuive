import { pgTable, text, timestamp, integer, boolean, uniqueIndex, serial, index, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  // ... (unchanged)
  id: text("id").primaryKey(), // Clerk User ID
  email: text("email").notNull(),
  isPro: boolean("is_pro").default(false),
  subscriptionId: text("subscription_id"), // Stripe Subscription ID
  currentStreak: integer("current_streak").default(0),
  lastActiveDate: timestamp("last_active_date", { withTimezone: true }),
  weeklyReportEnabled: boolean("weekly_report_enabled").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "cancelled", "expired"]);
export const orderStatusEnum = pgEnum("order_status", ["pending", "paid", "cancelled"]);

export const userActivityLogs = pgTable(
  "user_activity_logs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: timestamp("date", { withTimezone: true }).notNull(), // The exact day (start of day) the activity occurred
  },
  (table) => {
    return {
      uniqueUserDate: uniqueIndex("unique_user_date_idx").on(table.userId, table.date),
    };
  },
);

export const progress = pgTable(
  "progress",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull().default("learn-numbers"),
    groupId: text("group_id").notNull(), // e.g., "group1"
    lessonId: text("lesson_id").notNull(), // e.g., "lesson1"
    score: integer("score").default(0),
    completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index("progress_user_id_idx").on(table.userId),
      progressLookupIdx: index("progress_lookup_idx").on(table.userId, table.courseId, table.groupId, table.lessonId),
    };
  },
);

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

export const groups = pgTable(
  "groups",
  {
    id: text("id").primaryKey(), // UUID
    slug: text("slug").notNull(), // e.g., "group1"
    courseId: text("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    sortIndex: integer("sort_index").default(0),
  },
  (table) => {
    return {
      courseSlugIdx: index("groups_course_slug_idx").on(table.courseId, table.slug),
    };
  },
);

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
      courseIdIdx: index("lessons_course_id_idx").on(table.courseId),
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

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    planId: text("plan_id")
      .notNull()
      .references(() => plans.id, { onDelete: "cascade" }),
    status: subscriptionStatusEnum("status").notNull(), // "active", "cancelled", "expired"
    startDate: timestamp("start_date", { withTimezone: true }).defaultNow(),
    endDate: timestamp("end_date", { withTimezone: true }),
    paymentProvider: text("payment_provider"), // "vnpay", "manual", "sepay"
    transactionId: text("transaction_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return {
      userStatusDateIdx: index("subscriptions_user_status_date_idx").on(table.userId, table.status, table.endDate),
      planIdIdx: index("subscriptions_plan_id_idx").on(table.planId),
    };
  },
);

export const orders = pgTable(
  "orders",
  {
    // Using serial for a short ID that's easy to embed in standard bank transfer descriptions
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    planId: text("plan_id")
      .notNull()
      .references(() => plans.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(),
    status: orderStatusEnum("status").notNull().default("pending"), // "pending", "paid", "cancelled"
    cartCode: text("cart_code").notNull(), // e.g. "CUVUIVE1045"
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index("orders_user_id_idx").on(table.userId),
      planIdIdx: index("orders_plan_id_idx").on(table.planId),
    };
  },
);

export const feedbacks = pgTable(
  "feedbacks",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").references(() => users.id), // Nullable for guest feedback
    title: text("title").notNull(),
    description: text("description").notNull(),
    email: text("email").notNull(),
    phone: text("phone"), // Optional
    isResponded: boolean("is_responded").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index("feedbacks_user_id_idx").on(table.userId),
    };
  },
);

// ============================================
// REFERRAL SYSTEM
// ============================================

export const referralCodes = pgTable(
  "referral_codes",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    code: text("code").notNull(), // Short 8-char code, e.g. "ABC12345"
    commissionPercent: integer("commission_percent").notNull().default(10), // % commission, default 10%
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return {
      uniqueUserIdx: uniqueIndex("referral_codes_user_idx").on(table.userId),
      uniqueCodeIdx: uniqueIndex("referral_codes_code_idx").on(table.code),
    };
  },
);

export const referralStatusEnum = pgEnum("referral_status", ["pending", "confirmed"]);

export const referrals = pgTable(
  "referrals",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    referrerUserId: text("referrer_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    referredUserId: text("referred_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    orderId: integer("order_id").references(() => orders.id), // Nullable, set when referred user pays
    commissionRate: integer("commission_rate"), // 10 or 20 (%)
    commissionAmount: integer("commission_amount"), // VND, calculated when order is paid
    status: referralStatusEnum("status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  },
  (table) => {
    return {
      referrerIdx: index("referrals_referrer_idx").on(table.referrerUserId),
      referredIdx: uniqueIndex("referrals_referred_idx").on(table.referredUserId), // One referrer per user
    };
  },
);

export const withdrawalStatusEnum = pgEnum("withdrawal_status", ["pending", "processing", "completed", "rejected"]);

export const withdrawals = pgTable(
  "withdrawals",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(), // VND
    status: withdrawalStatusEnum("status").notNull().default("pending"),
    bankName: text("bank_name").notNull(),
    bankAccount: text("bank_account").notNull(),
    bankAccountName: text("bank_account_name").notNull(),
    note: text("note"), // Admin note
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    processedAt: timestamp("processed_at", { withTimezone: true }),
  },
  (table) => {
    return {
      userIdIdx: index("withdrawals_user_id_idx").on(table.userId),
      userStatusIdx: index("withdrawals_user_status_idx").on(table.userId, table.status),
    };
  },
);

// ============================================
// LEARNING SESSIONS (Parent Dashboard)
// ============================================

export const learningSessions = pgTable(
  "learning_sessions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    endedAt: timestamp("ended_at", { withTimezone: true }),
    durationSeconds: integer("duration_seconds").default(0),
  },
  (table) => {
    return {
      userIdIdx: index("learning_sessions_user_id_idx").on(table.userId),
      userDateIdx: index("learning_sessions_user_date_idx").on(table.userId, table.startedAt),
    };
  },
);

// ============================================
// LEADERBOARD SCORES (Cached/Materialized)
// ============================================

export const leaderboardScores = pgTable(
  "leaderboard_scores",
  {
    userId: text("user_id")
      .primaryKey()
      .references(() => users.id, { onDelete: "cascade" }),
    totalLessons: integer("total_lessons").notNull().default(0),
    totalMinutes: integer("total_minutes").notNull().default(0),
    currentStreak: integer("current_streak").notNull().default(0),
    smartScore: integer("smart_score").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => {
    return {
      smartScoreIdx: index("idx_leaderboard_smart_score").on(table.smartScore),
    };
  },
);
