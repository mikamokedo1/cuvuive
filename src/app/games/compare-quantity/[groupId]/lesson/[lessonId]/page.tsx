"use client";

import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { useEffect, useState } from "react";
import { CompletionModal } from "@/components/games/CompletionModal";

// Lesson Components
import { ExplainLesson } from "@/features/games/compare-game/ExplainLesson";
import { VisualCompareLesson } from "@/features/games/compare-game/VisualCompareLesson";
import { NumberCompareLesson } from "@/features/games/compare-game/NumberCompareLesson";
import { SymbolWritingLesson } from "@/features/games/compare-game/SymbolWritingLesson";
import { MixedPracticeLesson } from "@/features/games/compare-game/MixedPracticeLesson";

const MAP_LESSON_TITLE: Record<string, { text: string; symbol: string }> = {
  greater: {
    text: "lớn",
    symbol: ">",
  },
  less: {
    text: "nhỏ",
    symbol: "<",
  },
  equal: {
    text: "bằng",
    symbol: "=",
  },
};

// Map groupId to comparison type
const GROUP_TO_TYPE: Record<string, "greater" | "less" | "equal" | "mixed"> = {
  group1: "greater",
  group2: "less",
  group3: "equal",
  group4: "mixed",
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { markLessonComplete, isLessonUnlocked } = useProgress();
  const { checkAccess, showPaywall } = useAccess();

  const [showModal, setShowModal] = useState(false);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const lessonId = typeof params.lessonId === "string" ? params.lessonId : "";
  const comparisonType = GROUP_TO_TYPE[groupId];

  // Check access on mount
  useEffect(() => {
    const verifyAccess = async () => {
      // 1. Progress Check (must complete previous lesson)
      if (!isLessonUnlocked(groupId, lessonId, "compare-quantity")) {
        router.push(`/games/compare-quantity/${groupId}`);
        return;
      }

      const result = await checkAccess("compare-quantity", groupId, lessonId);
      if (!result.userHasAccess) {
        if (result.reason === "not_logged_in") {
          showPaywall("login", `/games/compare-quantity/${groupId}/lesson/${lessonId}`);
        } else {
          showPaywall("premium", `/games/compare-quantity/${groupId}/lesson/${lessonId}`);
        }
        setHasAccess(false);
      } else {
        setHasAccess(true);
      }
    };
    verifyAccess();
  }, [groupId, lessonId, checkAccess, showPaywall, isLessonUnlocked, router]);

  // Lesson order definition
  const maxLessons = groupId === "group4" ? 2 : 4;
  const LESSON_ORDER = Array.from({ length: maxLessons }, (_, i) => `lesson${i + 1}`);
  const GROUPS_ORDER = ["group1", "group2", "group3", "group4"];

  const [currentLessonNum, setCurrentLessonNum] = useState<number | string>(1);
  const [nextLessonNum, setNextLessonNum] = useState<number | string | null>(null);
  const [isGroupDone, setIsGroupDone] = useState(false);

  const handleComplete = () => {
    markLessonComplete(groupId, lessonId, "compare-quantity");

    const currentIdx = LESSON_ORDER.indexOf(lessonId);
    setCurrentLessonNum(currentIdx + 1);

    if (currentIdx < LESSON_ORDER.length - 1) {
      // Has next lesson
      setNextLessonNum(currentIdx + 2);
      setIsGroupDone(false);
    } else {
      // Last lesson of group
      setIsGroupDone(true);
      const groupIdx = GROUPS_ORDER.indexOf(groupId);
      if (groupIdx < GROUPS_ORDER.length - 1) {
        setNextLessonNum(groupIdx + 2); // Show next group number
      } else {
        setNextLessonNum(null); // Course complete
      }
    }
    setShowModal(true);
  };

  const handleNextLesson = async () => {
    setShowModal(false);
    const currentIdx = LESSON_ORDER.indexOf(lessonId);

    if (currentIdx < LESSON_ORDER.length - 1) {
      // Navigate to next lesson
      const nextLessonId = LESSON_ORDER[currentIdx + 1];
      router.push(`/games/compare-quantity/${groupId}/lesson/${nextLessonId}`);
    } else {
      // Navigate to next group
      const groupIdx = GROUPS_ORDER.indexOf(groupId);
      if (groupIdx < GROUPS_ORDER.length - 1) {
        const nextGroupId = GROUPS_ORDER[groupIdx + 1];

        // Check access for next group
        const access = await checkAccess("compare-quantity", nextGroupId, "lesson1");
        if (!access.userHasAccess) {
          if (access.reason === "not_logged_in") {
            showPaywall("login", `/games/compare-quantity/${nextGroupId}/lesson/lesson1`);
          } else if (access.reason === "premium_required") {
            showPaywall("premium", `/games/compare-quantity/${nextGroupId}/lesson/lesson1`);
          }
          router.push(`/games/compare-quantity`);
          return;
        }

        router.push(`/games/compare-quantity/${nextGroupId}`);
      } else {
        // Back to menu
        router.push(`/games/compare-quantity`);
      }
    }
  };

  // Loading state
  if (hasAccess === null) {
    return (
      <GameLayout backTo={`/games/compare-quantity/${groupId}`}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
        </div>
      </GameLayout>
    );
  }

  // No access - will redirect via paywall
  if (hasAccess === false) {
    return null;
  }

  // Render the appropriate lesson component
  let LessonContent = null;
  let LessonTitle = "";

  if (groupId === "group4") {
    // Practice group - different lesson structure
    switch (lessonId) {
      case "lesson1":
        LessonContent = <VisualCompareLesson comparisonType="mixed" onComplete={handleComplete} />;
        LessonTitle = "So sánh đồ vật";
        break;
      case "lesson2":
        LessonContent = <NumberCompareLesson comparisonType="mixed" onComplete={handleComplete} />;
        LessonTitle = "So sánh số";
        break;
    }
  } else if (comparisonType && comparisonType !== "mixed") {
    // Greater, Less, or Equal groups
    switch (lessonId) {
      case "lesson1":
        LessonContent = <ExplainLesson comparisonType={comparisonType} onComplete={handleComplete} />;
        LessonTitle = `Dấu ${MAP_LESSON_TITLE[comparisonType].text} hơn`;
        break;
      case "lesson2":
        LessonContent = <VisualCompareLesson comparisonType={comparisonType} onComplete={handleComplete} />;
        LessonTitle = `Chọn dấu ${MAP_LESSON_TITLE[comparisonType].text} hơn`;
        break;
      case "lesson3":
        LessonContent = <NumberCompareLesson comparisonType={comparisonType} onComplete={handleComplete} />;
        LessonTitle = `Chọn dấu ${MAP_LESSON_TITLE[comparisonType].text}`;
        break;
      case "lesson4":
        LessonContent = <SymbolWritingLesson comparisonType={comparisonType} onComplete={handleComplete} />;
        LessonTitle = `Tập viết dấu ${MAP_LESSON_TITLE[comparisonType].symbol}`;
        break;
    }
  }

  if (!LessonContent) {
    return (
      <GameLayout backTo={`/games/compare-quantity/${groupId}`}>
        <div className="text-center text-slate-500">Lesson not found</div>
      </GameLayout>
    );
  }

  return (
    <GameLayout backTo={`/games/compare-quantity/${groupId}`} title={LessonTitle}>
      <main className="flex flex-col items-center justify-center w-full min-h-[60vh]">{LessonContent}</main>

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
