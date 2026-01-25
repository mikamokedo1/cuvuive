"use server";

import { db } from "@/db";
import { courseAccess } from "@/db/schema";
import { eq, and } from "drizzle-orm";
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

  // Get lesson access type from database
  const accessConfig = await db
    .select()
    .from(courseAccess)
    .where(
      and(eq(courseAccess.courseId, courseId), eq(courseAccess.groupId, groupId), eq(courseAccess.lessonId, lessonId)),
    )
    .limit(1);

  // Default to premium if not found in database
  const accessType: AccessType = (accessConfig[0]?.accessType as AccessType) || "premium";

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
  const configs = await db
    .select({
      lessonId: courseAccess.lessonId,
      accessType: courseAccess.accessType,
    })
    .from(courseAccess)
    .where(eq(courseAccess.courseId, courseId));

  return configs.map((c) => ({
    lessonId: c.lessonId,
    accessType: c.accessType as AccessType,
  }));
}
