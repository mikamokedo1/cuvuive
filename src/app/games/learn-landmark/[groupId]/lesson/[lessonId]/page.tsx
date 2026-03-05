"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { getLandmarksForGroup, GROUPS } from "@/features/games/learn-landmark/constants";
import { LandmarkLearnLesson } from "@/features/games/learn-landmark/LandmarkLearnLesson";
import { LandmarkQuizLesson } from "@/features/games/learn-landmark/LandmarkQuizLesson";
import { LandmarkMemoryLesson } from "@/features/games/learn-landmark/LandmarkMemoryLesson";
import { LandmarkPuzzleLesson } from "@/features/games/learn-landmark/LandmarkPuzzleLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-landmark", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const landmarks = getLandmarksForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <LandmarkLearnLesson landmarks={landmarks} onComplete={game.handleComplete} />;
      case "lesson2":
        return <LandmarkQuizLesson landmarks={landmarks} onComplete={game.handleComplete} requiredWins={6} />;
      case "lesson3":
        return <LandmarkMemoryLesson landmarks={landmarks} onComplete={game.handleComplete} pairsCount={6} />;
      case "lesson4":
        return <LandmarkPuzzleLesson landmarks={landmarks} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-landmark"
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
