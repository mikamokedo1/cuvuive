"use client";

import { HelpCircle } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/line-connect/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Bắt đầu",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: false,
  },
];

export default function GroupLessonsPage() {
  const { group, activeIndex, handleLessonClick } = useGroupLessons({
    gameSlug: "line-connect",
    groups: GROUPS,
    lessons,
  });

  if (!group) return <div>Không tìm thấy dữ liệu</div>;

  return (
    <GameWrapLessons
      gameId="line-connect"
      lessons={lessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
