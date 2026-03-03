"use client";

import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, HelpCircle, Grid2X2 } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-food/constants";

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
    if (!isLessonUnlocked(groupId, lessonId, "learn-food")) {
      return;
    }

    // 2. Freemium Check
    const access = await checkAccess("learn-food", groupId, lessonId);

    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/learn-food/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/learn-food/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/learn-food/${groupId}/lesson/${lessonId}`);
  };

  const lessons = [
    {
      id: "lesson1",
      title: "Học tên món ăn",
      icon: <BookOpen className="text-white w-6 h-6" />,
      isPremium: false,
    },
    {
      id: "lesson2",
      title: "Đây là món gì?",
      icon: <HelpCircle className="text-white w-6 h-6" />,
      isPremium: true,
    },
    {
      id: "lesson3",
      title: "Ghép đôi",
      icon: <Grid2X2 className="text-white w-6 h-6" />,
      isPremium: true,
    },
  ];

  // Determine active lesson
  const learnFoodProgress = allProgress["learn-food"] || { completedGroups: [], completedLessons: {} };
  const isGroupCompleted = learnFoodProgress.completedGroups.includes(groupId);
  let activeIndex = -1;

  if (!isGroupCompleted) {
    for (let i = lessons.length - 1; i >= 0; i--) {
      if (isLessonUnlocked(groupId, lessons[i].id, "learn-food")) {
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
      gameId="learn-food"
      lessons={lessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
