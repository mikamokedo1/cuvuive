"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

// Lesson Components
import { ExplainMultiplyLesson } from "@/features/games/learn-multiply/ExplainMultiplyLesson";
import { BalanceScaleMultiplyLesson } from "@/features/games/learn-multiply/BalanceScaleMultiplyLesson";
import { BubbleCannonMultiplyLesson } from "@/features/games/learn-multiply/BubbleCannonMultiplyLesson";
import { PlinkoCatchMultiplyLesson } from "@/features/games/learn-multiply/PlinkoCatchMultiplyLesson";
import { FillBlankLesson } from "@/features/games/learn-multiply/FillBlankLesson";
import { GROUP_CONFIG } from "@/features/games/learn-multiply/constants";

const GROUPS = [
  { id: "group1", title: "Bảng nhân 2" },
  { id: "group2", title: "Bảng nhân 3" },
  { id: "group3", title: "Bảng nhân 4" },
  { id: "group4", title: "Bảng nhân 5" },
  { id: "group5", title: "Bảng nhân 6" },
  { id: "group6", title: "Bảng nhân 7" },
  { id: "group7", title: "Bảng nhân 8" },
  { id: "group8", title: "Bảng nhân 9" },
  { id: "group9", title: "Đấu trường 2-9" },
];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const config = GROUP_CONFIG[groupId];

  // Dynamic lesson order based on config
  const maxLessons = config?.lessons?.length ?? 5;
  const LESSON_ORDER = Array.from({ length: maxLessons }, (_, i) => `lesson${i + 1}`);

  const game = useGameLesson({
    gameSlug: "learn-multiply",
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

  if (config.multiplier === "mixed") {
    // Mixed arena group (group9): 3 physics games + fill blank
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = (
          <BalanceScaleMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxProduct}
            onComplete={game.handleComplete}
          />
        );
        break;
      case "lesson2":
        LessonContent = (
          <BubbleCannonMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxProduct}
            onComplete={game.handleComplete}
          />
        );
        break;
      case "lesson3":
        LessonContent = (
          <PlinkoCatchMultiplyLesson
            multiplier="mixed"
            maxProduct={config.maxProduct}
            onComplete={game.handleComplete}
          />
        );
        break;
      case "lesson4":
        LessonContent = (
          <FillBlankLesson
            multiplier="mixed"
            maxProduct={config.maxProduct}
            onComplete={game.handleComplete}
          />
        );
        break;
    }
  } else {
    // Standard multiplication tables (2, 3, 4, 5, 6, 7, 8, 9)
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = (
          <ExplainMultiplyLesson multiplier={config.multiplier as number} onComplete={game.handleComplete} />
        );
        break;
      case "lesson2":
        LessonContent = (
          <BalanceScaleMultiplyLesson
            multiplier={config.multiplier}
            maxProduct={config.maxProduct}
            onComplete={game.handleComplete}
          />
        );
        break;
      case "lesson3":
        LessonContent = (
          <BubbleCannonMultiplyLesson
            multiplier={config.multiplier}
            maxProduct={config.maxProduct}
            onComplete={game.handleComplete}
          />
        );
        break;
      case "lesson4":
        LessonContent = (
          <PlinkoCatchMultiplyLesson
            multiplier={config.multiplier}
            maxProduct={config.maxProduct}
            onComplete={game.handleComplete}
          />
        );
        break;
      case "lesson5":
        LessonContent = (
          <FillBlankLesson
            multiplier={config.multiplier}
            maxProduct={config.maxProduct}
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
      gameSlug="learn-multiply"
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
