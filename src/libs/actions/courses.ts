"use server";

import { db } from "@/db";
import { courses, groups, lessons } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

// Types matching the frontend expectations (similar to constants)
export interface LessonDef {
  id: string; // slug
  title: string;
  isFree?: boolean;
}

export interface GroupDef {
  id: string; // slug
  title: string;
  lessons: LessonDef[];
}

export interface CourseDef {
  id: string; // id
  title: string;
  description: string | null;
  thumbnail: string | null;
  groups: GroupDef[];
}

export async function getCourses(): Promise<CourseDef[]> {
  const allCourses = await db.query.courses.findMany({
    orderBy: asc(courses.sortIndex),
    with: {
      groups: {
        orderBy: asc(groups.sortIndex),
        with: {
          lessons: {
            orderBy: asc(lessons.sortIndex),
          },
        },
      },
    },
  });

  // Map to the shape expected by frontend (using slugs as IDs where appropriate)
  return allCourses.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    thumbnail: c.thumbnail,
    groups: c.groups.map((g) => ({
      id: g.slug, // Use slug as logical ID for frontend routing ("group1")
      title: g.title,
      lessons: g.lessons.map((l) => ({
        id: l.slug, // Use slug as logical ID for frontend routing ("lesson1")
        title: l.title,
        isFree: l.isFree || false,
      })),
    })),
  }));
}

export async function getCourse(courseId: string): Promise<CourseDef | null> {
  const course = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      groups: {
        orderBy: asc(groups.sortIndex),
        with: {
          lessons: {
            orderBy: asc(lessons.sortIndex),
          },
        },
      },
    },
  });

  if (!course) return null;

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    thumbnail: course.thumbnail,
    groups: course.groups.map((g) => ({
      id: g.slug,
      title: g.title,
      lessons: g.lessons.map((l) => ({
        id: l.slug,
        title: l.title,
        isFree: l.isFree || false,
      })),
    })),
  };
}

export async function getCourseStructureAction() {
  // Include the group so we can access its slug.
  // The `progress` table stores group_id as the group SLUG (e.g. "group1"),
  // so we must key the structure by slug, not by the DB UUID.
  const allLessons = await db.query.lessons.findMany({
    columns: {
      courseId: true,
      slug: true,
    },
    with: {
      group: {
        columns: { slug: true },
      },
    },
  });

  return allLessons.map((l) => ({
    courseId: l.courseId,
    groupSlug: l.group.slug, // "group1", "group2", …
    lessonSlug: l.slug,
  }));
}
