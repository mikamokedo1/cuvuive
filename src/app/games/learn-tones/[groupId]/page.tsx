"use client";

import { BookOpen, HelpCircle, PenTool, Mic } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-tones/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Học dấu",
    icon: <BookOpen className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Tập nói",
    icon: <Mic className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson3",
    title: "Tập viết",
    icon: <PenTool className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson4",
    title: "Chữ nào đúng",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

export default function GroupLessonsPage() {
  const { group, activeIndex, handleLessonClick } = useGroupLessons({
    gameSlug: "learn-tones",
    groups: GROUPS,
    lessons,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="learn-tones"
      lessons={lessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
