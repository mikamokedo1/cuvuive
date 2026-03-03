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
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let currentStreak = userDb.currentStreak || 0;
  let streakUpdated = false;

  if (!userDb.lastActiveDate) {
    // First time active
    currentStreak = 1;
    streakUpdated = true;
  } else {
    // Compare dates
    const lastActive = new Date(userDb.lastActiveDate);
    const lastActiveDateOnly = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());

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
  // Ignore time completely by setting the exact midnight boundary
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

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
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate start of the week (Monday)
  // If today is Sunday (0), go back 6 days; otherwise go back (dayOfWeek - 1) days
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - diffToMonday);

  // End of week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

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

  // Map dates out to their dayOfWeek boundaries as array of numbers [0..6]
  const activeDays = logs
    .map((log) => {
      if (log.date) {
        return log.date.getDay();
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
