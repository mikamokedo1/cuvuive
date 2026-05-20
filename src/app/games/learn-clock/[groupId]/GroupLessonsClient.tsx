"use client";

import { Eye, Edit, Pointer, Clock } from "lucide-react";
import { GameWrapLessons, LessonData } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-clock/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  const isAnalog = groupId === "group1";

  const analogLessons: LessonData[] = [
    { id: "lesson1", title: "Làm quen đồng hồ kim", icon: <Eye className="text-white w-6 h-6" />, isPremium: false },
    { id: "lesson2", title: "Chọn đúng giờ", icon: <Pointer className="text-white w-6 h-6" />, isPremium: true },
    { id: "lesson3", title: "Chỉnh kim đồng hồ", icon: <Edit className="text-white w-6 h-6" />, isPremium: true },
    { id: "lesson4", title: "Giờ nào làm gì?", icon: <Clock className="text-white w-6 h-6" />, isPremium: true },
  ];

  const digitalLessons: LessonData[] = [
    { id: "lesson1", title: "Làm quen đồng hồ", icon: <Eye className="text-white w-6 h-6" />, isPremium: false },
    { id: "lesson2", title: "Chọn đúng giờ", icon: <Pointer className="text-white w-6 h-6" />, isPremium: true },
  ];

  const lessons = isAnalog ? analogLessons : digitalLessons;

  const { group, activeIndex, handleLessonClick, lessonsWithHref } = useGroupLessons({
    gameSlug: "learn-clock",
    groups: GROUPS,
    lessons,
    initialGroupId: groupId,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="learn-clock"
      lessons={lessonsWithHref}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
