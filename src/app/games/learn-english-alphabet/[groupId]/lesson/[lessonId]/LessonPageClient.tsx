"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getWordsForGroup } from "@/features/games/learn-english-alphabet/constants";
import { AlphabetFlashcardLesson } from "@/features/games/learn-english-alphabet/AlphabetFlashcardLesson";
import { AlphabetSpeakingLesson } from "@/features/games/learn-english-alphabet/AlphabetSpeakingLesson";
import { AlphabetListenChooseLesson } from "@/features/games/learn-english-alphabet/AlphabetListenChooseLesson";
import { AlphabetQuizLesson } from "@/features/games/learn-english-alphabet/AlphabetQuizLesson";
import { AlphabetSpellLesson } from "@/features/games/learn-english-alphabet/AlphabetSpellLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";
import { useProgress } from "@/context/ProgressContext";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4", "lesson5"];

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
  const { allProgress } = useProgress();

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const words = getWordsForGroup(game.groupId);

  // Check if this lesson was previously completed (for showing LetterSelector)
  const courseProgress = allProgress["learn-english-alphabet"] || { completedGroups: [], completedLessons: {} };
  const completedInGroup = courseProgress.completedLessons[game.groupId] || [];
  const isReviewMode = completedInGroup.includes(game.lessonId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <AlphabetFlashcardLesson words={words} onComplete={game.handleComplete} isReviewMode={isReviewMode} />;
      case "lesson2":
        return <AlphabetSpeakingLesson words={words} onComplete={game.handleComplete} isReviewMode={isReviewMode} />;
      case "lesson3":
        return <AlphabetListenChooseLesson words={words} onComplete={game.handleComplete} />;
      case "lesson4":
        return <AlphabetSpellLesson words={words} onComplete={game.handleComplete} />;
      case "lesson5":
        return <AlphabetQuizLesson words={words} onComplete={game.handleComplete} />;
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
