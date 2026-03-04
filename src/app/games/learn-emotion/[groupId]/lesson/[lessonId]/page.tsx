"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { CompletionModal } from "@/components/games/CompletionModal";
import {
  GROUPS,
  getEmotionsForGroup,
  getScenariosForGroup,
  getScenarioMatchForGroup,
} from "@/features/games/learn-emotion/constants";
import { EmotionLearnLesson } from "@/features/games/learn-emotion/EmotionLearnLesson";
import { EmotionSpeakingLesson } from "@/features/games/learn-emotion/EmotionSpeakingLesson";
import { EmotionRightWrongLesson } from "@/features/games/learn-emotion/EmotionRightWrongLesson";
import { EmotionScenarioLesson } from "@/features/games/learn-emotion/EmotionScenarioLesson";
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

  const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4"];

  useEffect(() => {
    const runAccessCheck = async () => {
      if (!isLoaded) return;

      if (!isLessonUnlocked(groupId, lessonId, "learn-emotion")) {
        router.push(`/games/learn-emotion/${groupId}`);
        return;
      }

      const access = await checkAccess("learn-emotion", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-emotion/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-emotion/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/learn-emotion/${groupId}`);
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
    markLessonComplete(groupId, lessonId, "learn-emotion");

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

      const access = await checkAccess("learn-emotion", groupId, nextLessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-emotion/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-emotion/${groupId}/lesson/${nextLessonId}`);
        }
        router.push(`/games/learn-emotion/${groupId}`);
        return;
      }

      router.push(`/games/learn-emotion/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/learn-emotion`);
    }
  };

  if (!isLoaded || isCheckingAccess) {
    return <CheckingPermission path={`/games/learn-emotion/${groupId}`} />;
  }

  const items = getEmotionsForGroup(groupId);
  const scenarios = getScenariosForGroup(groupId);
  const scenarioMatches = getScenarioMatchForGroup(groupId);

  const renderLesson = () => {
    switch (lessonId) {
      case "lesson1":
        return <EmotionLearnLesson items={items} onComplete={handleComplete} />;
      case "lesson2":
        return <EmotionSpeakingLesson items={items} onComplete={handleComplete} />;
      case "lesson3":
        return <EmotionRightWrongLesson scenarios={scenarios} onComplete={handleComplete} />;
      case "lesson4":
        return <EmotionScenarioLesson activities={scenarioMatches} onComplete={handleComplete} />;
      default:
        return <div>Lesson not found</div>;
    }
  };

  return (
    <GameLayout backTo={`/games/learn-emotion/${groupId}`} title={group.title}>
      <main>{renderLesson()}</main>

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
