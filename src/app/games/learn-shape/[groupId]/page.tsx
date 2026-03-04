"use client";

import { BookOpen, HelpCircle, Palette, Pencil } from "lucide-react";
import { GameWrapLessons, LessonData } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-shape/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const baseLessons: LessonData[] = [
  {
    id: "lesson1",
    title: "Học hình dạng",
    icon: <BookOpen className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Tìm hình giống",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson3",
    title: "Vật gì hình gì?",
    icon: <Palette className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

const fullLessons: LessonData[] = [
  ...baseLessons,
  {
    id: "lesson4",
    title: "Vẽ hình",
    icon: <Pencil className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

export default function GroupLessonsPage() {
  // Use fullLessons for hook computation; actual lessons depend on groupId
  const { group, groupId, activeIndex, handleLessonClick } = useGroupLessons({
    gameSlug: "learn-shape",
    groups: GROUPS,
    lessons: fullLessons,
  });

  if (!group) return <div>Group not found</div>;

  // Group 3 only has 3 lessons
  const lessons = groupId === "group3" ? baseLessons : fullLessons;

  // Recompute activeIndex if lessons changed (group3 has fewer lessons)
  const effectiveActiveIndex = activeIndex >= lessons.length ? lessons.length - 1 : activeIndex;

  return (
    <GameWrapLessons
      gameId="learn-shape"
      lessons={lessons}
      title={group.title}
      activeIndex={effectiveActiveIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
