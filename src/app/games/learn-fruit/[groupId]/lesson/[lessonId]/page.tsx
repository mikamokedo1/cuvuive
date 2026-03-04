"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getFruitsForGroup } from "@/features/games/learn-fruit/constants";
import { FruitLearnLesson } from "@/features/games/learn-fruit/FruitLearnLesson";
import { FruitQuizLesson } from "@/features/games/learn-fruit/FruitQuizLesson";
import { FruitMemoryLesson } from "@/features/games/learn-fruit/FruitMemoryLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-fruit", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const fruits = getFruitsForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <FruitLearnLesson fruits={fruits} onComplete={game.handleComplete} />;
      case "lesson2":
        return <FruitQuizLesson fruits={fruits} onComplete={game.handleComplete} />;
      case "lesson3":
        return <FruitMemoryLesson fruits={fruits} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-fruit"
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
