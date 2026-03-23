"use client";

import { BookOpen, Home, ShieldAlert, CheckCircle, HelpCircle } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-danger/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Học tên đồ vật",
    icon: <BookOpen className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Khám phá ngôi nhà",
    icon: <Home className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson3",
    title: "Tình huống",
    icon: <ShieldAlert className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson4",
    title: "Hành động an toàn",
    icon: <CheckCircle className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson5",
    title: "Đúng hay Sai?",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

export default function GroupLessonsPage() {
  const { group, activeIndex, handleLessonClick } = useGroupLessons({
    gameSlug: "learn-danger",
    groups: GROUPS,
    lessons,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="learn-danger"
      lessons={lessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
