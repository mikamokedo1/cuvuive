"use client";

import { Compass, Volume2, Layers, PawPrint, Map } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-terrain/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Khám phá địa hình",
    icon: <Compass className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Nghe đoán địa hình",
    icon: <Volume2 className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson3",
    title: "Xếp lớp địa hình",
    icon: <Layers className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson4",
    title: "Ai sống ở đây?",
    icon: <PawPrint className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson5",
    title: "Phiêu lưu địa hình",
    icon: <Map className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  const { group, activeIndex, handleLessonClick, lessonsWithHref } = useGroupLessons({
    gameSlug: "learn-terrain",
    groups: GROUPS,
    lessons,
    initialGroupId: groupId,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="learn-terrain"
      lessons={lessonsWithHref}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
