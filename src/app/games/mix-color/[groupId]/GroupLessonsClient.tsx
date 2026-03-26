"use client";

import { BookOpen, HelpCircle, Palette } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/mix-color/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Học pha màu",
    icon: <BookOpen className="text-white w-6 h-6" />,
    color: "blue",
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Pha màu nào?",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    color: "green",
    isPremium: true,
  },
  {
    id: "lesson3",
    title: "Thử thách pha màu",
    icon: <Palette className="text-white w-6 h-6" />,
    color: "purple",
    isPremium: true,
  },
];

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  const { group, activeIndex, handleLessonClick, lessonsWithHref } = useGroupLessons({
    gameSlug: "mix-color",
    groups: GROUPS,
    lessons,
    initialGroupId: groupId,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="mix-color"
      lessons={lessonsWithHref}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
