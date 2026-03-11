"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS } from "@/features/games/maze-runner/constants";
import { MazeBoard } from "@/features/games/maze-runner/MazeBoard";
import { LineConnectBoard } from "@/features/games/maze-runner/LineConnectBoard";
import { GameWrapGame } from "@/components/layout/GameWrapGame";
import { isLineConnectGroup } from "@/features/games/maze-runner/constants";

const LESSON_ORDER = ["lesson1"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "maze-runner", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const renderLesson = () => {
    if (game.lessonId === "lesson1") {
      if (isLineConnectGroup(game.groupId)) {
        return <LineConnectBoard onComplete={game.handleComplete} />;
      }
      return <MazeBoard groupId={game.groupId} onComplete={game.handleComplete} />;
    }
    return null;
  };

  return (
    <GameWrapGame
      LessonContent={renderLesson()}
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="maze-runner"
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
