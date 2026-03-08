"use client";

import { Eye, Edit, Pointer } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-clock/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";
import { useParams } from "next/navigation";

export default function GroupLessonsPage() {
  const params = useParams();
  const isAnalog = params.groupId === "group1";

  const analogLessons = [
    { id: "lesson1", title: "Làm quen đồng hồ kim", icon: <Eye className="text-white w-6 h-6" />, isPremium: false },
    { id: "lesson2", title: "Chọn đúng giờ", icon: <Pointer className="text-white w-6 h-6" />, isPremium: true },
    { id: "lesson3", title: "Chỉnh kim đồng hồ", icon: <Edit className="text-white w-6 h-6" />, isPremium: true },
  ];

  const digitalLessons = [
    { id: "lesson1", title: "Làm quen đồng hồ", icon: <Eye className="text-white w-6 h-6" />, isPremium: false },
    { id: "lesson2", title: "Chọn đúng giờ", icon: <Pointer className="text-white w-6 h-6" />, isPremium: true },
  ];

  const lessons = isAnalog ? analogLessons : digitalLessons;

  const { group, activeIndex, handleLessonClick } = useGroupLessons({
    gameSlug: "learn-clock",
    groups: GROUPS,
    lessons: lessons as any,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="learn-clock"
      lessons={lessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
