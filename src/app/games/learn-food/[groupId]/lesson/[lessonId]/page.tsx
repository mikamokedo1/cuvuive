"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getFoodsForGroup } from "@/features/games/learn-food/constants";
import { FoodLearnLesson } from "@/features/games/learn-food/FoodLearnLesson";
import { FoodQuizLesson } from "@/features/games/learn-food/FoodQuizLesson";
import { FoodMemoryLesson } from "@/features/games/learn-food/FoodMemoryLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-food", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const foods = getFoodsForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <FoodLearnLesson foods={foods} onComplete={game.handleComplete} />;
      case "lesson2":
        return <FoodQuizLesson foods={foods} onComplete={game.handleComplete} />;
      case "lesson3":
        return <FoodMemoryLesson foods={foods} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-food"
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
