"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, SHAPES } from "@/features/games/learn-shape/constants";
import { ShapeLearnLesson } from "@/features/games/learn-shape/ShapeLearnLesson";
import { ShapeQuizLesson } from "@/features/games/learn-shape/ShapeQuizLesson";
import { ShapeMatchLesson } from "@/features/games/learn-shape/ShapeMatchLesson";
import { ShapePaintLesson } from "@/features/games/learn-shape/ShapePaintLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {

  // Lesson order depends on group (group3 has only 3 lessons, group1 and group2 have 4)
  const LESSON_ORDER =
    groupId === "group3" ? ["lesson1", "lesson2", "lesson3"] : ["lesson1", "lesson2", "lesson3", "lesson4"];

  const game = useGameLesson({ gameSlug: "learn-shape", lessonOrder: LESSON_ORDER, groups: GROUPS ,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const group = game.group;
  const groupShapes = SHAPES.filter((s) => group.shapes.includes(s.id));
  const requireWins = game.groupId === "group3" ? 10 : 5;

  let LessonContent = null;
  let displayTitle = "";

  if (game.lessonId === "lesson1") {
    displayTitle = "Học hình dạng";
    LessonContent = (
      <main>
        <ShapeLearnLesson shapes={groupShapes} onComplete={game.handleComplete} />
      </main>
    );
  } else if (game.lessonId === "lesson2") {
    displayTitle = "Tìm hình giống";
    LessonContent = (
      <main>
        <ShapeQuizLesson shapes={groupShapes} onComplete={game.handleComplete} requiredWins={requireWins} />
      </main>
    );
  } else if (game.lessonId === "lesson3") {
    displayTitle = "Vật gì hình gì?";
    LessonContent = (
      <main>
        <ShapeMatchLesson shapes={groupShapes} onComplete={game.handleComplete} requiredWins={requireWins} />
      </main>
    );
  } else if (game.lessonId === "lesson4") {
    displayTitle = "Vẽ hình";
    LessonContent = (
      <main>
        <ShapePaintLesson shapes={groupShapes} onComplete={game.handleComplete} />
      </main>
    );
  }

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={displayTitle}
      groupId={game.groupId}
      gameSlug="learn-shape"
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
