"use client";

import { Music, Ear, ListOrdered, HelpCircle } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { COURSES } from "@/libs/constants/courses";
import { useGroupLessons } from "@/hooks/useGroupLessons";
import { useParams } from "next/navigation";

const ICON_MAP: Record<string, React.ReactNode> = {
  lesson1: <Music className="text-white w-6 h-6" />,
  lesson2: <Ear className="text-white w-6 h-6" />,
  lesson3: <HelpCircle className="text-white w-6 h-6" />,
  lesson4: <ListOrdered className="text-white w-6 h-6" />,
};

export default function LearnNotesGroupPage() {
  const params = useParams();
  const groupId = params.groupId as string;
  const course = COURSES.find((c) => c.id === "learn-notes");
  const groupData = course?.groups.find((g) => g.id === groupId);

  const lessons = (groupData?.lessons || []).map((l) => ({
    id: l.id,
    title: l.title,
    icon: ICON_MAP[l.id] || <Music className="text-white w-6 h-6" />,
    isPremium: !l.isFree,
  }));

  const { activeIndex, handleLessonClick } = useGroupLessons({
    gameSlug: "learn-notes",
    groups: (course?.groups || []) as any,
    lessons,
  });

  if (!course || !groupData) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="learn-notes"
      lessons={lessons}
      title={groupData.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
