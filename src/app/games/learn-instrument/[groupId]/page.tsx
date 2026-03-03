"use client";

import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, HelpCircle, Grid2X2 } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-instrument/constants";

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
    if (!isLessonUnlocked(groupId, lessonId, "learn-instrument")) {
      return;
    }

    const access = await checkAccess("learn-instrument", groupId, lessonId);

    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/learn-instrument/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/learn-instrument/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/learn-instrument/${groupId}/lesson/${lessonId}`);
  };

  const lessons = [
    {
      id: "lesson1",
      title: "Học tên nhạc cụ",
      icon: <BookOpen className="text-white w-6 h-6" />,
      isPremium: false,
    },
    {
      id: "lesson2",
      title: "Đây là gì?",
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

  const learnInstrumentProgress = allProgress["learn-instrument"] || { completedGroups: [], completedLessons: {} };
  const isGroupCompleted = learnInstrumentProgress.completedGroups.includes(groupId);
  let activeIndex = -1;

  if (!isGroupCompleted) {
    for (let i = lessons.length - 1; i >= 0; i--) {
      if (isLessonUnlocked(groupId, lessons[i].id, "learn-instrument")) {
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
      gameId="learn-instrument"
      lessons={lessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
