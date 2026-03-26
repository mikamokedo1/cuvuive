"use client";

import { HelpCircle, Puzzle, Zap, Trophy } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/mini-sudoku-kids/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Bài 1",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Bài 2",
    icon: <Puzzle className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson3",
    title: "Bài 3",
    icon: <Zap className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson4",
    title: "Bài 4",
    icon: <Trophy className="text-white w-6 h-6" />,
    isPremium: false,
  },
];

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  const { group, activeIndex, handleLessonClick, lessonsWithHref } = useGroupLessons({
    gameSlug: "mini-sudoku-kids",
    groups: GROUPS,
    lessons,
    initialGroupId: groupId,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="mini-sudoku-kids"
      lessons={lessonsWithHref}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
