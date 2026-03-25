"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS } from "@/features/games/find-pattern/constants";
import { PatternLearnLesson } from "@/features/games/find-pattern/PatternLearnLesson";
import { PatternQuizLesson } from "@/features/games/find-pattern/PatternQuizLesson";
import { PatternFillLesson } from "@/features/games/find-pattern/PatternFillLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const game = useGameLesson({ gameSlug: "find-pattern", lessonOrder: LESSON_ORDER, groups: GROUPS ,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <PatternLearnLesson groupId={game.groupId} onComplete={game.handleComplete} />;
      case "lesson2":
        return <PatternQuizLesson groupId={game.groupId} onComplete={game.handleComplete} />;
      case "lesson3":
        return <PatternFillLesson groupId={game.groupId} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="find-pattern"
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
