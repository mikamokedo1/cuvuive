"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getOccupationsForGroup, OCCUPATION_DESCRIPTIONS } from "@/features/games/learn-occupation/constants";
import { OccupationLearnLesson } from "@/features/games/learn-occupation/OccupationLearnLesson";
import { OccupationQuizLesson } from "@/features/games/learn-occupation/OccupationQuizLesson";
import { OccupationMatchLesson } from "@/features/games/learn-occupation/OccupationMatchLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-occupation", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const occupations = getOccupationsForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <OccupationLearnLesson occupations={occupations} descriptions={OCCUPATION_DESCRIPTIONS} onComplete={game.handleComplete} />;
      case "lesson2":
        return <OccupationQuizLesson occupations={occupations} onComplete={game.handleComplete} />;
      case "lesson3":
        return <OccupationMatchLesson occupations={occupations} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-occupation"
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
