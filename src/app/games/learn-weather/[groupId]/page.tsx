"use client";

import { BookOpen, HelpCircle, Grid2X2, Mic, Shirt } from "lucide-react";
import { GameWrapLessons, LessonData } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-weather/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const baseLessons: LessonData[] = [
  {
    id: "lesson1",
    title: "Học tên thời tiết",
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
    title: "Đây là gì?",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson4",
    title: "Ghép đôi",
    icon: <Grid2X2 className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

const group3Lessons: LessonData[] = [
  {
    id: "lesson1",
    title: "Học tên mùa",
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
    title: "Đây là gì?",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson4",
    title: "Ghép đôi",
    icon: <Grid2X2 className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson5",
    title: "Mặc gì cho đúng mùa?",
    icon: <Shirt className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

export default function WeatherGroupLessonsPage() {
  // Use group3Lessons (longest) for hook so activeIndex covers all cases
  const { group, groupId, activeIndex,  handleLessonClick } = useGroupLessons({
    gameSlug: "learn-weather",
    groups: GROUPS,
    lessons: group3Lessons,
  });

  if (!group) return <div>Group not found</div>;

  const lessons = groupId === "group3" ? group3Lessons : baseLessons;

  // Clamp activeIndex for non-group3 (4 lessons vs 5)
  const effectiveActiveIndex = activeIndex >= lessons.length ? lessons.length - 1 : activeIndex;

  return (
    <GameWrapLessons
      gameId="learn-weather"
      lessons={lessons}
      title={group.title}
      activeIndex={effectiveActiveIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
