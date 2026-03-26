"use client";

import { BookOpen, HelpCircle, Puzzle } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/find-pattern/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Học quy luật",
    icon: <BookOpen className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Phần tiếp theo?",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson3",
    title: "Điền vào chỗ trống",
    icon: <Puzzle className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  const { group, activeIndex, handleLessonClick, lessonsWithHref } = useGroupLessons({
    gameSlug: "find-pattern",
    groups: GROUPS,
    lessons,
    initialGroupId: groupId,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="find-pattern"
      lessons={lessonsWithHref}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
