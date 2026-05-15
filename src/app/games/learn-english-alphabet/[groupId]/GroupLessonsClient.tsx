"use client";

import { BookOpen, Headphones, Puzzle, HelpCircle, Mic } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-english-alphabet/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const lessons = [
  {
    id: "lesson1",
    title: "Học chữ cái",
    icon: <BookOpen className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson2",
    title: "Tập nói",
    icon: <Mic className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson3",
    title: "Nghe & Chọn",
    icon: <Headphones className="text-white w-6 h-6" />,
    isPremium: false,
  },
  {
    id: "lesson4",
    title: "Ghép từ",
    icon: <Puzzle className="text-white w-6 h-6" />,
    isPremium: true,
  },
  {
    id: "lesson5",
    title: "Kiểm tra",
    icon: <HelpCircle className="text-white w-6 h-6" />,
    isPremium: true,
  },
];

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  const { group, activeIndex, handleLessonClick, lessonsWithHref } = useGroupLessons({
    gameSlug: "learn-english-alphabet",
    groups: GROUPS,
    lessons,
    initialGroupId: groupId,
  });

  if (!group) return <div>Không tìm thấy nhóm bài học</div>;

  return (
    <GameWrapLessons
      gameId="learn-english-alphabet"
      lessons={lessonsWithHref}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
