"use server";

import { createClient } from "@/libs/supabase/server";
import { db } from "@/db";
import { leaderboardScores, progress, learningSessions, users } from "@/db/schema";
import { eq, desc, sql, gt } from "drizzle-orm";

// ─── Constants ──────────────────────────────────────────────────────

const LEADERBOARD_LIMIT = 20;
const MIN_LESSONS = 5;

// Score formula weights
const LESSON_WEIGHT = 100;
const MINUTE_WEIGHT = 10;
const STREAK_WEIGHT = 50;

function calculateSmartScore(totalLessons: number, totalMinutes: number, currentStreak: number): number {
  return totalLessons * LESSON_WEIGHT + totalMinutes * MINUTE_WEIGHT + currentStreak * STREAK_WEIGHT;
}

// ─── Types ──────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  rank: number;
  kidName: string;
  email: string;
  smartScore: number;
  totalLessons: number;
  currentStreak: number;
}

export interface MyRankData {
  rank: number;
  kidName: string;
  smartScore: number;
  totalLessons: number;
  totalMinutes: number;
  currentStreak: number;
  nextRankName: string | null;
  pointsToNextRank: number | null;
}

// ─── 1. Get Leaderboard (Public — no auth required) ─────────────────

export async function getLeaderboardAction(): Promise<LeaderboardEntry[]> {
  // JOIN with users table (email) + auth.users (kidName from metadata)
  // All data is always up-to-date — no denormalization
  const topScores = await db.execute(sql`
    SELECT
      ls.user_id,
      u.email,
      COALESCE(au.raw_user_meta_data->>'kidName', 'Bé') as kid_name,
      ls.smart_score,
      ls.total_lessons,
      ls.current_streak
    FROM leaderboard_scores ls
    INNER JOIN users u ON u.id = ls.user_id
    LEFT JOIN auth.users au ON au.id::text = ls.user_id
    WHERE ls.total_lessons >= ${MIN_LESSONS}
    ORDER BY ls.smart_score DESC
    LIMIT ${LEADERBOARD_LIMIT}
  `);

  return topScores.map((row, idx: number) => ({
    rank: idx + 1,
    kidName: (row.kid_name as string) || "Bé",
    email: (row.email as string) || "",
    smartScore: Number(row.smart_score),
    totalLessons: Number(row.total_lessons),
    currentStreak: Number(row.current_streak),
  }));
}

// ─── 2. Get My Rank (Authenticated) ────────────────────────────────

export async function getMyRankAction(): Promise<MyRankData | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const kidName = (user.user_metadata?.kidName as string) || "Bé";

  // Get my score
  const myScore = await db.query.leaderboardScores.findFirst({
    where: eq(leaderboardScores.userId, user.id),
  });

  if (!myScore) return null;

  // Count how many users have a higher smart_score
  const rankResult = await db
    .select({
      rank: sql<number>`count(*) + 1`.as("rank"),
    })
    .from(leaderboardScores)
    .where(
      sql`${leaderboardScores.smartScore} > ${myScore.smartScore} AND ${leaderboardScores.totalLessons} >= ${MIN_LESSONS}`,
    );

  const rank = Number(rankResult[0]?.rank ?? 1);

  // Find the user just above me for "points to next rank"
  let nextRankName: string | null = null;
  let pointsToNextRank: number | null = null;

  if (rank > 1) {
    const userAbove = await db.execute(sql`
      SELECT
        ls.smart_score,
        COALESCE(au.raw_user_meta_data->>'kidName', 'Bé') as kid_name
      FROM leaderboard_scores ls
      LEFT JOIN auth.users au ON au.id::text = ls.user_id
      WHERE ls.smart_score > ${myScore.smartScore}
        AND ls.total_lessons >= ${MIN_LESSONS}
      ORDER BY ls.smart_score ASC
      LIMIT 1
    `);

    if (userAbove.length > 0) {
      const row = userAbove[0];
      pointsToNextRank = Number(row.smart_score) - myScore.smartScore;
      nextRankName = (row.kid_name as string) || null;
    }
  }

  return {
    rank,
    kidName,
    smartScore: myScore.smartScore,
    totalLessons: myScore.totalLessons,
    totalMinutes: myScore.totalMinutes,
    currentStreak: myScore.currentStreak,
    nextRankName,
    pointsToNextRank,
  };
}

// ─── 3. Refresh Leaderboard Score (called after lesson completion) ──

export async function refreshLeaderboardScoreAction(userId: string): Promise<void> {
  // Get streak from users table
  const userDb = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { currentStreak: true },
  });

  const currentStreak = userDb?.currentStreak ?? 0;

  // Count total lessons completed
  const lessonsResult = await db
    .select({ count: sql<number>`count(*)`.as("count") })
    .from(progress)
    .where(eq(progress.userId, userId));

  const totalLessons = Number(lessonsResult[0]?.count ?? 0);

  // Sum total learning minutes
  const timeResult = await db
    .select({
      totalSeconds: sql<number>`coalesce(sum(${learningSessions.durationSeconds}), 0)`.as("total_seconds"),
    })
    .from(learningSessions)
    .where(eq(learningSessions.userId, userId));

  const totalMinutes = Math.round(Number(timeResult[0]?.totalSeconds ?? 0) / 60);

  const smartScore = calculateSmartScore(totalLessons, totalMinutes, currentStreak);

  // Upsert — no kidName/email, those are always JOINed at query time
  await db
    .insert(leaderboardScores)
    .values({
      userId,
      totalLessons,
      totalMinutes,
      currentStreak,
      smartScore,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: leaderboardScores.userId,
      set: {
        totalLessons,
        totalMinutes,
        currentStreak,
        smartScore,
        updatedAt: new Date(),
      },
    });
}
