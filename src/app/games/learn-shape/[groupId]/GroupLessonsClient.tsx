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

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  // Use fullLessons for hook computation; actual lessons depend on groupId
  const { group, activeIndex, handleLessonClick, lessonsWithHref } = useGroupLessons({
    gameSlug: "learn-shape",
    groups: GROUPS,
    lessons: fullLessons,
    initialGroupId: groupId,
  });

  if (!group) return <div>Group not found</div>;

  // Group 3 only has 3 lessons
  const lessons = groupId === "group3" ? baseLessons : fullLessons;
  const visibleLessons = lessons.map((lesson) => ({
    ...lesson,
    href: lessonsWithHref.find((item) => item.id === lesson.id)?.href,
  }));

  // Recompute activeIndex if lessons changed (group3 has fewer lessons)
  const effectiveActiveIndex = activeIndex >= lessons.length ? lessons.length - 1 : activeIndex;

  return (
    <GameWrapLessons
      gameId="learn-shape"
      lessons={visibleLessons}
      title={group.title}
      activeIndex={effectiveActiveIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
