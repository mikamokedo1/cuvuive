"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { CompletionModal } from "@/components/games/CompletionModal";
import { GROUPS, getAnimalsForGroup } from "@/features/games/learn-animal/constants";
import { AnimalLearnLesson } from "@/features/games/learn-animal/AnimalLearnLesson";
import { AnimalQuizLesson } from "@/features/games/learn-animal/AnimalQuizLesson";
import { AnimalMemoryLesson } from "@/features/games/learn-animal/AnimalMemoryLesson";
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

  // Lesson order for learn-animal (3 lessons per group)
  const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

  useEffect(() => {
    const runAccessCheck = async () => {
      if (!isLoaded) return;

      // 1. Progress Check
      if (!isLessonUnlocked(groupId, lessonId, "learn-animal")) {
        router.push(`/games/learn-animal/${groupId}`);
        return;
      }

      // 2. Freemium Check
      const access = await checkAccess("learn-animal", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-animal/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-animal/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/learn-animal/${groupId}`);
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
    markLessonComplete(groupId, lessonId, "learn-animal");

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

      const access = await checkAccess("learn-animal", groupId, nextLessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-animal/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-animal/${groupId}/lesson/${nextLessonId}`);
        }
        router.push(`/games/learn-animal/${groupId}`);
        return;
      }

      router.push(`/games/learn-animal/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/learn-animal`);
    }
  };

  if (!isLoaded || isCheckingAccess) {
    return <CheckingPermission path={`/games/learn-animal/${groupId}`} />;
  }

  const animals = getAnimalsForGroup(groupId);

  const renderLesson = () => {
    switch (lessonId) {
      case "lesson1":
        return <AnimalLearnLesson animals={animals} onComplete={handleComplete} />;
      case "lesson2":
        return <AnimalQuizLesson animals={animals} onComplete={handleComplete} />;
      case "lesson3":
        return <AnimalMemoryLesson animals={animals} onComplete={handleComplete} />;
      default:
        return <div>Lesson not found</div>;
    }
  };

  return (
    <GameLayout backTo={`/games/learn-animal/${groupId}`} title={group.title}>
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
