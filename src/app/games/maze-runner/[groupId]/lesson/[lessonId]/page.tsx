"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, isLineConnectGroup } from "@/features/games/maze-runner/constants";
import { MazeBoard } from "@/features/games/maze-runner/MazeBoard";
import { LineConnectBoard } from "@/features/games/maze-runner/LineConnectBoard";
import { GameWrapGame } from "@/components/layout/GameWrapGame";
import { useParams } from "next/navigation";

export default function LessonPage() {
  const params = useParams();
  const groupId = typeof params.groupId === "string" ? params.groupId : "";

  // Dynamic lesson order based on group
  const lessonOrder = groupId === "group4" 
    ? ["lesson1", "lesson2", "lesson3"] 
    : ["lesson1"];

  const game = useGameLesson({ 
    gameSlug: "maze-runner", 
    lessonOrder, 
    groups: GROUPS 
  });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const renderLesson = () => {
    if (isLineConnectGroup(game.groupId)) {
      return (
        <LineConnectBoard
          lessonId={game.lessonId}
          onComplete={game.handleComplete}
        />
      );
    }

    if (game.lessonId === "lesson1") {
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
