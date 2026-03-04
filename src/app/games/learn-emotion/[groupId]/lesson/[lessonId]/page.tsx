"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import {
  GROUPS,
  getEmotionsForGroup,
  getScenariosForGroup,
  getScenarioMatchForGroup,
} from "@/features/games/learn-emotion/constants";
import { EmotionLearnLesson } from "@/features/games/learn-emotion/EmotionLearnLesson";
import { EmotionSpeakingLesson } from "@/features/games/learn-emotion/EmotionSpeakingLesson";
import { EmotionRightWrongLesson } from "@/features/games/learn-emotion/EmotionRightWrongLesson";
import { EmotionScenarioLesson } from "@/features/games/learn-emotion/EmotionScenarioLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-emotion", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const items = getEmotionsForGroup(game.groupId);
  const scenarios = getScenariosForGroup(game.groupId);
  const scenarioMatches = getScenarioMatchForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <EmotionLearnLesson items={items} onComplete={game.handleComplete} />;
      case "lesson2":
        return <EmotionSpeakingLesson items={items} onComplete={game.handleComplete} />;
      case "lesson3":
        return <EmotionRightWrongLesson scenarios={scenarios} onComplete={game.handleComplete} />;
      case "lesson4":
        return <EmotionScenarioLesson activities={scenarioMatches} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-emotion"
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
