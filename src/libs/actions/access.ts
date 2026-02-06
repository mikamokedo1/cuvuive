"use server";

import { db } from "@/db";
// import { eq, and } from "drizzle-orm"; // Not used if using callback syntax
import { createClient } from "@/libs/supabase/server";
import { checkUserSubscription } from "@/libs/subscription";

export type AccessType = "free" | "premium";
export type AccessReason = "not_logged_in" | "premium_required" | null;

export interface AccessCheckResult {
  accessType: AccessType;
  userHasAccess: boolean;
  reason: AccessReason;
}

export interface LessonAccessConfig {
  lessonId: string;
  accessType: AccessType;
}

/**
 * Check if user has access to a specific lesson
 */
export async function checkLessonAccess(
  courseId: string,
  groupId: string,
  lessonId: string,
): Promise<AccessCheckResult> {
  const supabase = await createClient();

  // Get lesson access type from database (lessons table)
  // Find group by courseId + groupSlug, then find lesson by groupId + lessonSlug
  const group = await db.query.groups.findFirst({
    where: (g, { eq, and }) => and(eq(g.courseId, courseId), eq(g.slug, groupId)),
  });

  if (!group) {
    // If group doesn't exist, default to premium (safe fail)
    return { accessType: "premium", userHasAccess: false, reason: "premium_required" };
  }

  const targetLesson = await db.query.lessons.findFirst({
    where: (l, { eq, and }) => and(eq(l.groupId, group.id), eq(l.slug, lessonId)),
  });

  const isFree = targetLesson?.isFree || false;
  const accessType: AccessType = isFree ? "free" : "premium";

  // If lesson is free, allow access
  if (accessType === "free") {
    return {
      accessType: "free",
      userHasAccess: true,
      reason: null,
    };
  }

  // Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      accessType: "premium",
      userHasAccess: false,
      reason: "not_logged_in",
    };
  }

  // Check if user is premium
  const isPro = await checkUserSubscription(user.id);

  if (!isPro) {
    return {
      accessType: "premium",
      userHasAccess: false,
      reason: "premium_required",
    };
  }

  return {
    accessType: "premium",
    userHasAccess: true,
    reason: null,
  };
}

/**
 * Get access config for all lessons in a course
 */
export async function getCourseAccessConfig(courseId: string): Promise<LessonAccessConfig[]> {
  const allLessons = await db.query.lessons.findMany({
    where: (l, { eq }) => eq(l.courseId, courseId),
  });

  return allLessons.map((l) => ({
    lessonId: l.slug,
    accessType: l.isFree ? "free" : "premium",
  }));
}
