"use client";

import { HelpCircle } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/line-connect/constants";
import { useGroupLessons } from "@/hooks/useGroupLessons";
import { useAccess } from "@/context/AccessContext";
import { useEffect } from "react";

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
    gameSlug: "line-connect",
    groups: GROUPS,
    lessons,
    initialGroupId: groupId,
  });
  const { isPremium, isLoggedIn, showPaywall } = useAccess();

  // Check if current group requires premium
  const currentGroup = GROUPS.find((g) => g.id === groupId);
  const groupRequiresPremium = !!currentGroup?.isPremium;
  const premiumLocked = groupRequiresPremium && (!isLoggedIn || !isPremium);

  useEffect(() => {
    if (premiumLocked) {
      if (!isLoggedIn) {
        showPaywall("login", `/games/line-connect/${groupId}`);
      } else {
        showPaywall("premium", `/games/line-connect/${groupId}`);
      }
    }
  }, [premiumLocked, isLoggedIn, groupId, showPaywall]);

  if (!group) return <div>Không tìm thấy dữ liệu</div>;
  if (premiumLocked) return null;

  return (
    <GameWrapLessons
      gameId="line-connect"
      lessons={lessonsWithHref}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
