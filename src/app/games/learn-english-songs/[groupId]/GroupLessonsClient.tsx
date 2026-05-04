"use client";

import { useGameLessons } from "@/hooks/useGameLessons";
import { GROUPS } from "@/features/games/learn-english-songs/constants";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  const { group, lessons, nextGroup } = useGameLessons({
    gameSlug: "learn-english-songs",
    groups: GROUPS,
    groupId,
  });

  if (!group) return <div>Không tìm thấy nhóm bài học</div>;

  return (
    <GameWrapLessons
      group={group}
      lessons={lessons}
      nextGroup={nextGroup}
      gameId="learn-english-songs"
    />
  );
}
