"use server";

import { createClient } from "@/libs/supabase/server";
import { db } from "@/db";
import { progress, learningSessions, users } from "@/db/schema";
import { eq, and, gte, lte, sql, desc } from "drizzle-orm";
import { COURSES } from "@/libs/constants/courses";
import { GROUPS, type GameGroupType } from "@/libs/constants/groups";

// ─── Helpers ────────────────────────────────────────────────────────

function getVietnamToday(date: Date = new Date()): Date {
  const vnFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = vnFormatter.format(date).split("-");
  return new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function formatDateLabel(date: Date): string {
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

async function getAuthenticatedUserId(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

// Build a lookup: courseId → category type
const COURSE_TYPE_MAP: Record<string, GameGroupType> = {};
COURSES.forEach((c) => {
  COURSE_TYPE_MAP[c.id] = c.type;
});

// Build a lookup: courseId → course title
const COURSE_TITLE_MAP: Record<string, string> = {};
COURSES.forEach((c) => {
  COURSE_TITLE_MAP[c.id] = c.title;
});

// Build category title map
const CATEGORY_TITLE_MAP: Record<string, string> = {};
GROUPS.forEach((g) => {
  CATEGORY_TITLE_MAP[g.id] = g.title;
});

const CATEGORY_ICON_MAP: Record<string, string> = {};
GROUPS.forEach((g) => {
  CATEGORY_ICON_MAP[g.id] = typeof g.icon === "string" ? g.icon : "";
});

// ─── Types ──────────────────────────────────────────────────────────

export interface DailyDataPoint {
  date: string; // "03/06"
  lessons: number;
  minutes: number;
}

export interface DashboardStats {
  totalMinutes: number;
  lessonsCompleted: number;
  avgScore: number;
  currentStreak: number;
  dailyData: DailyDataPoint[];
  // Comparison with previous period
  minutesDelta: number; // percentage change
  lessonsDelta: number;
}

export interface CategoryStat {
  category: GameGroupType;
  categoryTitle: string;
  categoryIcon: string;
  totalLessons: number;
  completedLessons: number;
  percentage: number;
}

export interface LessonSuggestion {
  courseId: string;
  courseTitle: string;
  groupId: string;
  lessonId: string;
  lessonTitle: string;
  reason: string;
}

// ─── 1. Dashboard Stats ─────────────────────────────────────────────

export async function getDashboardStatsAction(
  period: "today" | "yesterday" | "week" | "month" = "week",
): Promise<DashboardStats | null> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return null;

  const today = getVietnamToday();
  let startDate: Date;
  let prevStartDate: Date;
  let daysBack: number;

  if (period === "today") {
    daysBack = 1;
    startDate = today;
    prevStartDate = addDays(today, -1);
  } else if (period === "yesterday") {
    daysBack = 1;
    startDate = addDays(today, -1);
    prevStartDate = addDays(today, -2);
  } else if (period === "month") {
    daysBack = 30;
    startDate = addDays(today, -30 + 1);
    prevStartDate = addDays(startDate, -30);
  } else {
    // "week"
    daysBack = 7;
    startDate = addDays(today, -7 + 1);
    prevStartDate = addDays(startDate, -7);
  }

  // Get user streak
  const userDb = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { currentStreak: true },
  });

  // Current period: lessons completed
  const currentLessons = await db
    .select({
      count: sql<number>`count(*)`.as("count"),
      avgScore: sql<number>`coalesce(avg(case when ${progress.score} = 0 then 100 else ${progress.score} end), 0)`.as("avg_score"),
    })
    .from(progress)
    .where(
      and(
        eq(progress.userId, userId),
        gte(progress.completedAt, startDate),
        lte(progress.completedAt, addDays(startDate, daysBack)),
      ),
    );

  // Previous period: lessons completed (for delta)
  const prevLessons = await db
    .select({
      count: sql<number>`count(*)`.as("count"),
    })
    .from(progress)
    .where(
      and(
        eq(progress.userId, userId),
        gte(progress.completedAt, prevStartDate),
        lte(progress.completedAt, startDate),
      ),
    );

  // Current period: learning time
  const currentTime = await db
    .select({
      totalSeconds: sql<number>`coalesce(sum(${learningSessions.durationSeconds}), 0)`.as("total_seconds"),
    })
    .from(learningSessions)
    .where(
      and(
        eq(learningSessions.userId, userId),
        gte(learningSessions.startedAt, startDate),
        lte(learningSessions.startedAt, addDays(startDate, daysBack)),
      ),
    );

  // Previous period: learning time (for delta)
  const prevTime = await db
    .select({
      totalSeconds: sql<number>`coalesce(sum(${learningSessions.durationSeconds}), 0)`.as("total_seconds"),
    })
    .from(learningSessions)
    .where(
      and(
        eq(learningSessions.userId, userId),
        gte(learningSessions.startedAt, prevStartDate),
        lte(learningSessions.startedAt, startDate),
      ),
    );

  // Daily breakdown for chart
  const dailyLessons = await db
    .select({
      day: sql<string>`to_char(${progress.completedAt} AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD')`.as("day"),
      count: sql<number>`count(*)`.as("count"),
    })
    .from(progress)
    .where(
      and(
        eq(progress.userId, userId),
        gte(progress.completedAt, startDate),
        lte(progress.completedAt, addDays(startDate, daysBack)),
      ),
    )
    .groupBy(sql`to_char(${progress.completedAt} AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD')`);

  const dailySessions = await db
    .select({
      day: sql<string>`to_char(${learningSessions.startedAt} AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD')`.as("day"),
      totalSeconds: sql<number>`coalesce(sum(${learningSessions.durationSeconds}), 0)`.as("total_seconds"),
    })
    .from(learningSessions)
    .where(
      and(
        eq(learningSessions.userId, userId),
        gte(learningSessions.startedAt, startDate),
        lte(learningSessions.startedAt, addDays(startDate, daysBack)),
      ),
    )
    .groupBy(sql`to_char(${learningSessions.startedAt} AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD')`);

  // Build daily data array
  const lessonsMap = new Map(dailyLessons.map((d) => [d.day, Number(d.count)]));
  const sessionsMap = new Map(dailySessions.map((d) => [d.day, Number(d.totalSeconds)]));

  const dailyData: DailyDataPoint[] = [];
  for (let i = 0; i < daysBack; i++) {
    const date = addDays(startDate, i);
    const dateKey = date.toISOString().slice(0, 10);
    dailyData.push({
      date: formatDateLabel(date),
      lessons: lessonsMap.get(dateKey) ?? 0,
      minutes: Math.round((sessionsMap.get(dateKey) ?? 0) / 60),
    });
  }

  const totalMinutes = Math.round(Number(currentTime[0]?.totalSeconds ?? 0) / 60);
  const prevTotalMinutes = Math.round(Number(prevTime[0]?.totalSeconds ?? 0) / 60);
  const lessonsCount = Number(currentLessons[0]?.count ?? 0);
  const prevLessonsCount = Number(prevLessons[0]?.count ?? 0);

  return {
    totalMinutes,
    lessonsCompleted: lessonsCount,
    avgScore: Math.round(Number(currentLessons[0]?.avgScore ?? 0)),
    currentStreak: userDb?.currentStreak ?? 0,
    dailyData,
    minutesDelta: prevTotalMinutes > 0 ? Math.round(((totalMinutes - prevTotalMinutes) / prevTotalMinutes) * 100) : 0,
    lessonsDelta: prevLessonsCount > 0 ? Math.round(((lessonsCount - prevLessonsCount) / prevLessonsCount) * 100) : 0,
  };
}

// ─── 2. Category Analysis ───────────────────────────────────────────

export async function getCategoryAnalysisAction(): Promise<CategoryStat[]> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return [];

  // Get all completed lessons for this user
  const completed = await db
    .select({
      courseId: progress.courseId,
      groupId: progress.groupId,
      lessonId: progress.lessonId,
    })
    .from(progress)
    .where(eq(progress.userId, userId));

  // Build a set of completed lessons per course
  const completedByCourse: Record<string, Set<string>> = {};
  completed.forEach((row) => {
    if (!completedByCourse[row.courseId]) {
      completedByCourse[row.courseId] = new Set();
    }
    completedByCourse[row.courseId].add(`${row.groupId}:${row.lessonId}`);
  });

  // Group by category
  const categoryStats: Record<
    string,
    { total: number; completed: number }
  > = {};

  COURSES.forEach((course) => {
    const category = course.type;
    if (!categoryStats[category]) {
      categoryStats[category] = { total: 0, completed: 0 };
    }

    const totalLessons = course.groups.reduce((sum, g) => sum + g.lessons.length, 0);
    categoryStats[category].total += totalLessons;

    const completedSet = completedByCourse[course.id];
    if (completedSet) {
      course.groups.forEach((group) => {
        group.lessons.forEach((lesson) => {
          if (completedSet.has(`${group.id}:${lesson.id}`)) {
            categoryStats[category].completed++;
          }
        });
      });
    }
  });

  // Convert to array, sorted by percentage descending
  return Object.entries(categoryStats)
    .map(([category, stats]) => ({
      category: category as GameGroupType,
      categoryTitle: CATEGORY_TITLE_MAP[category] || category,
      categoryIcon: CATEGORY_ICON_MAP[category] || "",
      totalLessons: stats.total,
      completedLessons: stats.completed,
      percentage: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

// ─── 3. Lesson Suggestions ──────────────────────────────────────────

export async function getLessonSuggestionsAction(): Promise<LessonSuggestion[]> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return [];

  // Get all completed lessons
  const completed = await db
    .select({
      courseId: progress.courseId,
      groupId: progress.groupId,
      lessonId: progress.lessonId,
    })
    .from(progress)
    .where(eq(progress.userId, userId));

  const completedSet = new Set(completed.map((r) => `${r.courseId}:${r.groupId}:${r.lessonId}`));

  // Helper to check if a group is unlocked based on completion of the previous group
  const isGroupUnlocked = (course: typeof COURSES[number], groupId: string) => {
    const groupIndex = course.groups.findIndex((g) => g.id === groupId);
    if (groupIndex === 0) return true;
    if (groupIndex === -1) return false;

    // The previous group must be fully completed
    const prevGroup = course.groups[groupIndex - 1];
    return prevGroup.lessons.every((l) =>
      completedSet.has(`${course.id}:${prevGroup.id}:${l.id}`)
    );
  };

  // Helper to check if a lesson is unlocked (the group must be unlocked, and it must be either
  // the first lesson or the previous lesson in the group must be completed)
  const isLessonUnlocked = (course: typeof COURSES[number], groupId: string, lessonId: string) => {
    if (!isGroupUnlocked(course, groupId)) return false;

    const group = course.groups.find((g) => g.id === groupId);
    if (!group) return false;

    const lessonIndex = group.lessons.findIndex((l) => l.id === lessonId);
    if (lessonIndex === 0) return true;
    if (lessonIndex === -1) return false;

    const prevLesson = group.lessons[lessonIndex - 1];
    return completedSet.has(`${course.id}:${groupId}:${prevLesson.id}`);
  };

  // Get category analysis to find weakest categories
  const categoryAnalysis = await getCategoryAnalysisAction();

  // Sort by percentage ascending (weakest first)
  const weakest = categoryAnalysis
    .filter((c) => c.percentage < 100)
    .sort((a, b) => a.percentage - b.percentage);

  const suggestions: LessonSuggestion[] = [];
  const MAX_SUGGESTIONS = 6;

  for (const category of weakest) {
    if (suggestions.length >= MAX_SUGGESTIONS) break;

    // Find courses in this category
    const coursesInCategory = COURSES.filter((c) => c.type === category.category);

    for (const course of coursesInCategory) {
      if (suggestions.length >= MAX_SUGGESTIONS) break;

      for (const group of course.groups) {
        if (suggestions.length >= MAX_SUGGESTIONS) break;

        for (const lesson of group.lessons) {
          if (suggestions.length >= MAX_SUGGESTIONS) break;

          const key = `${course.id}:${group.id}:${lesson.id}`;
          
          // Only suggest if:
          // 1. The user has not completed this lesson
          // 2. The lesson is unlocked (group is unlocked and previous lesson is completed)
          if (!completedSet.has(key) && isLessonUnlocked(course, group.id, lesson.id)) {
            const isWeak = category.percentage < 30;
            suggestions.push({
              courseId: course.id,
              courseTitle: course.title,
              groupId: group.id,
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              reason: isWeak
                ? `Bé cần luyện thêm ${category.categoryTitle}`
                : `Tiếp tục học ${course.title}`,
            });
            break; // One suggestion per group
          }
        }
      }
    }
  }

  return suggestions;
}

// ─── 4. Weekly Report Data ──────────────────────────────────────────

export interface WeeklyReportData {
  kidName: string;
  totalMinutes: number;
  lessonsCompleted: number;
  avgScore: number;
  currentStreak: number;
  topCourses: { title: string; lessonsCompleted: number }[];
  strengths: string[];
  weaknesses: string[];
  prevTotalMinutes: number;
  prevLessonsCompleted: number;
}

export async function getWeeklyReportDataAction(targetUserId?: string): Promise<WeeklyReportData | null> {
  let userId = targetUserId;

  if (!userId) {
    userId = (await getAuthenticatedUserId()) ?? undefined;
  }

  if (!userId) return null;

  const today = getVietnamToday();
  const weekStart = addDays(today, -7);
  const prevWeekStart = addDays(today, -14);

  // Get user info
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const kidName = user?.user_metadata?.kidName || "Bé";

  // Current week stats
  const stats = await getDashboardStatsAction("week");
  if (!stats) return null;

  // Category analysis for strengths/weaknesses
  const categories = await getCategoryAnalysisAction();
  const strengths = categories.filter((c) => c.percentage >= 50).map((c) => c.categoryTitle);
  const weaknesses = categories
    .filter((c) => c.percentage < 30 && c.completedLessons > 0)
    .map((c) => c.categoryTitle);

  // Top courses this week
  const weekLessons = await db
    .select({
      courseId: progress.courseId,
      count: sql<number>`count(*)`.as("count"),
    })
    .from(progress)
    .where(
      and(
        eq(progress.userId, userId),
        gte(progress.completedAt, weekStart),
        lte(progress.completedAt, addDays(today, 1)),
      ),
    )
    .groupBy(progress.courseId)
    .orderBy(desc(sql`count(*)`))
    .limit(3);

  const topCourses = weekLessons.map((row) => ({
    title: COURSE_TITLE_MAP[row.courseId] || row.courseId,
    lessonsCompleted: Number(row.count),
  }));

  // Previous week for comparison
  const prevLessons = await db
    .select({ count: sql<number>`count(*)`.as("count") })
    .from(progress)
    .where(
      and(
        eq(progress.userId, userId),
        gte(progress.completedAt, prevWeekStart),
        lte(progress.completedAt, weekStart),
      ),
    );

  const prevTime = await db
    .select({
      totalSeconds: sql<number>`coalesce(sum(${learningSessions.durationSeconds}), 0)`.as("total_seconds"),
    })
    .from(learningSessions)
    .where(
      and(
        eq(learningSessions.userId, userId),
        gte(learningSessions.startedAt, prevWeekStart),
        lte(learningSessions.startedAt, weekStart),
      ),
    );

  return {
    kidName,
    totalMinutes: stats.totalMinutes,
    lessonsCompleted: stats.lessonsCompleted,
    avgScore: stats.avgScore,
    currentStreak: stats.currentStreak,
    topCourses,
    strengths,
    weaknesses,
    prevTotalMinutes: Math.round(Number(prevTime[0]?.totalSeconds ?? 0) / 60),
    prevLessonsCompleted: Number(prevLessons[0]?.count ?? 0),
  };
}
