"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import {
  getTerrainsForGroup,
  GROUPS,
  HABITAT_MAP,
  ADVENTURES,
  BUILDER_CHALLENGES,
  TERRAIN_DESCRIPTIONS,
} from "@/features/games/learn-terrain/constants";
import { TerrainExploreLesson } from "@/features/games/learn-terrain/TerrainExploreLesson";
import { SoundscapeLesson } from "@/features/games/learn-terrain/SoundscapeLesson";
import { TerrainBuilderLesson } from "@/features/games/learn-terrain/TerrainBuilderLesson";
import { HabitatMatchLesson } from "@/features/games/learn-terrain/HabitatMatchLesson";
import { TerrainAdventureLesson } from "@/features/games/learn-terrain/TerrainAdventureLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4", "lesson5"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "learn-terrain", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const terrains = getTerrainsForGroup(game.groupId);
  const adventures = ADVENTURES[game.groupId] || [];
  const builderChallenges = BUILDER_CHALLENGES[game.groupId] || [];

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return (
          <TerrainExploreLesson
            terrains={terrains}
            descriptions={TERRAIN_DESCRIPTIONS}
            onComplete={game.handleComplete}
          />
        );
      case "lesson2":
        return <SoundscapeLesson terrains={terrains} onComplete={game.handleComplete} />;
      case "lesson3":
        return <TerrainBuilderLesson challenges={builderChallenges} onComplete={game.handleComplete} />;
      case "lesson4":
        return <HabitatMatchLesson terrains={terrains} habitatMap={HABITAT_MAP} onComplete={game.handleComplete} />;
      case "lesson5":
        return <TerrainAdventureLesson steps={adventures} terrains={terrains} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-terrain"
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
