"use client";

import { BookOpen, HelpCircle, Palette } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-color/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Học màu sắc",
    icon: <BookOpen className="text-white w-6 h-6" />,
    color: "blue",
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Tìm màu giống",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    color: "green",
    isPremium: true,
  },
  {
    id: "lesson3",
    title: "Hình gì màu gì?",
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
    gameSlug: "learn-color",
    groups: GROUPS,
    lessons,
    initialGroupId: groupId,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="learn-color"
      lessons={lessonsWithHref}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
