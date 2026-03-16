"use client";

import { BookOpen, HelpCircle, Wrench } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-occupation/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Học tên nghề",
    icon: <BookOpen className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Đây là ai?",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson3",
    title: "Nối nghề với dụng cụ",
    icon: <Wrench className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

export default function GroupLessonsPage() {
  const { group, activeIndex,  handleLessonClick } = useGroupLessons({
    gameSlug: "learn-occupation",
    groups: GROUPS,
    lessons,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="learn-occupation"
      lessons={lessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
