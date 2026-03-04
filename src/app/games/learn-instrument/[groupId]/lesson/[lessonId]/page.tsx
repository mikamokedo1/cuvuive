"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getInstrumentsForGroup } from "@/features/games/learn-instrument/constants";
import { InstrumentLearnLesson } from "@/features/games/learn-instrument/InstrumentLearnLesson";
import { InstrumentQuizLesson } from "@/features/games/learn-instrument/InstrumentQuizLesson";
import { InstrumentMemoryLesson } from "@/features/games/learn-instrument/InstrumentMemoryLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-instrument", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const instruments = getInstrumentsForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <InstrumentLearnLesson instruments={instruments} onComplete={game.handleComplete} />;
      case "lesson2":
        return <InstrumentQuizLesson instruments={instruments} onComplete={game.handleComplete} />;
      case "lesson3":
        return <InstrumentMemoryLesson instruments={instruments} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={<main>{renderLesson()}</main>}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-instrument"
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
