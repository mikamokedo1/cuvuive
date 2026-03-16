"use client";

import { BookOpen, HelpCircle, Grid2X2, Puzzle } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-landmark/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Học địa danh",
    icon: <BookOpen className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Đây là đâu?",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson3",
    title: "Ghép đôi",
    icon: <Grid2X2 className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson4",
    title: "Xếp hình",
    icon: <Puzzle className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

export default function GroupLessonsPage() {
  const { group, activeIndex,  handleLessonClick } = useGroupLessons({
    gameSlug: "learn-landmark",
    groups: GROUPS,
    lessons,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="learn-landmark"
      lessons={lessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
