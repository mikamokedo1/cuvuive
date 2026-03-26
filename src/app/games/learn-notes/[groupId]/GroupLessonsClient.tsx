"use client";

import { Music, Ear, ListOrdered, HelpCircle } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { COURSES } from "@/libs/constants/courses";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const ICON_MAP: Record<string, React.ReactNode> = {
  lesson1: <Music className="text-white w-6 h-6" />,
  lesson2: <Ear className="text-white w-6 h-6" />,
  lesson3: <HelpCircle className="text-white w-6 h-6" />,
  lesson4: <ListOrdered className="text-white w-6 h-6" />,
};

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  const course = COURSES.find((c) => c.id === "learn-notes");
  const groupData = course?.groups.find((g) => g.id === groupId);
  const groups = course?.groups ?? [];

  const lessons = (groupData?.lessons || []).map((l) => ({
    id: l.id,
    title: l.title,
    icon: ICON_MAP[l.id] || <Music className="text-white w-6 h-6" />,
    isPremium: !l.isFree,
  }));

  const { activeIndex, handleLessonClick, lessonsWithHref } = useGroupLessons({
    gameSlug: "learn-notes",
    groups,
    lessons,
    initialGroupId: groupId,
  });

  if (!course || !groupData) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="learn-notes"
      lessons={lessonsWithHref}
      title={groupData.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
