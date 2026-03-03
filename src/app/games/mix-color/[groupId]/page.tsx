"use client";

import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, HelpCircle, Palette } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/mix-color/constants";
import { GameLayout } from "@/components/layout/GameLayout";

export default function GroupLessonsPage() {
  const params = useParams();
  const router = useRouter();
  const { isLessonUnlocked, allProgress } = useProgress();
  const { checkAccess, showPaywall } = useAccess();

  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const group = GROUPS.find((g) => g.id === groupId);

  if (!group) {
    return <div>Group not found</div>;
  }

  const handleLessonClick = async (lessonId: string) => {
    // 1. Progress Check
    if (!isLessonUnlocked(groupId, lessonId, "mix-color")) {
      return;
    }

    // 2. Freemium Check
    const access = await checkAccess("mix-color", groupId, lessonId);

    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/mix-color/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/mix-color/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/mix-color/${groupId}/lesson/${lessonId}`);
  };

  const lessons = [
    {
      id: "lesson1",
      title: "Học pha màu",
      icon: <BookOpen className="text-white w-6 h-6" />,
      color: "blue",
      isPremium: false,
    },
    {
      id: "lesson2",
      title: "Pha màu nào?",
      icon: <HelpCircle className="text-white w-6 h-6" />,
      color: "green",
      isPremium: true,
    },
    {
      id: "lesson3",
      title: "Thử thách pha màu",
      icon: <Palette className="text-white w-6 h-6" />,
      color: "purple",
      isPremium: true,
    },
  ];

  // Determine active lesson
  const mixColorProgress = allProgress["mix-color"] || { completedGroups: [], completedLessons: {} };
  const isGroupCompleted = mixColorProgress.completedGroups.includes(groupId);
  let activeIndex = -1;

  if (!isGroupCompleted) {
    for (let i = lessons.length - 1; i >= 0; i--) {
      if (isLessonUnlocked(groupId, lessons[i].id, "mix-color")) {
        activeIndex = i;
        break;
      }
    }
  }

  if (!isGroupCompleted && activeIndex === -1) {
    activeIndex = 0;
  }

  return (
    <GameWrapLessons
      gameId="mix-color"
      lessons={lessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
