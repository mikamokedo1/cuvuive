"use client";

import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { LessonData } from "@/components/layout/GameWrapLessons";

interface UseGroupLessonsOptions<G extends { id: string; title: string }> {
  gameSlug: string;
  groups: G[];
  lessons: LessonData[];
  initialGroupId?: string;
}

export function useGroupLessons<G extends { id: string; title: string }>({
  gameSlug,
  groups,
  lessons,
  initialGroupId,
}: UseGroupLessonsOptions<G>) {
  const params = useParams();
  const router = useRouter();
  const { isLessonUnlocked, allProgress } = useProgress();
  const { checkAccess, showPaywall } = useAccess();

  const routeGroupId = typeof params.groupId === "string" ? params.groupId : "";
  const groupId = initialGroupId ?? routeGroupId;
  const group = groups.find((g) => g.id === groupId) || null;

  const handleLessonClick = async (lessonId: string) => {
    if (!isLessonUnlocked(gameSlug, groupId, lessonId)) {
      return;
    }

    const access = checkAccess(gameSlug, groupId, lessonId);

    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/${gameSlug}/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/${gameSlug}/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/${gameSlug}/${groupId}/lesson/${lessonId}`);
  };

  // Compute active lesson index
  const gameProgress = allProgress[gameSlug] || { completedGroups: [], completedLessons: {} };
  const isGroupCompleted = gameProgress.completedGroups.includes(groupId);
  let activeIndex = -1;

  if (!isGroupCompleted) {
    for (let i = lessons.length - 1; i >= 0; i--) {
      if (isLessonUnlocked(gameSlug, groupId, lessons[i].id)) {
        activeIndex = i;
        break;
      }
    }
  }

  if (!isGroupCompleted && activeIndex === -1) {
    activeIndex = 0;
  }

  const lessonsWithHref = lessons.map((lesson) => {
    const unlocked = isLessonUnlocked(gameSlug, groupId, lesson.id);
    if (!unlocked) {
      return lesson;
    }

    const access = checkAccess(gameSlug, groupId, lesson.id);
    return {
      ...lesson,
      href: access.userHasAccess ? `/games/${gameSlug}/${groupId}/lesson/${lesson.id}` : undefined,
    };
  });

  return {
    group,
    groupId,
    activeIndex,
    handleLessonClick,
    lessonsWithHref,
  };
}
