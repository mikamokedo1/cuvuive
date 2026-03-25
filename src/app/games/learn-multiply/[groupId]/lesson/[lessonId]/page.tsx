"use client";

import { useParams } from "next/navigation";
import { useGameLesson } from "@/hooks/useGameLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

// Lesson Components
import { ExplainMultiplyLesson } from "@/features/games/learn-multiply/ExplainMultiplyLesson";
import { VisualMultiplyLesson } from "@/features/games/learn-multiply/VisualMultiplyLesson";
import { NumberMultiplyLesson } from "@/features/games/learn-multiply/NumberMultiplyLesson";
import { FillBlankLesson } from "@/features/games/learn-multiply/FillBlankLesson";
import { SkipCountLesson } from "@/features/games/learn-multiply/SkipCountLesson";
import { GROUP_CONFIG } from "@/features/games/learn-multiply/constants";

const GROUPS = [
  { id: "group1", title: "Bảng nhân 2" },
  { id: "group2", title: "Bảng nhân 3" },
  { id: "group3", title: "Bảng nhân 4" },
  { id: "group4", title: "Bảng nhân 5" },
  { id: "group5", title: "Luyện tập" },
];

export default function LessonPage() {
  const params = useParams();
  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const config = GROUP_CONFIG[groupId];

  // Dynamic lesson order based on config
  const maxLessons = config?.lessons?.length ?? 5;
  const LESSON_ORDER = Array.from({ length: maxLessons }, (_, i) => `lesson${i + 1}`);

  const game = useGameLesson({ gameSlug: "learn-multiply", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!config || !game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  // Find current lesson title
  const currentLessonDef = config.lessons.find((l) => l.id === game.lessonId);
  const LessonTitle = currentLessonDef ? currentLessonDef.title : "";

  // Render the appropriate lesson component
  let LessonContent = null;

  if (game.groupId === "group5") {
    // Practice group: mixed multiplier, no explain lesson
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = (
          <VisualMultiplyLesson multiplier="mixed" maxProduct={config.maxProduct} onComplete={game.handleComplete} />
        );
        break;
      case "lesson2":
        LessonContent = (
          <NumberMultiplyLesson multiplier="mixed" maxProduct={config.maxProduct} onComplete={game.handleComplete} />
        );
        break;
      case "lesson3":
        LessonContent = (
          <FillBlankLesson multiplier="mixed" maxProduct={config.maxProduct} onComplete={game.handleComplete} />
        );
        break;
    }
  } else {
    // Standard groups (2, 3, 4, 5)
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = (
          <ExplainMultiplyLesson multiplier={config.multiplier as number} onComplete={game.handleComplete} />
        );
        break;
      case "lesson2":
        LessonContent = (
          <VisualMultiplyLesson
            multiplier={config.multiplier}
            maxProduct={config.maxProduct}
            onComplete={game.handleComplete}
          />
        );
        break;
      case "lesson3":
        LessonContent = (
          <NumberMultiplyLesson
            multiplier={config.multiplier}
            maxProduct={config.maxProduct}
            onComplete={game.handleComplete}
          />
        );
        break;
      case "lesson4":
        LessonContent = (
          <FillBlankLesson
            multiplier={config.multiplier}
            maxProduct={config.maxProduct}
            onComplete={game.handleComplete}
          />
        );
        break;
      case "lesson5":
        LessonContent = (
          <SkipCountLesson multiplier={config.multiplier} onComplete={game.handleComplete} />
        );
        break;
    }
  }

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={LessonTitle}
      groupId={game.groupId}
      gameSlug="learn-multiply"
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
