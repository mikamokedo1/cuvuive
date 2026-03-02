"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { CompletionModal } from "@/components/games/CompletionModal";
import { GROUPS } from "@/features/games/find-pattern/constants";
import { PatternLearnLesson } from "@/features/games/find-pattern/PatternLearnLesson";
import { PatternQuizLesson } from "@/features/games/find-pattern/PatternQuizLesson";
import { PatternFillLesson } from "@/features/games/find-pattern/PatternFillLesson";
import { CheckingPermission } from "@/components/common/CheckingPermission";

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

      if (!isLessonUnlocked(groupId, lessonId, "find-pattern")) {
        router.push(`/games/find-pattern/${groupId}`);
        return;
      }

      const access = await checkAccess("find-pattern", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/find-pattern/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/find-pattern/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/find-pattern/${groupId}`);
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
    markLessonComplete(groupId, lessonId, "find-pattern");

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

      const access = await checkAccess("find-pattern", groupId, nextLessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/find-pattern/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/find-pattern/${groupId}/lesson/${nextLessonId}`);
        }
        router.push(`/games/find-pattern/${groupId}`);
        return;
      }

      router.push(`/games/find-pattern/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/find-pattern`);
    }
  };

  if (!isLoaded || isCheckingAccess) {
    return <CheckingPermission path={`/games/find-pattern/${groupId}`} />;
  }

  const renderLesson = () => {
    switch (lessonId) {
      case "lesson1":
        return <PatternLearnLesson groupId={groupId} onComplete={handleComplete} />;
      case "lesson2":
        return <PatternQuizLesson groupId={groupId} onComplete={handleComplete} />;
      case "lesson3":
        return <PatternFillLesson groupId={groupId} onComplete={handleComplete} />;
      default:
        return <div>Lesson not found</div>;
    }
  };

  return (
    <GameLayout backTo={`/games/find-pattern/${groupId}`} title={group.title}>
      <main className="flex flex-col items-center justify-center min-h-[60vh] w-full">{renderLesson()}</main>

      <CompletionModal
        isOpen={showModal}
        onNext={handleNextLesson}
        currentLessonNum={isGroupDone ? groupId.replace("group", "") : currentLessonNum}
        nextLessonNum={nextLessonNum ?? undefined}
        isGroupComplete={isGroupDone}
      />
    </GameLayout>
  );
}
