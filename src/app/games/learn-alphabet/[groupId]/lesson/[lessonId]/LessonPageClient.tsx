"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getLettersForGroup } from "@/features/games/learn-alphabet/constants";
import { AlphabetLearnLesson } from "@/features/games/learn-alphabet/AlphabetLearnLesson";
import { AlphabetQuizLesson } from "@/features/games/learn-alphabet/AlphabetQuizLesson";
import { AlphabetMemoryLesson } from "@/features/games/learn-alphabet/AlphabetMemoryLesson";
import { AlphabetSpeakingLesson } from "@/features/games/learn-alphabet/AlphabetSpeakingLesson";
import { AlphabetWritingLesson } from "@/features/games/learn-alphabet/AlphabetWritingLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";
import { useProgress } from "@/context/ProgressContext";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4", "lesson5"];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const game = useGameLesson({ gameSlug: "learn-alphabet", lessonOrder: LESSON_ORDER, groups: GROUPS ,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });
  const { allProgress } = useProgress();

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const letters = getLettersForGroup(game.groupId);

  // Check if this lesson was previously completed (for showing LetterSelector)
  const courseProgress = allProgress["learn-alphabet"] || { completedGroups: [], completedLessons: {} };
  const completedInGroup = courseProgress.completedLessons[game.groupId] || [];
  const isReviewMode = completedInGroup.includes(game.lessonId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <AlphabetLearnLesson letters={letters} onComplete={game.handleComplete} isReviewMode={isReviewMode} />;
      case "lesson2":
        return (
          <AlphabetSpeakingLesson letters={letters} onComplete={game.handleComplete} isReviewMode={isReviewMode} />
        );
      case "lesson3":
        return <AlphabetWritingLesson letters={letters} onComplete={game.handleComplete} isReviewMode={isReviewMode} />;
      case "lesson4":
        return <AlphabetQuizLesson letters={letters} onComplete={game.handleComplete} requiredWins={15} />;
      case "lesson5":
        return <AlphabetMemoryLesson letters={letters} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-alphabet"
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
