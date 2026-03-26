"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

import { ExplainDivideLesson } from "@/features/games/learn-divide/ExplainDivideLesson";
import { VisualDivideLesson } from "@/features/games/learn-divide/VisualDivideLesson";
import { NumberDivideLesson } from "@/features/games/learn-divide/NumberDivideLesson";
import { FillBlankDivideLesson } from "@/features/games/learn-divide/FillBlankDivideLesson";
import { ReverseMultiplyLesson } from "@/features/games/learn-divide/ReverseMultiplyLesson";
import { GROUP_CONFIG } from "@/features/games/learn-divide/constants";

const GROUPS = [
  { id: "group1", title: "Bảng chia 2" },
  { id: "group2", title: "Bảng chia 3" },
  { id: "group3", title: "Bảng chia 4" },
  { id: "group4", title: "Bảng chia 5" },
  { id: "group5", title: "Luyện tập" },
];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const config = GROUP_CONFIG[groupId];

  const maxLessons = config?.lessons?.length ?? 5;
  const LESSON_ORDER = Array.from({ length: maxLessons }, (_, i) => `lesson${i + 1}`);

  const game = useGameLesson({ gameSlug: "learn-divide", lessonOrder: LESSON_ORDER, groups: GROUPS ,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!config || !game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const currentLessonDef = config.lessons.find((l) => l.id === game.lessonId);
  const LessonTitle = currentLessonDef ? currentLessonDef.title : "";

  let LessonContent = null;

  if (game.groupId === "group5") {
    // Practice group: mixed divisor, no explain lesson
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = (
          <VisualDivideLesson divisor="mixed" maxDividend={config.maxDividend} onComplete={game.handleComplete} />
        );
        break;
      case "lesson2":
        LessonContent = (
          <NumberDivideLesson divisor="mixed" maxDividend={config.maxDividend} onComplete={game.handleComplete} />
        );
        break;
      case "lesson3":
        LessonContent = (
          <FillBlankDivideLesson divisor="mixed" maxDividend={config.maxDividend} onComplete={game.handleComplete} />
        );
        break;
    }
  } else {
    // Standard groups
    switch (game.lessonId) {
      case "lesson1":
        LessonContent = (
          <ExplainDivideLesson divisor={config.divisor as number} onComplete={game.handleComplete} />
        );
        break;
      case "lesson2":
        LessonContent = (
          <VisualDivideLesson divisor={config.divisor} maxDividend={config.maxDividend} onComplete={game.handleComplete} />
        );
        break;
      case "lesson3":
        LessonContent = (
          <NumberDivideLesson divisor={config.divisor} maxDividend={config.maxDividend} onComplete={game.handleComplete} />
        );
        break;
      case "lesson4":
        LessonContent = (
          <FillBlankDivideLesson divisor={config.divisor} maxDividend={config.maxDividend} onComplete={game.handleComplete} />
        );
        break;
      case "lesson5":
        LessonContent = (
          <ReverseMultiplyLesson divisor={config.divisor} maxDividend={config.maxDividend} onComplete={game.handleComplete} />
        );
        break;
    }
  }

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={LessonTitle}
      groupId={game.groupId}
      gameSlug="learn-divide"
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
