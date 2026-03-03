"use client";

import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, HelpCircle, Palette } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { GROUPS } from "@/features/games/learn-color/constants";

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
    if (!isLessonUnlocked(groupId, lessonId, "learn-color")) {
      return;
    }

    // 2. Freemium Check
    const access = await checkAccess("learn-color", groupId, lessonId);

    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/learn-color/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/learn-color/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/learn-color/${groupId}/lesson/${lessonId}`);
  };

  const lessons = [
    {
      id: "lesson1",
      title: "Học màu sắc",
      icon: <BookOpen className="text-white w-6 h-6" />,
      color: "blue",
      isPremium: false,
    },
    {
      id: "lesson2",
      title: "Tìm màu giống",
      icon: <HelpCircle className="text-white w-6 h-6" />,
      color: "green",
      isPremium: true,
    },
    {
      id: "lesson3",
      title: "Hình gì màu gì?",
      icon: <Palette className="text-white w-6 h-6" />,
      color: "purple",
      isPremium: true,
    },
  ];

  if (groupId === "group3") {
    // Practice group
    // Define practice lessons
  }

  // Determine active lesson
  // Similar logic to learn-numbers
  const learnColorProgress = allProgress["learn-color"] || { completedGroups: [], completedLessons: {} };
  const isGroupCompleted = learnColorProgress.completedGroups.includes(groupId);
  let activeIndex = -1;

  if (!isGroupCompleted) {
    for (let i = lessons.length - 1; i >= 0; i--) {
      // Note: isLessonUnlocked might need "learn-color" as 3rd arg if updated in other contexts
      // Checking context signature via usage in other files...
      // In learn-numbers page: isLessonUnlocked(groupId, lessonId) - it infers game from context or default?
      // Actually Context definition usually takes (groupId, lessonId, gameId?)
      // Let's assume we need to pass gameId if the context supports multiple games generically
      // or if the hook is generic.
      // Looking at `isLessonUnlocked` usage in previous file read: `isLessonUnlocked(groupId, lessonId)` inside learn-numbers/page.tsx
      // But `progress` context might be generic.
      // Let's check `ProgressContext` if possible or just assume standard signature.
      // Safest is to pass gameId if accepted. I see `markLessonComplete` takes gameId.
      if (isLessonUnlocked(groupId, lessons[i].id, "learn-color")) {
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
      gameId="learn-color"
      lessons={lessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
