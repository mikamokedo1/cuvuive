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

  const handleComplete = () => {
    markLessonComplete(groupId, lessonId, "compare-quantity");
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);

    // Navigate to next lesson or back to group
    const currentLessonNum = parseInt(lessonId.replace("lesson", ""), 10);
    const nextLessonId = `lesson${currentLessonNum + 1}`;

    if (currentLessonNum < 4) {
      router.push(`/games/compare-quantity/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/compare-quantity/${groupId}`);
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
        // Mixed explain - could show all 3 symbols
        LessonContent = <ExplainLesson comparisonType="greater" onComplete={handleComplete} />;
        LessonTitle = "Ôn tập lại các dấu";
        break;
      case "lesson2":
        LessonContent = <MixedPracticeLesson onComplete={handleComplete} />;
        LessonTitle = "So sánh đồ vật";
        break;
      case "lesson3":
        LessonContent = <MixedPracticeLesson onComplete={handleComplete} />;
        LessonTitle = "So sánh số";
        break;
      case "lesson4":
        LessonContent = <MixedPracticeLesson onComplete={handleComplete} />;
        LessonTitle = "Tập viết dấu";
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
      {LessonContent}

      <CompletionModal
        isOpen={showModal}
        onNext={handleModalClose}
        currentLessonNum={parseInt(lessonId.replace("lesson", ""), 10)}
        nextLessonNum={
          parseInt(lessonId.replace("lesson", ""), 10) < 4
            ? parseInt(lessonId.replace("lesson", ""), 10) + 1
            : undefined
        }
        isGroupComplete={parseInt(lessonId.replace("lesson", ""), 10) >= 4}
      />
    </GameLayout>
  );
}
