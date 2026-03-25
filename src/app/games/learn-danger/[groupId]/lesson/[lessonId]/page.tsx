"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import {
  GROUPS,
  getDangerForGroup,
  getExplorerForGroup,
  getScenariosForGroup,
  getSafeActionsForGroup,
  getTrueFalseForGroup,
  DANGER_DESCRIPTIONS,
} from "@/features/games/learn-danger/constants";
import { DangerLearnLesson } from "@/features/games/learn-danger/DangerLearnLesson";
import { DangerExplorerLesson } from "@/features/games/learn-danger/DangerExplorerLesson";
import { DangerScenarioLesson } from "@/features/games/learn-danger/DangerScenarioLesson";
import { DangerSafeActionLesson } from "@/features/games/learn-danger/DangerSafeActionLesson";
import { DangerTrueFalseLesson } from "@/features/games/learn-danger/DangerTrueFalseLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4", "lesson5"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-danger", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const items = getDangerForGroup(game.groupId);
  const explorerSteps = getExplorerForGroup(game.groupId);
  const scenarios = getScenariosForGroup(game.groupId);
  const safeActions = getSafeActionsForGroup(game.groupId);
  const trueFalse = getTrueFalseForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <DangerLearnLesson items={items} descriptions={DANGER_DESCRIPTIONS} onComplete={game.handleComplete} />;
      case "lesson2":
        return <DangerExplorerLesson steps={explorerSteps} items={items} onComplete={game.handleComplete} />;
      case "lesson3":
        return <DangerScenarioLesson scenarios={scenarios} onComplete={game.handleComplete} />;
      case "lesson4":
        return <DangerSafeActionLesson activities={safeActions} onComplete={game.handleComplete} />;
      case "lesson5":
        return <DangerTrueFalseLesson statements={trueFalse} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-danger"
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
