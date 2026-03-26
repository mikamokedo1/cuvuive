"use server";

import { checkUserSubscription, getUserSubscriptionDetails } from "@/libs/subscription";
import { createClient } from "@/libs/supabase/server";
import { db } from "@/db";
import { users, userActivityLogs } from "@/db/schema";
import { eq, and, gte, lte } from "drizzle-orm";

export async function getSubscriptionStatusAction(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  return await checkUserSubscription(user.id);
}

export async function getSubscriptionDetailsAction(): Promise<{ isPremium: boolean; endDate: Date | null }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isPremium: false, endDate: null };
  }

  return await getUserSubscriptionDetails(user.id);
}

/**
 * Get "today" at midnight as a UTC Date, but computed in Vietnam timezone (UTC+7).
 * This ensures all date logic uses Vietnam's calendar day, not the server's.
 */
function getVietnamToday(date: Date = new Date()): Date {
  const vnFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = vnFormatter.format(date).split("-"); // "2026-03-23"
  return new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
}

/**
 * Get the day-of-week (0=Sunday..6=Saturday) for a date in Vietnam timezone.
 */
function getVietnamDayOfWeek(date: Date): number {
  const vnWeekdayFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "short",
  });
  const weekdayStr = vnWeekdayFormatter.format(date);
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return map[weekdayStr] ?? 0;
}

export async function updateUserStreakAction(): Promise<{ currentStreak: number; streakUpdated: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { currentStreak: 0, streakUpdated: false };
  }

  const userDb = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  if (!userDb) {
    return { currentStreak: 0, streakUpdated: false };
  }

  const now = new Date();
  const today = getVietnamToday(now);

  let currentStreak = userDb.currentStreak || 0;
  let streakUpdated = false;

  if (!userDb.lastActiveDate) {
    // First time active
    currentStreak = 1;
    streakUpdated = true;
  } else {
    // Compare dates using Vietnam timezone
    const lastActive = new Date(userDb.lastActiveDate);
    const lastActiveDateOnly = getVietnamToday(lastActive);

    const diffTime = Math.abs(today.getTime() - lastActiveDateOnly.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Logged in consecutive day
      currentStreak += 1;
      streakUpdated = true;
    } else if (diffDays > 1) {
      // Missed a day, streak resets
      currentStreak = 1;
      streakUpdated = true;
    }
    // If diffDays === 0, they already logged in today, no change
  }

  // 1. Update streak if needed
  if (streakUpdated) {
    await db
      .update(users)
      .set({
        currentStreak,
        lastActiveDate: now,
      })
      .where(eq(users.id, user.id));
  }

  // 2. Ensure today is logged in user_activity_logs
  // Use Vietnam "today" midnight as the date key
  const todayStart = today;

  // Upsert pattern: Insert if not exists based on the unique index (userId, date)
  // We use standard SELECT then INSERT to be safe since onConflictDoNothing depends on constraints
  const existingLog = await db.query.userActivityLogs.findFirst({
    where: and(eq(userActivityLogs.userId, user.id), eq(userActivityLogs.date, todayStart)),
  });

  if (!existingLog) {
    await db.insert(userActivityLogs).values({
      userId: user.id,
      date: todayStart,
    });
  }

  return { currentStreak, streakUpdated };
}

export async function getUserWeeklyActivityAction(): Promise<number[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const now = new Date();
  const today = getVietnamToday(now);
  const dayOfWeek = getVietnamDayOfWeek(now); // 0 (Sunday) to 6 (Saturday)

  // Calculate start of the week (Monday)
  // If today is Sunday (0), go back 6 days; otherwise go back (dayOfWeek - 1) days
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const startOfWeek = new Date(today);
  startOfWeek.setUTCDate(today.getUTCDate() - diffToMonday);

  // End of week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);

  const logs = await db
    .select({ date: userActivityLogs.date })
    .from(userActivityLogs)
    .where(
      and(
        eq(userActivityLogs.userId, user.id),
        gte(userActivityLogs.date, startOfWeek),
        lte(userActivityLogs.date, endOfWeek),
      ),
    );

  // Map dates to their Vietnam day-of-week as array of numbers [0..6]
  const activeDays = logs
    .map((log) => {
      if (log.date) {
        return getVietnamDayOfWeek(log.date);
      }
      return -1;
    })
    .filter((day) => day !== -1);

  // Return unique days
  return Array.from(new Set(activeDays)).sort();
}

export async function getUserDbAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const userDb = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  return userDb;
}
