"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getWordsForGroup } from "@/features/games/learn-english-alphabet/constants";
import { AlphabetFlashcardLesson } from "@/features/games/learn-english-alphabet/AlphabetFlashcardLesson";
import { AlphabetQuizLesson } from "@/features/games/learn-english-alphabet/AlphabetQuizLesson";
import { AlphabetSpellLesson } from "@/features/games/learn-english-alphabet/AlphabetSpellLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4"];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const game = useGameLesson({
    gameSlug: "learn-english-alphabet",
    lessonOrder: LESSON_ORDER,
    groups: GROUPS,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const words = getWordsForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <AlphabetFlashcardLesson words={words} onComplete={game.handleComplete} />;
      case "lesson2":
      case "lesson4":
        return <AlphabetQuizLesson words={words} onComplete={game.handleComplete} />;
      case "lesson3":
        return <AlphabetSpellLesson words={words} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-english-alphabet"
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
