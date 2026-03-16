"use client";

import { BookOpen, HelpCircle, CheckCircle2, Mic } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-emotion/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Học cảm xúc",
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
    title: "Đúng hay Sai?",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson4",
    title: "Chọn cảm xúc đúng",
    icon: <CheckCircle2 className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

export default function GroupLessonsPage() {
  const { group, activeIndex,  handleLessonClick } = useGroupLessons({
    gameSlug: "learn-emotion",
    groups: GROUPS,
    lessons,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="learn-emotion"
      lessons={lessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
