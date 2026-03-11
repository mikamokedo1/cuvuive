"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS } from "@/features/games/line-connect/constants";
import { LineConnectBoard } from "@/features/games/line-connect/LineConnectBoard";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1"];

export default function LineConnectLessonPage() {
  const game = useGameLesson({ 
    gameSlug: "line-connect", 
    lessonOrder: LESSON_ORDER, 
    groups: GROUPS 
  });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  return (
    <GameWrapGame
      LessonContent={
        <LineConnectBoard
          groupId={game.groupId}
          onComplete={game.handleComplete}
        />
      }
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="line-connect"
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
