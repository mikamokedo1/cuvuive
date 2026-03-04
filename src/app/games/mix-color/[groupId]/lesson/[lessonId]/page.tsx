"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { GROUPS, MIXING_RULES } from "@/features/games/mix-color/constants";
import { MixColorLearnLesson } from "@/features/games/mix-color/MixColorLearnLesson";
import { MixColorQuizLesson } from "@/features/games/mix-color/MixColorQuizLesson";
import { MixColorReverseQuizLesson } from "@/features/games/mix-color/MixColorReverseQuizLesson";
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

  useEffect(() => {
    const runAccessCheck = async () => {
      if (!isLoaded) return;

      // 1. Progress Check
      if (!isLessonUnlocked(groupId, lessonId, "mix-color")) {
        router.push(`/games/mix-color/${groupId}`);
        return;
      }

      // 2. Freemium Check
      const access = await checkAccess("mix-color", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/mix-color/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/mix-color/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/mix-color/${groupId}`);
        return;
      }

      setIsCheckingAccess(false);
    };

    runAccessCheck();
  }, [isLoaded, groupId, lessonId, isLessonUnlocked, checkAccess, showPaywall, router]);

  if (!group || !lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  // Define lesson order
  const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

  const handleComplete = () => {
    markLessonComplete(groupId, lessonId, "mix-color");

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

      const access = await checkAccess("mix-color", groupId, nextLessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/mix-color/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/mix-color/${groupId}/lesson/${nextLessonId}`);
        }
        router.push(`/games/mix-color/${groupId}`);
        return;
      }

      router.push(`/games/mix-color/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/mix-color`);
    }
  };

  const groupRules = MIXING_RULES.filter((r) => group.rules.includes(r.id));
  const requireWins = groupId === "group3" ? 6 : 4;

  let LessonContent = null;
  let title = "";

  if (lessonId === "lesson1") {
    title = "Học pha màu";
    LessonContent = (
      <main>
        <MixColorLearnLesson rules={groupRules} onComplete={handleComplete} />
      </main>
    );
  } else if (lessonId === "lesson2") {
    title = "Pha màu nào?";
    LessonContent = (
      <main>
        <MixColorQuizLesson rules={groupRules} onComplete={handleComplete} requiredWins={requireWins} />
      </main>
    );
  } else if (lessonId === "lesson3") {
    title = "Thử thách pha màu";
    LessonContent = (
      <main>
        <MixColorReverseQuizLesson rules={groupRules} onComplete={handleComplete} requiredWins={requireWins} />
      </main>
    );
  }

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={title}
      groupId={groupId}
      gameSlug="mix-color"
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
