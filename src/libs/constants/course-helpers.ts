/**
 * Centralized helpers for looking up course data from COURSES.
 *
 * SINGLE SOURCE OF TRUTH — All components that need course metadata
 * (icon, title, totalLessons) should import from here instead of
 * duplicating COURSES.find() calls.
 */

import { COURSES, type CourseDef } from "@/libs/constants/courses";

// ─── Pre-built lookup map (O(1) instead of O(n) per lookup) ────────────────

const COURSE_MAP = new Map<string, CourseDef>(COURSES.map((c) => [c.id, c]));

/**
 * Get a course by its ID. Returns undefined if not found.
 */
export function getCourseById(id: string): CourseDef | undefined {
  return COURSE_MAP.get(id);
}

/**
 * Get the icon URL for a course.
 */
export function getCourseIcon(id: string): string {
  return (getCourseById(id)?.icon as string) ?? "";
}

/**
 * Get the display title of a course.
 */
export function getCourseTitle(id: string): string {
  return getCourseById(id)?.title ?? id;
}

/**
 * Calculate total lessons across all groups of a course.
 */
export function getCourseTotalLessons(id: string): number {
  const course = getCourseById(id);
  if (!course) return 0;
  return course.groups.reduce((sum, g) => sum + g.lessons.length, 0);
}

/**
 * Get all course IDs as a Set for fast validation.
 */
export function getAllCourseIds(): Set<string> {
  return new Set(COURSE_MAP.keys());
}
