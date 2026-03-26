"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS } from "@/features/games/maze-runner/constants";
import { MazeBoard } from "@/features/games/maze-runner/MazeBoard";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1"];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {

  const game = useGameLesson({ 
    gameSlug: "maze-runner", 
    lessonOrder: LESSON_ORDER, 
    groups: GROUPS 
  ,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const renderLesson = () => {
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
      isCourseComplete={game.isCourseComplete}
      isLoaded={game.isLoaded}
    />
  );
}
