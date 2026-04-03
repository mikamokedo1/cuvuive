"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

// Lesson Components
import { ExplainMoneyLesson } from "@/features/games/learn-money/ExplainMoneyLesson";
import { BillQuizLesson } from "@/features/games/learn-money/BillQuizLesson";

import { SortBillsLesson } from "@/features/games/learn-money/SortBillsLesson";
import { ExchangeLesson } from "@/features/games/learn-money/ExchangeLesson";
import { CompareLesson } from "@/features/games/learn-money/CompareLesson";
import { ShoppingLesson } from "@/features/games/learn-money/ShoppingLesson";
import { SumBillsLesson } from "@/features/games/learn-money/SumBillsLesson";
import { ChangeLesson } from "@/features/games/learn-money/ChangeLesson";
import { SavingsLesson } from "@/features/games/learn-money/SavingsLesson";
import { GROUP_CONFIG } from "@/features/games/learn-money/constants";

const GROUPS = [
  { id: "group1", title: "Nhận Biết Tiền" },
  { id: "group2", title: "Kỹ Năng Tiền" },
  { id: "group3", title: "Đi Chợ Cùng Cú" },
];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const config = GROUP_CONFIG[groupId];

  const maxLessons = config?.lessons?.length ?? 3;
  const LESSON_ORDER = Array.from({ length: maxLessons }, (_, i) => `lesson${i + 1}`);

  const game = useGameLesson({
    gameSlug: "learn-money",
    lessonOrder: LESSON_ORDER,
    groups: GROUPS,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!config || !game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const currentLessonDef = config.lessons.find((l) => l.id === game.lessonId);
  const LessonTitle = currentLessonDef ? currentLessonDef.title : "";

  // Route to correct lesson component
  let LessonContent = null;

  switch (game.groupId) {
    case "group1": // Nhận Biết Tiền
      switch (game.lessonId) {
        case "lesson1":
          LessonContent = <ExplainMoneyLesson onComplete={game.handleComplete} />;
          break;
        case "lesson2":
          LessonContent = <BillQuizLesson onComplete={game.handleComplete} />;
          break;
      }
      break;

    case "group2": // Kỹ Năng Tiền
      switch (game.lessonId) {
        case "lesson1":
          LessonContent = <SortBillsLesson onComplete={game.handleComplete} />;
          break;
        case "lesson2":
          LessonContent = <ExchangeLesson onComplete={game.handleComplete} />;
          break;
        case "lesson3":
          LessonContent = <CompareLesson onComplete={game.handleComplete} />;
          break;
        case "lesson4":
          LessonContent = <SavingsLesson onComplete={game.handleComplete} />;
          break;
      }
      break;

    case "group3": // Đi Chợ Cùng Cú
      switch (game.lessonId) {
        case "lesson1":
          LessonContent = <ShoppingLesson onComplete={game.handleComplete} />;
          break;
        case "lesson2":
          LessonContent = <SumBillsLesson onComplete={game.handleComplete} />;
          break;
        case "lesson3":
          LessonContent = <ChangeLesson onComplete={game.handleComplete} />;
          break;
      }
      break;
  }

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={LessonTitle}
      groupId={game.groupId}
      gameSlug="learn-money"
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
