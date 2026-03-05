"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { getCostumesForGroup, GROUPS } from "@/features/games/learn-costume/constants";
import { CostumeLearnLesson } from "@/features/games/learn-costume/CostumeLearnLesson";
import { CostumeQuizLesson } from "@/features/games/learn-costume/CostumeQuizLesson";
import { CostumeDressUpLesson } from "@/features/games/learn-costume/CostumeDressUpLesson";
import { CostumeMemoryLesson } from "@/features/games/learn-costume/CostumeMemoryLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-costume", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const costumes = getCostumesForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <CostumeLearnLesson costumes={costumes} onComplete={game.handleComplete} />;
      case "lesson2":
        return <CostumeQuizLesson costumes={costumes} onComplete={game.handleComplete} requiredWins={6} />;
      case "lesson3":
        return <CostumeDressUpLesson costumes={costumes} onComplete={game.handleComplete} />;
      case "lesson4":
        return <CostumeMemoryLesson costumes={costumes} onComplete={game.handleComplete} pairsCount={6} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-costume"
      showModal={game.showModal}
      handleNextLesson={game.handleNextLesson}
      currentLessonNum={game.currentLessonNum}
      nextLessonNum={game.nextLessonNum}
      isGroupDone={game.isGroupDone}
      isLoaded={game.isLoaded}
      isCheckingAccess={game.isCheckingAccess}
    />
  );
}
