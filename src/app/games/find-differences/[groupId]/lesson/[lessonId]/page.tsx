"use client";

import { useParams } from "next/navigation";
import { useGameLesson } from "@/hooks/useGameLesson";
import { FIND_DIFFERENCES_DATA } from "@/features/games/find-differences/constans";
import { DifferenceBoard } from "@/features/games/find-differences/DifferenceBoard";
import { playSound } from "@/libs/utils/playSound";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

export default function FDLessonPage() {
  const params = useParams();
  const groupId = typeof params.groupId === "string" ? params.groupId : "";

  const group = FIND_DIFFERENCES_DATA.find((g) => g.id === groupId);
  const LESSON_ORDER = group?.lessons.map((l) => l.id) || [];
  const groups = FIND_DIFFERENCES_DATA.map((g) => ({ id: g.id, title: g.id }));

  const game = useGameLesson({
    gameSlug: "find-differences",
    lessonOrder: LESSON_ORDER,
    groups,
  });

  const lesson = group?.lessons.find((l) => l.id === game.lessonId);

  if (!group || !lesson || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const handleAllFound = () => {
    playSound("/sounds/correct.mp3");
    game.handleComplete();
  };

  const LessonContent = (
    <main>
      <DifferenceBoard
        originalImage={lesson.originalImage}
        modifiedImage={lesson.modifiedImage}
        differences={lesson.differences}
        onFoundDifference={() => playSound("/sounds/correct.mp3")}
        onWrongClick={() => playSound("/sounds/wrong.mp3")}
        onAllFound={handleAllFound}
      />
    </main>
  );

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={lesson.title}
      groupId={game.groupId}
      gameSlug="find-differences"
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
