import { COURSES, type CourseDef, type GroupDef, type LessonDef } from "@/libs/constants/courses";

export interface ProgressState {
  completedGroups: string[];
  completedLessons: Record<string, string[]>;
}

export const EMPTY_PROGRESS_STATE: ProgressState = {
  completedGroups: [],
  completedLessons: {},
};

export function createEmptyProgressState(): ProgressState {
  return {
    completedGroups: [],
    completedLessons: {},
  };
}

export function getCourseDefinition(courseId: string): CourseDef | undefined {
  return COURSES.find((course) => course.id === courseId);
}

export function getGroupDefinition(courseId: string, groupId: string): GroupDef | undefined {
  return getCourseDefinition(courseId)?.groups.find((group) => group.id === groupId);
}

export function getLessonDefinition(courseId: string, groupId: string, lessonId: string): LessonDef | undefined {
  return getGroupDefinition(courseId, groupId)?.lessons.find((lesson) => lesson.id === lessonId);
}

export function getCourseProgress(
  allProgress: Record<string, ProgressState>,
  courseId: string,
): ProgressState {
  return allProgress[courseId] ?? EMPTY_PROGRESS_STATE;
}

export function getCompletedGroupsByCourse(
  allProgress: Record<string, ProgressState>,
): Record<string, string[]> {
  const completedGroupsByCourse: Record<string, string[]> = {};

  Object.entries(allProgress).forEach(([courseId, courseProgress]) => {
    const course = getCourseDefinition(courseId);
    if (!course) {
      completedGroupsByCourse[courseId] = [];
      return;
    }

    completedGroupsByCourse[courseId] = course.groups
      .filter((group) => {
        const completedLessons = courseProgress.completedLessons[group.id] ?? [];
        return group.lessons.length > 0 && completedLessons.length >= group.lessons.length;
      })
      .map((group) => group.id);
  });

  return completedGroupsByCourse;
}

export function withDerivedCompletedGroups(
  allProgress: Record<string, ProgressState>,
): Record<string, ProgressState> {
  const completedGroupsByCourse = getCompletedGroupsByCourse(allProgress);

  return Object.fromEntries(
    Object.entries(allProgress).map(([courseId, courseProgress]) => [
      courseId,
      {
        completedLessons: courseProgress.completedLessons,
        completedGroups: completedGroupsByCourse[courseId] ?? [],
      },
    ]),
  );
}

export function isGroupUnlockedForCourse(
  courseId: string,
  groupId: string,
  allProgress: Record<string, ProgressState>,
): boolean {
  const course = getCourseDefinition(courseId);
  if (!course) return true;
  if (courseId === "learn-multiply" || courseId === "learn-divide") return true;

  const groupIndex = course.groups.findIndex((group) => group.id === groupId);
  if (groupIndex === 0) return true;
  if (groupIndex === -1) return false;

  const completedGroups = getCompletedGroupsByCourse(allProgress)[courseId] ?? [];
  return completedGroups.includes(course.groups[groupIndex - 1].id);
}

export function isLessonUnlockedForCourse(
  courseId: string,
  groupId: string,
  lessonId: string,
  allProgress: Record<string, ProgressState>,
): boolean {
  if (!isGroupUnlockedForCourse(courseId, groupId, allProgress)) {
    return false;
  }
  if (courseId === "learn-multiply" || courseId === "learn-divide") return true;

  const group = getGroupDefinition(courseId, groupId);
  if (!group) return false;

  const lessonIndex = group.lessons.findIndex((lesson) => lesson.id === lessonId);
  if (lessonIndex === 0) return true;
  if (lessonIndex === -1) return false;

  const completedLessons = getCourseProgress(allProgress, courseId).completedLessons[groupId] ?? [];
  if (completedLessons.includes(lessonId)) return true;

  return completedLessons.includes(group.lessons[lessonIndex - 1].id);
}
