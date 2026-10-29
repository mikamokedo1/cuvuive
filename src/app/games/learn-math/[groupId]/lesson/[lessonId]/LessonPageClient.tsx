"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

// Lesson Components
import { ExplainMathLesson } from "@/features/games/learn-math/ExplainMathLesson";
import { VisualMathLesson } from "@/features/games/learn-math/VisualMathLesson";
import { NumberMathLesson } from "@/features/games/learn-math/NumberMathLesson";
import { MixedMathLesson } from "@/features/games/learn-math/MixedMathLesson";
import { SymbolWritingLesson } from "@/features/games/learn-math/SymbolWritingLesson";
import { BalanceScaleMultiplyLesson } from "@/features/games/learn-multiply/BalanceScaleMultiplyLesson";
import { BubbleCannonMultiplyLesson } from "@/features/games/learn-multiply/BubbleCannonMultiplyLesson";
import { PlinkoCatchMultiplyLesson } from "@/features/games/learn-multiply/PlinkoCatchMultiplyLesson";
import { GROUP_CONFIG, GROUPS as MATH_GROUPS } from "@/features/games/learn-math/constants";

const GROUPS = MATH_GROUPS.map((g) => ({ id: g.id, title: g.title }));

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const config = GROUP_CONFIG[groupId];
  const operator = config?.operator === "mixed" ? "add" : config?.operator;
  const physicsOperation =
    config?.operator === "mixed" ? "add-sub" : config?.operator === "sub" ? "sub" : "add";

  // Dynamic lesson order based on config
  const maxLessons = config?.lessons?.length ?? 4;
  const LESSON_ORDER = Array.from({ length: maxLessons }, (_, i) => `lesson${i + 1}`);

  const game = useGameLesson({
    gameSlug: "learn-math",
    lessonOrder: LESSON_ORDER,
    groups: GROUPS,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!config || !game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  // Find current lesson title
  const currentLessonDef = config.lessons.find((l) => l.id === game.lessonId);
  const LessonTitle = currentLessonDef ? currentLessonDef.title : "";

  // Render the appropriate lesson component
  let LessonContent = null;

  if (game.groupId === "group1" || game.groupId === "group2") {
    // Range 10: Explain, Visual, BalanceScale, BubbleCannon, Plinko, SymbolWriting
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = operator ? <ExplainMathLesson operator={operator} onComplete={game.handleComplete} /> : null;
        break;
      case "lesson2":
        LessonContent = (
          <VisualMathLesson operator={config.operator} maxSum={config.maxSum} onComplete={game.handleComplete} />
        );
        break;
      case "lesson3":
        LessonContent = (
          <BalanceScaleMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxSum}
            onComplete={game.handleComplete}
            operation={physicsOperation}
          />
        );
        break;
      case "lesson4":
        LessonContent = (
          <BubbleCannonMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxSum}
            onComplete={game.handleComplete}
            operation={physicsOperation}
          />
        );
        break;
      case "lesson5":
        LessonContent = (
          <PlinkoCatchMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxSum}
            onComplete={game.handleComplete}
            operation={physicsOperation}
          />
        );
        break;
      case "lesson6":
        LessonContent = operator ? <SymbolWritingLesson operator={operator} onComplete={game.handleComplete} /> : null;
        break;
    }
  } else if (game.groupId === "group3" || game.groupId === "group4") {
    // Range 20: Visual, Number, BalanceScale, BubbleCannon, Plinko
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = (
          <VisualMathLesson operator={config.operator} maxSum={config.maxSum} onComplete={game.handleComplete} />
        );
        break;
      case "lesson2":
        LessonContent = (
          <NumberMathLesson operator={config.operator} maxSum={config.maxSum} onComplete={game.handleComplete} />
        );
        break;
      case "lesson3":
        LessonContent = (
          <BalanceScaleMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxSum}
            onComplete={game.handleComplete}
            operation={physicsOperation}
          />
        );
        break;
      case "lesson4":
        LessonContent = (
          <BubbleCannonMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxSum}
            onComplete={game.handleComplete}
            operation={physicsOperation}
          />
        );
        break;
      case "lesson5":
        LessonContent = (
          <PlinkoCatchMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxSum}
            onComplete={game.handleComplete}
            operation={physicsOperation}
          />
        );
        break;
    }
  } else if (game.groupId === "group5") {
    // Grade 1 Range 100 (No regrouping): Number, BalanceScale, BubbleCannon, Plinko
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = (
          <NumberMathLesson operator="mixed" maxSum={config.maxSum} onComplete={game.handleComplete} />
        );
        break;
      case "lesson2":
        LessonContent = (
          <BalanceScaleMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxSum}
            onComplete={game.handleComplete}
            operation="add-sub"
          />
        );
        break;
      case "lesson3":
        LessonContent = (
          <BubbleCannonMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxSum}
            onComplete={game.handleComplete}
            operation="add-sub"
          />
        );
        break;
      case "lesson4":
        LessonContent = (
          <PlinkoCatchMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxSum}
            onComplete={game.handleComplete}
            operation="add-sub"
          />
        );
        break;
    }
  } else {
    // group6 (Đấu Trường Cộng Trừ)
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = <MixedMathLesson mode="visual" maxSum={config.maxSum} onComplete={game.handleComplete} />;
        break;
      case "lesson2":
        LessonContent = (
          <BalanceScaleMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxSum}
            onComplete={game.handleComplete}
            operation="add-sub"
          />
        );
        break;
      case "lesson3":
        LessonContent = (
          <BubbleCannonMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxSum}
            onComplete={game.handleComplete}
            operation="add-sub"
          />
        );
        break;
      case "lesson4":
        LessonContent = (
          <PlinkoCatchMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxSum}
            onComplete={game.handleComplete}
            operation="add-sub"
          />
        );
        break;
    }
  }

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={LessonTitle}
      groupId={game.groupId}
      gameSlug="learn-math"
      showModal={game.showModal}
      handleNextLesson={game.handleNextLesson}
      currentLessonNum={game.currentLessonNum}
      nextLessonNum={game.nextLessonNum}
      isGroupDone={game.isGroupDone}
      isCourseComplete={game.isCourseComplete}
      isLoaded={game.isLoaded}
    />
  );
}
