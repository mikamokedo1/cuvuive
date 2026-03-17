"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getAnimalsForGroup, ANIMAL_DESCRIPTIONS } from "@/features/games/learn-animal/constants";
import { AnimalLearnLesson } from "@/features/games/learn-animal/AnimalLearnLesson";
import { AnimalQuizLesson } from "@/features/games/learn-animal/AnimalQuizLesson";
import { AnimalMemoryLesson } from "@/features/games/learn-animal/AnimalMemoryLesson";
import { AnimalSpeakingLesson } from "@/features/games/learn-animal/AnimalSpeakingLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-animal", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const animals = getAnimalsForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <AnimalLearnLesson animals={animals} descriptions={ANIMAL_DESCRIPTIONS} onComplete={game.handleComplete} />;
      case "lesson2":
        return <AnimalSpeakingLesson animals={animals} onComplete={game.handleComplete} />;
      case "lesson3":
        return <AnimalQuizLesson animals={animals} onComplete={game.handleComplete} />;
      case "lesson4":
        return <AnimalMemoryLesson animals={animals} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-animal"
      showModal={game.showModal}
      handleNextLesson={game.handleNextLesson}
      currentLessonNum={game.currentLessonNum}
      nextLessonNum={game.nextLessonNum}
      isGroupDone={game.isGroupDone}
      isLoaded={game.isLoaded}
    />
  );
}
