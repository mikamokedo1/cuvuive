"use client";

import { BookOpen, HelpCircle, Grid2X2, Mic, Hand, Zap } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-body/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Khám phá cơ thể",
    icon: <BookOpen className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Chạm và nói",
    icon: <Hand className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson3",
    title: "Tập nói",
    icon: <Mic className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson4",
    title: "Đây là gì?",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson5",
    title: "Cơ thể làm gì?",
    icon: <Zap className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson6",
    title: "Ghép đôi",
    icon: <Grid2X2 className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  const { group, activeIndex, handleLessonClick, lessonsWithHref } = useGroupLessons({
    gameSlug: "learn-body",
    groups: GROUPS,
    lessons,
    initialGroupId: groupId,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="learn-body"
      lessons={lessonsWithHref}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
