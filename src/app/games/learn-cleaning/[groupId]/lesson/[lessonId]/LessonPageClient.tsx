"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import {
  GROUPS,
  getCleaningForGroup,
  getScenariosForGroup,
  getSequencesForGroup,
  CLEANING_DESCRIPTIONS,
} from "@/features/games/learn-cleaning/constants";
import { CleaningLearnLesson } from "@/features/games/learn-cleaning/CleaningLearnLesson";
import { CleaningSpeakingLesson } from "@/features/games/learn-cleaning/CleaningSpeakingLesson";
import { CleaningRightWrongLesson } from "@/features/games/learn-cleaning/CleaningRightWrongLesson";
import { CleaningSequenceLesson } from "@/features/games/learn-cleaning/CleaningSequenceLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4"];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const game = useGameLesson({
    gameSlug: "learn-cleaning",
    lessonOrder: LESSON_ORDER,
    groups: GROUPS,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const items = getCleaningForGroup(game.groupId);
  const scenarios = getScenariosForGroup(game.groupId);
  const sequences = getSequencesForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <CleaningLearnLesson items={items} descriptions={CLEANING_DESCRIPTIONS} onComplete={game.handleComplete} />;
      case "lesson2":
        return <CleaningSpeakingLesson items={items} onComplete={game.handleComplete} />;
      case "lesson3":
        return <CleaningRightWrongLesson scenarios={scenarios} onComplete={game.handleComplete} />;
      case "lesson4":
        return <CleaningSequenceLesson activities={sequences} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-cleaning"
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
