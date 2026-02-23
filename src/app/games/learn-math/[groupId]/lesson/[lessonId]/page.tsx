"use client";

import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { useEffect, useState } from "react";
import { CompletionModal } from "@/components/games/CompletionModal";

// Lesson Components
import { ExplainMathLesson } from "@/features/games/learn-math/ExplainMathLesson";
import { VisualMathLesson } from "@/features/games/learn-math/VisualMathLesson";
import { NumberMathLesson } from "@/features/games/learn-math/NumberMathLesson";
import { MixedMathLesson } from "@/features/games/learn-math/MixedMathLesson";
import { SymbolWritingLesson } from "@/features/games/learn-math/SymbolWritingLesson";
import { GROUP_CONFIG } from "@/features/games/learn-math/constants";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { markLessonComplete, isLessonUnlocked } = useProgress();
  const { checkAccess, showPaywall } = useAccess();

  const [showModal, setShowModal] = useState(false);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const lessonId = typeof params.lessonId === "string" ? params.lessonId : "";

  const config = GROUP_CONFIG[groupId];

  // Check access on mount
  useEffect(() => {
    const verifyAccess = async () => {
      // 1. Progress Check (must complete previous lesson)
      if (!isLessonUnlocked(groupId, lessonId, "learn-math")) {
        router.push(`/games/learn-math/${groupId}`);
        return;
      }

      const result = await checkAccess("learn-math", groupId, lessonId);
      if (!result.userHasAccess) {
        if (result.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-math/${groupId}/lesson/${lessonId}`);
        } else {
          showPaywall("premium", `/games/learn-math/${groupId}/lesson/${lessonId}`);
        }
        setHasAccess(false);
      } else {
        setHasAccess(true);
      }
    };
    verifyAccess();
  }, [groupId, lessonId, checkAccess, showPaywall, isLessonUnlocked, router]);

  if (!config) {
    return <div>Group not found</div>;
  }

  // Lesson order definition
  const maxLessons = config.lessons.length;
  const LESSON_ORDER = Array.from({ length: maxLessons }, (_, i) => `lesson${i + 1}`);
  const GROUPS_ORDER = ["group1", "group2", "group3"];

  const [currentLessonNum, setCurrentLessonNum] = useState<number | string>(1);
  const [nextLessonNum, setNextLessonNum] = useState<number | string | null>(null);
  const [isGroupDone, setIsGroupDone] = useState(false);

  const handleComplete = () => {
    markLessonComplete(groupId, lessonId, "learn-math");

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
      router.push(`/games/learn-math/${groupId}/lesson/${nextLessonId}`);
    } else {
      // Navigate to next group -> always back to menu
      router.push(`/games/learn-math`);
    }
  };

  // Loading state
  if (hasAccess === null) {
    return (
      <GameLayout backTo={`/games/learn-math/${groupId}`}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
        </div>
      </GameLayout>
    );
  }

  // No access - will redirect via paywall
  if (hasAccess === false) return null;

  // Find current lesson title
  const currentLessonDef = config.lessons.find((l) => l.id === lessonId);
  const LessonTitle = currentLessonDef ? currentLessonDef.title : "";

  // Render the appropriate lesson component
  let LessonContent = null;

  if (groupId === "group3") {
    // Practice group: mixed operator
    switch (lessonId) {
      case "lesson1":
        LessonContent = <MixedMathLesson mode="visual" maxSum={config.maxSum} onComplete={handleComplete} />;
        break;
      case "lesson2":
        LessonContent = <MixedMathLesson mode="number" maxSum={config.maxSum} onComplete={handleComplete} />;
        break;
    }
  } else {
    // Addition & Subtraction groups
    switch (lessonId) {
      case "lesson1":
        LessonContent = <ExplainMathLesson operator={config.operator as any} onComplete={handleComplete} />;
        break;
      case "lesson2":
        LessonContent = (
          <VisualMathLesson operator={config.operator} maxSum={config.maxSum} onComplete={handleComplete} />
        );
        break;
      case "lesson3":
        LessonContent = (
          <NumberMathLesson operator={config.operator} maxSum={config.maxSum} onComplete={handleComplete} />
        );
        break;
      case "lesson4":
        LessonContent = <SymbolWritingLesson operator={config.operator as any} onComplete={handleComplete} />;
        break;
    }
  }

  if (!LessonContent) {
    return (
      <GameLayout backTo={`/games/learn-math/${groupId}`}>
        <div className="text-center text-slate-500">Lesson not found</div>
      </GameLayout>
    );
  }

  return (
    <GameLayout backTo={`/games/learn-math/${groupId}`} title={LessonTitle}>
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
