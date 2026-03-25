"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS } from "@/features/games/learn-clock/constants";
import { ClockLearnLesson } from "@/features/games/learn-clock/ClockLearnLesson";
import { ClockQuizLesson } from "@/features/games/learn-clock/ClockQuizLesson";
import { ClockAdjustLesson } from "@/features/games/learn-clock/ClockAdjustLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

// Define a maximum possible order to cover analog lessons (1-3)
const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const game = useGameLesson({ gameSlug: "learn-clock", lessonOrder: LESSON_ORDER, groups: GROUPS ,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const type = game.groupId === "group1" ? "analog" : "digital";

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <ClockLearnLesson type={type} onComplete={game.handleComplete} />;
      case "lesson2":
        return <ClockQuizLesson type={type} onComplete={game.handleComplete} />;
      case "lesson3":
        if (type === "analog") {
          return <ClockAdjustLesson onComplete={game.handleComplete} />;
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
      gameSlug="learn-clock"
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
