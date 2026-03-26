"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import {
  GROUPS,
  getHygieneForGroup,
  getScenariosForGroup,
  getSequencesForGroup,
  HYGIENE_DESCRIPTIONS,
} from "@/features/games/learn-hygiene/constants";
import { HygieneLearnLesson } from "@/features/games/learn-hygiene/HygieneLearnLesson";
import { HygieneSpeakingLesson } from "@/features/games/learn-hygiene/HygieneSpeakingLesson";
import { HygieneRightWrongLesson } from "@/features/games/learn-hygiene/HygieneRightWrongLesson";
import { HygieneSequenceLesson } from "@/features/games/learn-hygiene/HygieneSequenceLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4"];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const game = useGameLesson({ gameSlug: "learn-hygiene", lessonOrder: LESSON_ORDER, groups: GROUPS ,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const items = getHygieneForGroup(game.groupId);
  const scenarios = getScenariosForGroup(game.groupId);
  const sequences = getSequencesForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <HygieneLearnLesson items={items} descriptions={HYGIENE_DESCRIPTIONS} onComplete={game.handleComplete} />;
      case "lesson2":
        return <HygieneSpeakingLesson items={items} onComplete={game.handleComplete} />;
      case "lesson3":
        return <HygieneRightWrongLesson scenarios={scenarios} onComplete={game.handleComplete} />;
      case "lesson4":
        return <HygieneSequenceLesson activities={sequences} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-hygiene"
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
