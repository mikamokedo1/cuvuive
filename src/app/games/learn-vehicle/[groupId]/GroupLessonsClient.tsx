"use client";

import { BookOpen, HelpCircle, Grid2X2, MapPin } from "lucide-react";
import { GameWrapLessons, LessonData } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-vehicle/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const regularLessons: LessonData[] = [
  {
    id: "lesson1",
    title: "Học tên phương tiện",
    icon: <BookOpen className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Đây là gì?",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson3",
    title: "Ghép đôi",
    icon: <Grid2X2 className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

const group4Lessons: LessonData[] = [
  {
    id: "lesson1",
    title: "Đây là gì?",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Ghép đôi",
    icon: <Grid2X2 className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson3",
    title: "Xe đi đâu?",
    icon: <MapPin className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  // Both lesson sets have same length (3), so use regularLessons for hook
  const { group, activeIndex, handleLessonClick, lessonsWithHref } = useGroupLessons({
    gameSlug: "learn-vehicle",
    groups: GROUPS,
    lessons: regularLessons,
    initialGroupId: groupId,
  });

  if (!group) return <div>Group not found</div>;

  const lessons = groupId === "group4" ? group4Lessons : regularLessons;
  const visibleLessons = lessons.map((lesson) => ({
    ...lesson,
    href: lessonsWithHref.find((item) => item.id === lesson.id)?.href,
  }));

  return (
    <GameWrapLessons
      gameId="learn-vehicle"
      lessons={visibleLessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
