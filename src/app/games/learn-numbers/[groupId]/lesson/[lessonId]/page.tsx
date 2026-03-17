"use client";

import { useParams } from "next/navigation";
import { useGameLesson } from "@/hooks/useGameLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

import { LearnLesson } from "@/features/games/learn-game/LearnLesson";
import { QuizLesson } from "@/features/games/learn-game/QuizLesson";
import { CountingLesson } from "@/features/games/learn-game/CountingLesson";
import { WritingLesson } from "@/features/games/learn-game/WritingLesson";
import { LearnLesson2 } from "@/features/games/learn-game/LearnLesson2";
import { QuizLesson2 } from "@/features/games/learn-game/QuizLesson2";
import { CountingLesson2 } from "@/features/games/learn-game/CountingLesson2";
import { WritingLesson2 } from "@/features/games/learn-game/WritingLesson2";

// Numbers for group4 (0 & 10-20)
const GROUP4_NUMBERS = [0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
// All numbers for practice (group5)
const GROUP5_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const GROUPS = [
  { id: "group1", title: "Số 1-3" },
  { id: "group2", title: "Số 4-6" },
  { id: "group3", title: "Số 7-9" },
  { id: "group4", title: "Số 10-20" },
  { id: "group5", title: "Luyện tập" },
];

const groupRanges: Record<string, [number, number]> = {
  group1: [1, 3],
  group2: [4, 6],
  group3: [7, 9],
};

export default function LessonPage() {
  const params = useParams();
  const groupId = typeof params.groupId === "string" ? params.groupId : "";

  // Group5 has 2 lessons, others have 4
  const LESSON_ORDER = groupId === "group5" ? ["lesson1", "lesson2"] : ["lesson1", "lesson2", "lesson3", "lesson4"];

  const game = useGameLesson({ gameSlug: "learn-numbers", lessonOrder: LESSON_ORDER, groups: GROUPS });

  const range = groupRanges[game.groupId];
  const isNewGroup = game.groupId === "group4" || game.groupId === "group5";

  if ((!range && !isNewGroup) || !game.groupId || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  let Content = null;
  let title = "";

  if (game.groupId === "group5") {
    // Practice group — uses new components with all numbers 0-20
    switch (game.lessonId) {
      case "lesson1":
        title = "Số nào đúng?";
        Content = <QuizLesson2 numbers={GROUP5_NUMBERS} onComplete={game.handleComplete} requiredWins={12} />;
        break;
      case "lesson2":
        title = "Đếm và chọn";
        Content = <CountingLesson2 numbers={GROUP5_NUMBERS} onComplete={game.handleComplete} requiredWins={12} />;
        break;
      default:
        Content = <div>Unknown Lesson</div>;
    }
  } else if (game.groupId === "group4") {
    // New group: 0 & 10-20 — uses new lesson components
    switch (game.lessonId) {
      case "lesson1":
        title = "Học số 10-20";
        Content = <LearnLesson2 numbers={GROUP4_NUMBERS} onComplete={game.handleComplete} />;
        break;
      case "lesson2":
        title = "Số nào đúng?";
        Content = <QuizLesson2 numbers={GROUP4_NUMBERS} onComplete={game.handleComplete} />;
        break;
      case "lesson3":
        title = "Đếm và chọn";
        Content = <CountingLesson2 numbers={GROUP4_NUMBERS} onComplete={game.handleComplete} />;
        break;
      case "lesson4":
        title = "Tập viết số";
        Content = <WritingLesson2 numbers={GROUP4_NUMBERS} onComplete={game.handleComplete} />;
        break;
      default:
        Content = <div>Unknown Lesson</div>;
    }
  } else {
    // Regular groups (1-3) — uses original components with range
    switch (game.lessonId) {
      case "lesson1":
        title = `Học số ${range![0]} - ${range![1]}`;
        Content = <LearnLesson range={range!} onComplete={game.handleComplete} />;
        break;
      case "lesson2":
        title = "Số nào đúng?";
        Content = <QuizLesson range={range!} onComplete={game.handleComplete} />;
        break;
      case "lesson3":
        title = "Đếm và chọn";
        Content = <CountingLesson range={range!} onComplete={game.handleComplete} />;
        break;
      case "lesson4":
        title = "Tập viết số";
        Content = <WritingLesson range={range!} onComplete={game.handleComplete} />;
        break;
      default:
        Content = <div>Unknown Lesson</div>;
    }
  }

  return (
    <GameWrapGame
      LessonContent={<main>{Content}</main>}
      LessonTitle={title}
      groupId={game.groupId}
      gameSlug="learn-numbers"
      showModal={game.showModal}
      handleNextLesson={game.handleNextLesson}
      currentLessonNum={game.currentLessonNum}
      nextLessonNum={game.nextLessonNum}
      isGroupDone={game.isGroupDone}
      isLoaded={game.isLoaded}
    />
  );
}
