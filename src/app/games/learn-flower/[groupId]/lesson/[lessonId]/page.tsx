"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getFlowersForGroup } from "@/features/games/learn-flower/constants";
import { FlowerLearnLesson } from "@/features/games/learn-flower/FlowerLearnLesson";
import { FlowerQuizLesson } from "@/features/games/learn-flower/FlowerQuizLesson";
import { FlowerMemoryLesson } from "@/features/games/learn-flower/FlowerMemoryLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-flower", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const flowers = getFlowersForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <FlowerLearnLesson flowers={flowers} onComplete={game.handleComplete} />;
      case "lesson2":
        return <FlowerQuizLesson flowers={flowers} onComplete={game.handleComplete} />;
      case "lesson3":
        return <FlowerMemoryLesson flowers={flowers} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-flower"
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
