"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { GROUPS, getFlowersForGroup } from "@/features/games/learn-flower/constants";
import { FlowerLearnLesson } from "@/features/games/learn-flower/FlowerLearnLesson";
import { FlowerQuizLesson } from "@/features/games/learn-flower/FlowerQuizLesson";
import { FlowerMemoryLesson } from "@/features/games/learn-flower/FlowerMemoryLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

export default function LessonPage() {
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

  const group = GROUPS.find((g) => g.id === groupId);

  const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

  useEffect(() => {
    const runAccessCheck = async () => {
      if (!isLoaded) return;

      if (!isLessonUnlocked(groupId, lessonId, "learn-flower")) {
        router.push(`/games/learn-flower/${groupId}`);
        return;
      }

      const access = await checkAccess("learn-flower", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-flower/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-flower/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/learn-flower/${groupId}`);
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
    markLessonComplete(groupId, lessonId, "learn-flower");

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

      const access = await checkAccess("learn-flower", groupId, nextLessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-flower/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-flower/${groupId}/lesson/${nextLessonId}`);
        }
        router.push(`/games/learn-flower/${groupId}`);
        return;
      }

      router.push(`/games/learn-flower/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/learn-flower`);
    }
  };

  const flowers = getFlowersForGroup(groupId);

  const renderLesson = () => {
    switch (lessonId) {
      case "lesson1":
        return <FlowerLearnLesson flowers={flowers} onComplete={handleComplete} />;
      case "lesson2":
        return <FlowerQuizLesson flowers={flowers} onComplete={handleComplete} />;
      case "lesson3":
        return <FlowerMemoryLesson flowers={flowers} onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={<main>{renderLesson()}</main>}
      LessonTitle={group.title}
      groupId={groupId}
      gameSlug="learn-flower"
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
