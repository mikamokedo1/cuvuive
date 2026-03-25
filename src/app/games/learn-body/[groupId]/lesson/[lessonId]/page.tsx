"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import {
  GROUPS,
  getItemsForGroup,
  BODY_DESCRIPTIONS,
  GROUP_HOTSPOTS,
  CHARACTER_IMAGES,
  BODY_ACTIONS,
} from "@/features/games/learn-body/constants";
import { BodyLearnLesson } from "@/features/games/learn-body/BodyLearnLesson";
import { BodyTouchLesson } from "@/features/games/learn-body/BodyTouchLesson";
import { BodySpeakingLesson } from "@/features/games/learn-body/BodySpeakingLesson";
import { BodyQuizLesson } from "@/features/games/learn-body/BodyQuizLesson";
import { BodyActionLesson } from "@/features/games/learn-body/BodyActionLesson";
import { BodyMemoryLesson } from "@/features/games/learn-body/BodyMemoryLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4", "lesson5", "lesson6"];

export default function BodyLessonPage() {
  const game = useGameLesson({ gameSlug: "learn-body", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const items = getItemsForGroup(game.groupId);
  const hotspots = GROUP_HOTSPOTS[game.groupId] || [];
  const characterImage = CHARACTER_IMAGES[game.groupId as keyof typeof CHARACTER_IMAGES] || CHARACTER_IMAGES.group1;
  const actions = BODY_ACTIONS[game.groupId] || [];

  const renderLesson = () => {
    switch (game.lessonId) {
      case "lesson1":
        return <BodyLearnLesson items={items} descriptions={BODY_DESCRIPTIONS} onComplete={game.handleComplete} />;
      case "lesson2":
        return (
          <BodyTouchLesson
            items={items}
            hotspots={hotspots}
            characterImage={characterImage}
            onComplete={game.handleComplete}
          />
        );
      case "lesson3":
        return <BodySpeakingLesson items={items} onComplete={game.handleComplete} />;
      case "lesson4":
        return <BodyQuizLesson items={items} onComplete={game.handleComplete} />;
      case "lesson5":
        return <BodyActionLesson actions={actions} onComplete={game.handleComplete} />;
      case "lesson6":
        return <BodyMemoryLesson items={items} onComplete={game.handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-body"
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
