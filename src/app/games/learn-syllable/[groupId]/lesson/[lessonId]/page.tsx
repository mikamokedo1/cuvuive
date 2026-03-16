"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getSyllablesForGroup } from "@/features/games/learn-syllable/constants";
import { SyllableLearnLesson } from "@/features/games/learn-syllable/SyllableLearnLesson";
import { SyllableSpeakLesson } from "@/features/games/learn-syllable/SyllableSpeakLesson";
import { SyllableQuizLesson } from "@/features/games/learn-syllable/SyllableQuizLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-syllable", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const syllables = getSyllablesForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <SyllableLearnLesson syllables={syllables} onComplete={game.handleComplete} />;
      // case "lesson2":
      //   return <SyllableSpeakLesson syllables={syllables} onComplete={game.handleComplete} />;
      case "lesson2":
        return <SyllableQuizLesson syllables={syllables} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-syllable"
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
