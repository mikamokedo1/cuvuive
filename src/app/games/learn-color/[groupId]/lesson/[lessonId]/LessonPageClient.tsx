"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, COLORS } from "@/features/games/learn-color/constants";
import { ColorLearnLesson } from "@/features/games/learn-color/ColorLearnLesson";
import { ColorQuizLesson } from "@/features/games/learn-color/ColorQuizLesson";
import { ColorImageMatchLesson } from "@/features/games/learn-color/ColorImageMatchLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const game = useGameLesson({ gameSlug: "learn-color", lessonOrder: LESSON_ORDER, groups: GROUPS ,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const group = game.group;
  const groupColors = COLORS.filter((c) => group.colors.includes(c.id));
  const requireWins = game.groupId === "group3" ? 12 : game.groupId === "group1" ? 6 : 8;

  let LessonContent = null;
  let displayTitle = "";

  if (game.lessonId === "lesson1") {
    displayTitle = "Học màu sắc";
    LessonContent = (
      <main>
        <ColorLearnLesson colors={groupColors} onComplete={game.handleComplete} />
      </main>
    );
  } else if (game.lessonId === "lesson2") {
    displayTitle = "Tìm màu giống";
    LessonContent = (
      <main>
        <ColorQuizLesson colors={groupColors} onComplete={game.handleComplete} requiredWins={requireWins} />
      </main>
    );
  } else if (game.lessonId === "lesson3") {
    displayTitle = "Hình gì màu gì?";
    LessonContent = (
      <main>
        <ColorImageMatchLesson colors={groupColors} onComplete={game.handleComplete} requiredWins={requireWins} />
      </main>
    );
  }

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={displayTitle}
      groupId={game.groupId}
      gameSlug="learn-color"
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
