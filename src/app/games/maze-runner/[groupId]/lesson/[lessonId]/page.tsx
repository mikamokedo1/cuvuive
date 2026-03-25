"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS } from "@/features/games/maze-runner/constants";
import { MazeBoard } from "@/features/games/maze-runner/MazeBoard";
import { GameWrapGame } from "@/components/layout/GameWrapGame";
import { useParams } from "next/navigation";

const LESSON_ORDER = ["lesson1"];

export default function LessonPage() {
  const params = useParams();
  const groupId = typeof params.groupId === "string" ? params.groupId : "";

  const game = useGameLesson({ 
    gameSlug: "maze-runner", 
    lessonOrder: LESSON_ORDER, 
    groups: GROUPS 
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
