"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";

interface UseGameLessonOptions<G extends { id: string }> {
  gameSlug: string;
  lessonOrder: string[];
  groups: G[];
}

export function useGameLesson<G extends { id: string }>({ gameSlug, lessonOrder, groups }: UseGameLessonOptions<G>) {
  const params = useParams();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  const { isLoaded, isLessonUnlocked, markLessonComplete } = useProgress();
  const { checkAccess, showPaywall } = useAccess();

  const [currentLessonNum, setCurrentLessonNum] = useState<number | string>(1);
  const [nextLessonNum, setNextLessonNum] = useState<number | string | null>(null);
  const [isGroupDone, setIsGroupDone] = useState(false);

  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const lessonId = typeof params.lessonId === "string" ? params.lessonId : "";

  const group = groups.find((g: G) => g.id === groupId);

  useEffect(() => {
    const runAccessCheck = async () => {
      if (!isLoaded) return;

      setIsCheckingAccess(false);

      if (!isLessonUnlocked(groupId, lessonId, gameSlug)) {
        router.push(`/games/${gameSlug}/${groupId}`);
        return;
      }

      const access = checkAccess(gameSlug, groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/${gameSlug}/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/${gameSlug}/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/${gameSlug}/${groupId}`);
        return;
      }
    };

    runAccessCheck();
  }, [isLoaded, groupId, lessonId, gameSlug, isLessonUnlocked, checkAccess, showPaywall, router]);

  const handleComplete = useCallback(() => {
    markLessonComplete(groupId, lessonId, gameSlug);

    const currentIdx = lessonOrder.indexOf(lessonId);
    setCurrentLessonNum(currentIdx + 1);

    if (currentIdx < lessonOrder.length - 1) {
      setNextLessonNum(currentIdx + 2);
      setIsGroupDone(false);
    } else {
      setIsGroupDone(true);
      setNextLessonNum(null);
    }

    setShowModal(true);
  }, [groupId, lessonId, gameSlug, lessonOrder, markLessonComplete]);

  const handleNextLesson = useCallback(async () => {
    setShowModal(false);
    const currentIdx = lessonOrder.indexOf(lessonId);

    if (currentIdx < lessonOrder.length - 1) {
      const nextLessonId = lessonOrder[currentIdx + 1];

      const access = checkAccess(gameSlug, groupId, nextLessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/${gameSlug}/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/${gameSlug}/${groupId}/lesson/${nextLessonId}`);
        }
        router.push(`/games/${gameSlug}/${groupId}`);
        return;
      }

      router.push(`/games/${gameSlug}/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/${gameSlug}`);
    }
  }, [lessonId, lessonOrder, gameSlug, groupId, checkAccess, showPaywall, router]);

  return {
    groupId,
    lessonId,
    group,
    isLoaded,
    isCheckingAccess,
    showModal,
    currentLessonNum,
    nextLessonNum,
    isGroupDone,
    handleComplete,
    handleNextLesson,
  };
}
