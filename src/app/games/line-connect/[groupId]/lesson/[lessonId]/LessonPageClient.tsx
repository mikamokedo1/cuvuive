"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS } from "@/features/games/line-connect/constants";
import { LineConnectBoard } from "@/features/games/line-connect/LineConnectBoard";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1"];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const game = useGameLesson({ 
    gameSlug: "line-connect", 
    lessonOrder: LESSON_ORDER, 
    groups: GROUPS 
  ,
    initialGroupId: groupId,
    initialLessonId: lessonId,
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
      isCourseComplete={game.isCourseComplete}
      isLoaded={game.isLoaded}
    />
  );
}
