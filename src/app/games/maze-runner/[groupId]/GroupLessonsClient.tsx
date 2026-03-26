"use client";

import { HelpCircle } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/maze-runner/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Bắt đầu",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: false,
  },
];

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  const { group, activeIndex, handleLessonClick, lessonsWithHref } = useGroupLessons({
    gameSlug: "maze-runner",
    groups: GROUPS,
    lessons,
    initialGroupId: groupId,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="maze-runner"
      lessons={lessonsWithHref}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
