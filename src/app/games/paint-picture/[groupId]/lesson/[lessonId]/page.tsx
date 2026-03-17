"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS } from "@/features/games/paint-picture/constants";
import { FreeColorLesson } from "@/features/games/paint-picture/FreeColorLesson";
import { AIPaintLesson } from "@/features/games/paint-picture/AIPaintLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2"];

export default function LessonPage() {
  const game = useGameLesson({ gameSlug: "paint-picture", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  let LessonContent = null;
  let title = "";

  if (game.lessonId === "lesson1") {
    title = "Tô tự do";
    LessonContent = (
      <main>
        <FreeColorLesson groupId={game.groupId} onComplete={game.handleComplete} />
      </main>
    );
  } else if (game.lessonId === "lesson2") {
    title = "Hoạ Khám Phá";
    LessonContent = (
      <main>
        <AIPaintLesson groupId={game.groupId} onComplete={game.handleComplete} />
      </main>
    );
  }

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={title}
      groupId={game.groupId}
      gameSlug="paint-picture"
      showModal={game.showModal}
      handleNextLesson={game.handleNextLesson}
      currentLessonNum={game.currentLessonNum}
      nextLessonNum={game.nextLessonNum}
      isGroupDone={game.isGroupDone}
      isLoaded={game.isLoaded}
    />
  );
}
