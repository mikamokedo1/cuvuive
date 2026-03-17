"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { getFlagsForGroup, GROUPS, FLAG_DESCRIPTIONS } from "@/features/games/learn-flag/constants";
import { FlagLearnLesson } from "@/features/games/learn-flag/FlagLearnLesson";
import { FlagQuizLesson } from "@/features/games/learn-flag/FlagQuizLesson";
import { FlagMemoryLesson } from "@/features/games/learn-flag/FlagMemoryLesson";
import { FlagPuzzleLesson } from "@/features/games/learn-flag/FlagPuzzleLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-flag", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const flags = getFlagsForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <FlagLearnLesson flags={flags} descriptions={FLAG_DESCRIPTIONS} onComplete={game.handleComplete} />;
      case "lesson2":
        return <FlagQuizLesson flags={flags} onComplete={game.handleComplete} requiredWins={6} />;
      case "lesson3":
        return <FlagMemoryLesson flags={flags} onComplete={game.handleComplete} pairsCount={6} />;
      case "lesson4":
        return <FlagPuzzleLesson flags={flags} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-flag"
      showModal={game.showModal}
      handleNextLesson={game.handleNextLesson}
      currentLessonNum={game.currentLessonNum}
      nextLessonNum={game.nextLessonNum}
      isGroupDone={game.isGroupDone}
      isLoaded={game.isLoaded}
    />
  );
}
