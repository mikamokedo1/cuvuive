"use client";

import { useParams } from "next/navigation";
import { useGameLesson } from "@/hooks/useGameLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

// Lesson Components
import { ExplainLesson } from "@/features/games/compare-game/ExplainLesson";
import { VisualCompareLesson } from "@/features/games/compare-game/VisualCompareLesson";
import { NumberCompareLesson } from "@/features/games/compare-game/NumberCompareLesson";
import { SymbolWritingLesson } from "@/features/games/compare-game/SymbolWritingLesson";

const MAP_LESSON_TITLE: Record<string, { text: string; symbol: string }> = {
  greater: { text: "lớn", symbol: ">" },
  less: { text: "nhỏ", symbol: "<" },
  equal: { text: "bằng", symbol: "=" },
};

// Map groupId to comparison type
const GROUP_TO_TYPE: Record<string, "greater" | "less" | "equal" | "mixed"> = {
  group1: "greater",
  group2: "less",
  group3: "equal",
  group4: "mixed",
};

const GROUPS = [
  { id: "group1", title: "Lớn hơn" },
  { id: "group2", title: "Nhỏ hơn" },
  { id: "group3", title: "Bằng nhau" },
  { id: "group4", title: "Luyện tập" },
];

export default function LessonPage() {
  const params = useParams();
  const groupId = typeof params.groupId === "string" ? params.groupId : "";

  // group4 has 2 lessons, others have 4
  const LESSON_ORDER = groupId === "group4" ? ["lesson1", "lesson2"] : ["lesson1", "lesson2", "lesson3", "lesson4"];

  const game = useGameLesson({ gameSlug: "compare-quantity", lessonOrder: LESSON_ORDER, groups: GROUPS });
  const comparisonType = GROUP_TO_TYPE[game.groupId];

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  // Render the appropriate lesson component
  let LessonContent = null;
  let LessonTitle = "";

  if (game.groupId === "group4") {
    // Practice group - different lesson structure
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = <VisualCompareLesson comparisonType="mixed" onComplete={game.handleComplete} />;
        LessonTitle = "So sánh đồ vật";
        break;
      case "lesson2":
        LessonContent = <NumberCompareLesson comparisonType="mixed" onComplete={game.handleComplete} />;
        LessonTitle = "So sánh số";
        break;
    }
  } else if (comparisonType && comparisonType !== "mixed") {
    // Greater, Less, or Equal groups
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = <ExplainLesson comparisonType={comparisonType} onComplete={game.handleComplete} />;
        LessonTitle = `Dấu ${MAP_LESSON_TITLE[comparisonType].text} hơn`;
        break;
      case "lesson2":
        LessonContent = <VisualCompareLesson comparisonType={comparisonType} onComplete={game.handleComplete} />;
        LessonTitle = `Chọn dấu ${MAP_LESSON_TITLE[comparisonType].text} hơn`;
        break;
      case "lesson3":
        LessonContent = <NumberCompareLesson comparisonType={comparisonType} onComplete={game.handleComplete} />;
        LessonTitle = `Chọn dấu ${MAP_LESSON_TITLE[comparisonType].text}`;
        break;
      case "lesson4":
        LessonContent = <SymbolWritingLesson comparisonType={comparisonType} onComplete={game.handleComplete} />;
        LessonTitle = `Tập viết dấu ${MAP_LESSON_TITLE[comparisonType].symbol}`;
        break;
    }
  }

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={LessonTitle}
      groupId={game.groupId}
      gameSlug="compare-quantity"
      showModal={game.showModal}
      handleNextLesson={game.handleNextLesson}
      currentLessonNum={game.currentLessonNum}
      nextLessonNum={game.nextLessonNum}
      isGroupDone={game.isGroupDone}
      isLoaded={game.isLoaded}
    />
  );
}
