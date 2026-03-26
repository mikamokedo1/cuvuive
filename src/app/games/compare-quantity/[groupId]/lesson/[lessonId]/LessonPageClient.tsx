"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";
import { ExplainLesson } from "@/features/games/compare-game/ExplainLesson";
import { VisualCompareLesson } from "@/features/games/compare-game/VisualCompareLesson";
import { NumberCompareLesson } from "@/features/games/compare-game/NumberCompareLesson";
import { SymbolWritingLesson } from "@/features/games/compare-game/SymbolWritingLesson";

const MAP_LESSON_TITLE: Record<string, { text: string; symbol: string }> = {
  greater: { text: "lớn", symbol: ">" },
  less: { text: "nhỏ", symbol: "<" },
  equal: { text: "bằng", symbol: "=" },
};

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

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const lessonOrder = groupId === "group4" ? ["lesson1", "lesson2"] : ["lesson1", "lesson2", "lesson3", "lesson4"];
  const game = useGameLesson({ gameSlug: "compare-quantity", lessonOrder, groups: GROUPS, initialGroupId: groupId, initialLessonId: lessonId });
  const comparisonType = GROUP_TO_TYPE[game.groupId];

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  let lessonContent = null;
  let lessonTitle = "";

  if (game.groupId === "group4") {
    switch (game.lessonId) {
      case "lesson1":
        lessonContent = <VisualCompareLesson comparisonType="mixed" onComplete={game.handleComplete} />;
        lessonTitle = "So sánh đồ vật";
        break;
      case "lesson2":
        lessonContent = <NumberCompareLesson comparisonType="mixed" onComplete={game.handleComplete} />;
        lessonTitle = "So sánh số";
        break;
      default:
        lessonContent = <div>Unknown Lesson</div>;
    }
  } else if (comparisonType && comparisonType !== "mixed") {
    switch (game.lessonId) {
      case "lesson1":
        lessonContent = <ExplainLesson comparisonType={comparisonType} onComplete={game.handleComplete} />;
        lessonTitle = `Dấu ${MAP_LESSON_TITLE[comparisonType].text} hơn`;
        break;
      case "lesson2":
        lessonContent = <VisualCompareLesson comparisonType={comparisonType} onComplete={game.handleComplete} />;
        lessonTitle = `Chọn dấu ${MAP_LESSON_TITLE[comparisonType].text} hơn`;
        break;
      case "lesson3":
        lessonContent = <NumberCompareLesson comparisonType={comparisonType} onComplete={game.handleComplete} />;
        lessonTitle = `Chọn dấu ${MAP_LESSON_TITLE[comparisonType].text}`;
        break;
      case "lesson4":
        lessonContent = <SymbolWritingLesson comparisonType={comparisonType} onComplete={game.handleComplete} />;
        lessonTitle = `Tập viết dấu ${MAP_LESSON_TITLE[comparisonType].symbol}`;
        break;
      default:
        lessonContent = <div>Unknown Lesson</div>;
    }
  }

  return (
    <GameWrapGame
      LessonContent={lessonContent}
      LessonTitle={lessonTitle}
      groupId={game.groupId}
      gameSlug="compare-quantity"
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
