"use client";

import { useParams } from "next/navigation";
import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getItemsForGroup } from "@/features/games/learn-weather/constants";
import { WeatherLearnLesson } from "@/features/games/learn-weather/WeatherLearnLesson";
import { WeatherSpeakingLesson } from "@/features/games/learn-weather/WeatherSpeakingLesson";
import { WeatherQuizLesson } from "@/features/games/learn-weather/WeatherQuizLesson";
import { WeatherMemoryLesson } from "@/features/games/learn-weather/WeatherMemoryLesson";
import { SeasonClothingLesson } from "@/features/games/learn-weather/SeasonClothingLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

export default function WeatherLessonPage() {
  const params = useParams();
  const groupId = typeof params.groupId === "string" ? params.groupId : "";

  // Lesson order depends on group (group3 has 5 lessons)
  const LESSON_ORDER =
    groupId === "group3"
      ? ["lesson1", "lesson2", "lesson3", "lesson4", "lesson5"]
      : ["lesson1", "lesson2", "lesson3", "lesson4"];

  const game = useGameLesson({ gameSlug: "learn-weather", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const items = getItemsForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <WeatherLearnLesson items={items} onComplete={game.handleComplete} />;
      case "lesson2":
        return <WeatherSpeakingLesson items={items} onComplete={game.handleComplete} />;
      case "lesson3":
        return <WeatherQuizLesson items={items} onComplete={game.handleComplete} />;
      case "lesson4":
        return <WeatherMemoryLesson items={items} onComplete={game.handleComplete} />;
      case "lesson5":
        if (game.groupId === "group3") {
          return <SeasonClothingLesson seasons={items} onComplete={game.handleComplete} />;
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-weather"
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
