"use client";

import { useParams } from "next/navigation";
import { useGameLesson } from "@/hooks/useGameLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

// Lesson Components
import { ExplainMathLesson } from "@/features/games/learn-math/ExplainMathLesson";
import { VisualMathLesson } from "@/features/games/learn-math/VisualMathLesson";
import { NumberMathLesson } from "@/features/games/learn-math/NumberMathLesson";
import { MixedMathLesson } from "@/features/games/learn-math/MixedMathLesson";
import { SymbolWritingLesson } from "@/features/games/learn-math/SymbolWritingLesson";
import { GROUP_CONFIG } from "@/features/games/learn-math/constants";

const GROUPS = [
  { id: "group1", title: "Phép cộng" },
  { id: "group2", title: "Phép trừ" },
  { id: "group3", title: "Luyện tập" },
];

export default function LessonPage() {
  const params = useParams();
  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const config = GROUP_CONFIG[groupId];

  // Dynamic lesson order based on config
  const maxLessons = config?.lessons?.length ?? 4;
  const LESSON_ORDER = Array.from({ length: maxLessons }, (_, i) => `lesson${i + 1}`);

  const game = useGameLesson({ gameSlug: "learn-math", lessonOrder: LESSON_ORDER, groups: GROUPS });

  if (!config || !game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  // Find current lesson title
  const currentLessonDef = config.lessons.find((l) => l.id === game.lessonId);
  const LessonTitle = currentLessonDef ? currentLessonDef.title : "";

  // Render the appropriate lesson component
  let LessonContent = null;

  if (game.groupId === "group3") {
    // Practice group: mixed operator
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = <MixedMathLesson mode="visual" maxSum={config.maxSum} onComplete={game.handleComplete} />;
        break;
      case "lesson2":
        LessonContent = <MixedMathLesson mode="number" maxSum={config.maxSum} onComplete={game.handleComplete} />;
        break;
    }
  } else {
    // Addition & Subtraction groups
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = <ExplainMathLesson operator={config.operator as any} onComplete={game.handleComplete} />;
        break;
      case "lesson2":
        LessonContent = (
          <VisualMathLesson operator={config.operator} maxSum={config.maxSum} onComplete={game.handleComplete} />
        );
        break;
      case "lesson3":
        LessonContent = (
          <NumberMathLesson operator={config.operator} maxSum={config.maxSum} onComplete={game.handleComplete} />
        );
        break;
      case "lesson4":
        LessonContent = <SymbolWritingLesson operator={config.operator as any} onComplete={game.handleComplete} />;
        break;
    }
  }

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={LessonTitle}
      groupId={game.groupId}
      gameSlug="learn-math"
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
