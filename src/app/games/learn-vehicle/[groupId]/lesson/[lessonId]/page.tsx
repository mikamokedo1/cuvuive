"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getVehiclesForGroup, getAllVehicles } from "@/features/games/learn-vehicle/constants";
import { VehicleLearnLesson } from "@/features/games/learn-vehicle/VehicleLearnLesson";
import { VehicleQuizLesson } from "@/features/games/learn-vehicle/VehicleQuizLesson";
import { VehicleMemoryLesson } from "@/features/games/learn-vehicle/VehicleMemoryLesson";
import { VehicleSortLesson } from "@/features/games/learn-vehicle/VehicleSortLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-vehicle", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const isGroup4 = game.groupId === "group4";
  const vehicles = isGroup4 ? getAllVehicles() : getVehiclesForGroup(game.groupId);

  const renderLesson = () => {
    if (isGroup4) {
      // Group 4: Quiz, Memory, Sort (using ALL vehicles)
      switch (game.lessonId) {
        case "lesson1":
          return <VehicleQuizLesson vehicles={vehicles} onComplete={game.handleComplete} />;
        case "lesson2":
          return <VehicleMemoryLesson vehicles={vehicles} onComplete={game.handleComplete} />;
        case "lesson3":
          return <VehicleSortLesson vehicles={vehicles} onComplete={game.handleComplete} />;
        default:
          return null;
      }
    } else {
      // Groups 1-3: Learn, Quiz, Memory (using group-specific vehicles)
      switch (game.lessonId) {
        case "lesson1":
          return <VehicleLearnLesson vehicles={vehicles} onComplete={game.handleComplete} />;
        case "lesson2":
          return <VehicleQuizLesson vehicles={vehicles} onComplete={game.handleComplete} />;
        case "lesson3":
          return <VehicleMemoryLesson vehicles={vehicles} onComplete={game.handleComplete} />;
        default:
          return null;
      }
    }
  };

  return (
    <GameWrapGame
      LessonContent={<main>{renderLesson()}</main>}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-vehicle"
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
