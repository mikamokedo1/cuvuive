"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import {
  GROUPS,
  getTrafficForGroup,
  getAdventureForGroup,
  getScenariosForGroup,
  getStreetMapForGroup,
  getSignChallengesForGroup,
  getSafeRideForGroup,
  TRAFFIC_DESCRIPTIONS,
} from "@/features/games/learn-traffic/constants";
import { TrafficLearnLesson } from "@/features/games/learn-traffic/TrafficLearnLesson";
import { StreetExplorerLesson } from "@/features/games/learn-traffic/StreetExplorerLesson";
import { ScenarioSpotterLesson } from "@/features/games/learn-traffic/ScenarioSpotterLesson";
import { SignBuilderLesson } from "@/features/games/learn-traffic/SignBuilderLesson";
import { SafeRiderLesson } from "@/features/games/learn-traffic/SafeRiderLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4", "lesson5"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-traffic", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const items = getTrafficForGroup(game.groupId);
  const adventureSteps = getAdventureForGroup(game.groupId);
  const scenarios = getScenariosForGroup(game.groupId);
  const streetMap = getStreetMapForGroup(game.groupId);
  const signChallenges = getSignChallengesForGroup(game.groupId);
  const safeRideActivities = getSafeRideForGroup(game.groupId);

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return (
          <TrafficLearnLesson items={items} descriptions={TRAFFIC_DESCRIPTIONS} onComplete={game.handleComplete} />
        );
      case "lesson2":
        return <StreetExplorerLesson steps={adventureSteps} items={items} onComplete={game.handleComplete} />;
      case "lesson3":
        return <ScenarioSpotterLesson scenarios={scenarios} onComplete={game.handleComplete} />;
      case "lesson4":
        return <SignBuilderLesson challenges={signChallenges} onComplete={game.handleComplete} />;
      case "lesson5":
        return <SafeRiderLesson activities={safeRideActivities} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-traffic"
      showModal={game.showModal}
      handleNextLesson={game.handleNextLesson}
      currentLessonNum={game.currentLessonNum}
      nextLessonNum={game.nextLessonNum}
      isGroupDone={game.isGroupDone}
      isLoaded={game.isLoaded}
    />
  );
}
