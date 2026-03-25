"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getDinosaursForGroup, DINOSAUR_DESCRIPTIONS } from "@/features/games/learn-dinosaur/constants";
import { DinosaurLearnLesson } from "@/features/games/learn-dinosaur/DinosaurLearnLesson";
import { DinosaurQuizLesson } from "@/features/games/learn-dinosaur/DinosaurQuizLesson";
import { DinosaurMemoryLesson } from "@/features/games/learn-dinosaur/DinosaurMemoryLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-dinosaur", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const dinosaurs = getDinosaursForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <DinosaurLearnLesson dinosaurs={dinosaurs} descriptions={DINOSAUR_DESCRIPTIONS} onComplete={game.handleComplete} />;
      case "lesson2":
        return <DinosaurQuizLesson dinosaurs={dinosaurs} onComplete={game.handleComplete} />;
      case "lesson3":
        return <DinosaurMemoryLesson dinosaurs={dinosaurs} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-dinosaur"
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
