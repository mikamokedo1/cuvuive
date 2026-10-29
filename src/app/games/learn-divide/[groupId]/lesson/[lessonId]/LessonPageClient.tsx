"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

import { ExplainDivideLesson } from "@/features/games/learn-divide/ExplainDivideLesson";
import { FillBlankDivideLesson } from "@/features/games/learn-divide/FillBlankDivideLesson";
import { BalanceScaleMultiplyLesson } from "@/features/games/learn-multiply/BalanceScaleMultiplyLesson";
import { BubbleCannonMultiplyLesson } from "@/features/games/learn-multiply/BubbleCannonMultiplyLesson";
import { PlinkoCatchMultiplyLesson } from "@/features/games/learn-multiply/PlinkoCatchMultiplyLesson";
import { GROUP_CONFIG } from "@/features/games/learn-divide/constants";

const GROUPS = [
  { id: "group1", title: "Bảng chia 2" },
  { id: "group2", title: "Bảng chia 3" },
  { id: "group3", title: "Bảng chia 4" },
  { id: "group4", title: "Bảng chia 5" },
  { id: "group5", title: "Bảng chia 6" },
  { id: "group6", title: "Bảng chia 7" },
  { id: "group7", title: "Bảng chia 8" },
  { id: "group8", title: "Bảng chia 9" },
  { id: "group9", title: "Đấu trường 2-9" },
];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const config = GROUP_CONFIG[groupId];

  const maxLessons = config?.lessons?.length ?? 5;
  const LESSON_ORDER = Array.from({ length: maxLessons }, (_, i) => `lesson${i + 1}`);

  const game = useGameLesson({
    gameSlug: "learn-divide",
    lessonOrder: LESSON_ORDER,
    groups: GROUPS,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!config || !game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const currentLessonDef = config.lessons.find((l) => l.id === game.lessonId);
  const LessonTitle = currentLessonDef ? currentLessonDef.title : "";

  let LessonContent = null;

  if (config.divisor === "mixed") {
    // Mixed arena group (group9): 3 physics games + fill blank
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = (
          <BalanceScaleMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxDividend}
            onComplete={game.handleComplete}
            operation="divide"
          />
        );
        break;
      case "lesson2":
        LessonContent = (
          <BubbleCannonMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxDividend}
            onComplete={game.handleComplete}
            operation="divide"
          />
        );
        break;
      case "lesson3":
        LessonContent = (
          <PlinkoCatchMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxDividend}
            onComplete={game.handleComplete}
            operation="divide"
          />
        );
        break;
      case "lesson4":
        LessonContent = (
          <FillBlankDivideLesson
            divisor="mixed"
            maxDividend={config.maxDividend}
            onComplete={game.handleComplete}
          />
        );
        break;
    }
  } else {
    // Standard division tables (2..9)
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = (
          <ExplainDivideLesson divisor={config.divisor as number} onComplete={game.handleComplete} />
        );
        break;
      case "lesson2":
        LessonContent = (
          <BalanceScaleMultiplyLesson
            multiplier={config.divisor}
            maxProduct={config.maxDividend}
            onComplete={game.handleComplete}
            operation="divide"
          />
        );
        break;
      case "lesson3":
        LessonContent = (
          <BubbleCannonMultiplyLesson
            multiplier={config.divisor}
            maxProduct={config.maxDividend}
            onComplete={game.handleComplete}
            operation="divide"
          />
        );
        break;
      case "lesson4":
        LessonContent = (
          <PlinkoCatchMultiplyLesson
            multiplier={config.divisor}
            maxProduct={config.maxDividend}
            onComplete={game.handleComplete}
            operation="divide"
          />
        );
        break;
      case "lesson5":
        LessonContent = (
          <FillBlankDivideLesson
            divisor={config.divisor}
            maxDividend={config.maxDividend}
            onComplete={game.handleComplete}
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
      gameSlug="learn-divide"
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
