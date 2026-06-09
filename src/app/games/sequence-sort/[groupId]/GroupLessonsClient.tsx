"use client";

import { ArrowUpDown, TrendingUp, Zap, Ruler } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS, LESSON_CONFIGS } from "@/features/games/sequence-sort/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";

const ICON_MAP: Record<string, React.ReactNode> = {
  "↗️": <TrendingUp className="text-white w-6 h-6" />,
  "↘️": <TrendingUp className="text-white w-6 h-6 rotate-180" />,
  "📈": <TrendingUp className="text-white w-6 h-6" />,
  "📉": <TrendingUp className="text-white w-6 h-6 rotate-180" />,
  "📏": <Ruler className="text-white w-6 h-6" />,
  "📐": <Ruler className="text-white w-6 h-6 rotate-180" />,
  "🎨": <ArrowUpDown className="text-white w-6 h-6" />,
  "🌈": <ArrowUpDown className="text-white w-6 h-6" />,
  "⚡": <Zap className="text-white w-6 h-6" />,
};

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  const lessonConfigs = LESSON_CONFIGS[groupId] || LESSON_CONFIGS["group1"];

  const lessons = lessonConfigs.map((config) => ({
    id: config.id,
    title: config.title,
    icon: ICON_MAP[config.icon] || <ArrowUpDown className="text-white w-6 h-6" />,
    isPremium: config.isPremium,
  }));

  const { group, activeIndex, handleLessonClick, lessonsWithHref } = useGroupLessons({
    gameSlug: "sequence-sort",
    groups: GROUPS,
    lessons,
    initialGroupId: groupId,
  });

  if (!group) return <div>Group not found</div>;

  return (
    <GameWrapLessons
      gameId="sequence-sort"
      lessons={lessonsWithHref}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
