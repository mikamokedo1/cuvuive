"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getWordsForGroup } from "@/features/games/learn-word/constants";
import { WordLearnLesson } from "@/features/games/learn-word/WordLearnLesson";
import { WordSpeakingLesson } from "@/features/games/learn-word/WordSpeakingLesson";
import { WordSpellingLesson } from "@/features/games/learn-word/WordSpellingLesson";
import { WordListeningLesson } from "@/features/games/learn-word/WordListeningLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4"];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const game = useGameLesson({
    gameSlug: "learn-word",
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
        return <WordLearnLesson words={words} onComplete={game.handleComplete} />;
      case "lesson2":
        return <WordSpeakingLesson words={words} onComplete={game.handleComplete} />;
      case "lesson3":
        return <WordSpellingLesson words={words} onComplete={game.handleComplete} requiredWins={5} />;
      case "lesson4":
        return <WordListeningLesson words={words} onComplete={game.handleComplete} requiredWins={5} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-word"
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
