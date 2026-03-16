"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getWordsForGroup } from "@/features/games/learn-tones/constants";
import { ToneLearnLesson } from "@/features/games/learn-tones/ToneLearnLesson";
import { ToneQuizLesson } from "@/features/games/learn-tones/ToneQuizLesson";
import { ToneWritingLesson } from "@/features/games/learn-tones/ToneWritingLesson";
import { ToneSpeakLesson } from "@/features/games/learn-tones/ToneSpeakLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-tones", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const words = getWordsForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <ToneLearnLesson words={words} onComplete={game.handleComplete} />;
      case "lesson2":
        return <ToneSpeakLesson words={words} onComplete={game.handleComplete} />;
      case "lesson3":
        return <ToneWritingLesson words={words} onComplete={game.handleComplete} />;
      case "lesson4":
        return <ToneQuizLesson words={words} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-tones"
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
