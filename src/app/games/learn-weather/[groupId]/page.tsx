"use client";

import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, HelpCircle, Grid2X2, Mic, Shirt } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-weather/constants";

export default function WeatherGroupLessonsPage() {
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
    if (!isLessonUnlocked(groupId, lessonId, "learn-weather")) {
      return;
    }

    // 2. Freemium Check
    const access = await checkAccess("learn-weather", groupId, lessonId);

    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/learn-weather/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/learn-weather/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/learn-weather/${groupId}/lesson/${lessonId}`);
  };

  const lessons = [
    {
      id: "lesson1",
      title: groupId === "group3" ? "Học tên mùa" : "Học tên thời tiết",
      icon: <BookOpen className="text-white w-6 h-6" />,
      isPremium: false,
    },
    {
      id: "lesson2",
      title: "Tập nói",
      icon: <Mic className="text-white w-6 h-6" />,
      isPremium: true,
    },
    {
      id: "lesson3",
      title: "Đây là gì?",
      icon: <HelpCircle className="text-white w-6 h-6" />,
      isPremium: true,
    },
    {
      id: "lesson4",
      title: "Ghép đôi",
      icon: <Grid2X2 className="text-white w-6 h-6" />,
      isPremium: true,
    },
  ];

  if (groupId === "group3") {
    lessons.push({
      id: "lesson5",
      title: "Mặc gì cho đúng mùa?",
      icon: <Shirt className="text-white w-6 h-6" />,
      isPremium: true,
    });
  }

  // Determine active lesson
  const learnProgress = allProgress["learn-weather"] || { completedGroups: [], completedLessons: {} };
  const isGroupCompleted = learnProgress.completedGroups.includes(groupId);
  let activeIndex = -1;

  if (!isGroupCompleted) {
    for (let i = lessons.length - 1; i >= 0; i--) {
      if (isLessonUnlocked(groupId, lessons[i].id, "learn-weather")) {
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
      gameId="learn-weather"
      lessons={lessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
