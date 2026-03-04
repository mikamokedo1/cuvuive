"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { GROUPS, getLettersForGroup } from "@/features/games/learn-alphabet/constants";
import { AlphabetLearnLesson } from "@/features/games/learn-alphabet/AlphabetLearnLesson";
import { AlphabetQuizLesson } from "@/features/games/learn-alphabet/AlphabetQuizLesson";
import { AlphabetMemoryLesson } from "@/features/games/learn-alphabet/AlphabetMemoryLesson";
import { AlphabetSpeakingLesson } from "@/features/games/learn-alphabet/AlphabetSpeakingLesson";
import { AlphabetWritingLesson } from "@/features/games/learn-alphabet/AlphabetWritingLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  const { isLoaded, isLessonUnlocked, markLessonComplete, allProgress } = useProgress();
  const { checkAccess, showPaywall } = useAccess();

  const [currentLessonNum, setCurrentLessonNum] = useState<number | string>(1);
  const [nextLessonNum, setNextLessonNum] = useState<number | string | null>(null);
  const [isGroupDone, setIsGroupDone] = useState(false);

  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const lessonId = typeof params.lessonId === "string" ? params.lessonId : "";

  const group = GROUPS.find((g) => g.id === groupId);

  const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4", "lesson5"];

  useEffect(() => {
    const runAccessCheck = async () => {
      if (!isLoaded) return;

      if (!isLessonUnlocked(groupId, lessonId, "learn-alphabet")) {
        router.push(`/games/learn-alphabet/${groupId}`);
        return;
      }

      const access = await checkAccess("learn-alphabet", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-alphabet/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-alphabet/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/learn-alphabet/${groupId}`);
        return;
      }

      setIsCheckingAccess(false);
    };

    runAccessCheck();
  }, [isLoaded, groupId, lessonId, isLessonUnlocked, checkAccess, showPaywall, router]);

  if (!group || !lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const handleComplete = () => {
    markLessonComplete(groupId, lessonId, "learn-alphabet");

    const currentIdx = LESSON_ORDER.indexOf(lessonId);
    setCurrentLessonNum(currentIdx + 1);

    if (currentIdx < LESSON_ORDER.length - 1) {
      setNextLessonNum(currentIdx + 2);
      setIsGroupDone(false);
    } else {
      setIsGroupDone(true);
      setNextLessonNum(null);
    }

    setShowModal(true);
  };

  const handleNextLesson = async () => {
    setShowModal(false);
    const currentIdx = LESSON_ORDER.indexOf(lessonId);

    if (currentIdx < LESSON_ORDER.length - 1) {
      const nextLessonId = LESSON_ORDER[currentIdx + 1];

      const access = await checkAccess("learn-alphabet", groupId, nextLessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-alphabet/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-alphabet/${groupId}/lesson/${nextLessonId}`);
        }
        router.push(`/games/learn-alphabet/${groupId}`);
        return;
      }

      router.push(`/games/learn-alphabet/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/learn-alphabet`);
    }
  };

  const letters = getLettersForGroup(groupId);

  // Check if this lesson was previously completed (for showing LetterSelector)
  const courseProgress = allProgress["learn-alphabet"] || { completedGroups: [], completedLessons: {} };
  const completedInGroup = courseProgress.completedLessons[groupId] || [];
  const isReviewMode = completedInGroup.includes(lessonId);

  const renderLesson = () => {
    switch (lessonId) {
      case "lesson1":
        return <AlphabetLearnLesson letters={letters} onComplete={handleComplete} isReviewMode={isReviewMode} />;
      case "lesson2":
        return <AlphabetSpeakingLesson letters={letters} onComplete={handleComplete} isReviewMode={isReviewMode} />;
      case "lesson3":
        return <AlphabetWritingLesson letters={letters} onComplete={handleComplete} isReviewMode={isReviewMode} />;
      case "lesson4":
        return <AlphabetQuizLesson letters={letters} onComplete={handleComplete} />;
      case "lesson5":
        return <AlphabetMemoryLesson letters={letters} onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={<main>{renderLesson()}</main>}
      LessonTitle={group.title}
      groupId={groupId}
      gameSlug="learn-alphabet"
      showModal={showModal}
      handleNextLesson={handleNextLesson}
      currentLessonNum={currentLessonNum}
      nextLessonNum={nextLessonNum}
      isGroupDone={isGroupDone}
      isLoaded={isLoaded}
      isCheckingAccess={isCheckingAccess}
    />
  );
}
