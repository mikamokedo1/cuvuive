"use client";

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

const GROUP4_NUMBERS = [0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
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

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const lessonOrder = groupId === "group5" ? ["lesson1", "lesson2"] : ["lesson1", "lesson2", "lesson3", "lesson4"];
  const game = useGameLesson({ gameSlug: "learn-numbers", lessonOrder, groups: GROUPS, initialGroupId: groupId, initialLessonId: lessonId });

  const range = groupRanges[game.groupId];
  const isNewGroup = game.groupId === "group4" || game.groupId === "group5";

  if ((!range && !isNewGroup) || !game.groupId || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  let content = null;
  let title = "";

  if (game.groupId === "group5") {
    switch (game.lessonId) {
      case "lesson1":
        title = "Số nào đúng?";
        content = <QuizLesson2 numbers={GROUP5_NUMBERS} onComplete={game.handleComplete} requiredWins={12} />;
        break;
      case "lesson2":
        title = "Đếm và chọn";
        content = <CountingLesson2 numbers={GROUP5_NUMBERS} onComplete={game.handleComplete} requiredWins={12} />;
        break;
      default:
        content = <div>Unknown Lesson</div>;
    }
  } else if (game.groupId === "group4") {
    switch (game.lessonId) {
      case "lesson1":
        title = "Học số 10-20";
        content = <LearnLesson2 numbers={GROUP4_NUMBERS} onComplete={game.handleComplete} />;
        break;
      case "lesson2":
        title = "Số nào đúng?";
        content = <QuizLesson2 numbers={GROUP4_NUMBERS} onComplete={game.handleComplete} />;
        break;
      case "lesson3":
        title = "Đếm và chọn";
        content = <CountingLesson2 numbers={GROUP4_NUMBERS} onComplete={game.handleComplete} />;
        break;
      case "lesson4":
        title = "Tập viết số";
        content = <WritingLesson2 numbers={GROUP4_NUMBERS} onComplete={game.handleComplete} />;
        break;
      default:
        content = <div>Unknown Lesson</div>;
    }
  } else {
    switch (game.lessonId) {
      case "lesson1":
        title = `Học số ${range![0]} - ${range![1]}`;
        content = <LearnLesson range={range!} onComplete={game.handleComplete} />;
        break;
      case "lesson2":
        title = "Số nào đúng?";
        content = <QuizLesson range={range!} onComplete={game.handleComplete} />;
        break;
      case "lesson3":
        title = "Đếm và chọn";
        content = <CountingLesson range={range!} onComplete={game.handleComplete} />;
        break;
      case "lesson4":
        title = "Tập viết số";
        content = <WritingLesson range={range!} onComplete={game.handleComplete} />;
        break;
      default:
        content = <div>Unknown Lesson</div>;
    }
  }

  return (
    <GameWrapGame
      LessonContent={<main>{content}</main>}
      LessonTitle={title}
      groupId={game.groupId}
      gameSlug="learn-numbers"
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
