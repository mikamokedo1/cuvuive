"use client";

import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, HelpCircle, Grid2X2, MapPin } from "lucide-react";
import { LessonTitle } from "@/components/games/LessonTitle";
import { LessonCard } from "@/components/games/LessonCard";
import { GROUPS } from "@/features/games/learn-vehicle/constants";

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
    if (!isLessonUnlocked(groupId, lessonId, "learn-vehicle")) {
      return;
    }

    // 2. Freemium Check
    const access = await checkAccess("learn-vehicle", groupId, lessonId);

    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/learn-vehicle/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/learn-vehicle/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/learn-vehicle/${groupId}/lesson/${lessonId}`);
  };

  // All groups have 3 lessons, but Group 4 has different types
  const isGroup4 = groupId === "group4";

  const lessons = isGroup4
    ? [
        {
          id: "lesson1",
          title: "Đây là gì?",
          icon: <HelpCircle className="text-white w-6 h-6" />,
          isPremium: false,
        },
        {
          id: "lesson2",
          title: "Ghép đôi",
          icon: <Grid2X2 className="text-white w-6 h-6" />,
          isPremium: true,
        },
        {
          id: "lesson3",
          title: "Xe đi đâu?",
          icon: <MapPin className="text-white w-6 h-6" />,
          isPremium: true,
        },
      ]
    : [
        {
          id: "lesson1",
          title: "Học tên phương tiện",
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

  // Determine active lesson
  const learnVehicleProgress = allProgress["learn-vehicle"] || { completedGroups: [], completedLessons: {} };
  const isGroupCompleted = learnVehicleProgress.completedGroups.includes(groupId);
  let activeIndex = -1;

  if (!isGroupCompleted) {
    for (let i = lessons.length - 1; i >= 0; i--) {
      if (isLessonUnlocked(groupId, lessons[i].id, "learn-vehicle")) {
        activeIndex = i;
        break;
      }
    }
  }

  if (!isGroupCompleted && activeIndex === -1) {
    activeIndex = 0;
  }

  return (
    <GameLayout title="" backTo="/games/learn-vehicle">
      <main className="w-full flex flex-col items-center">
        <div className="w-full max-w-2xl px-4 flex flex-col items-center gap-6 pt-4">
          <div className="text-center space-y-2">
            <LessonTitle>{group.title}</LessonTitle>
          </div>

          <div className="w-full space-y-4 pb-10">
            {lessons.map((lesson, index) => {
              const unlocked = isLessonUnlocked(groupId, lesson.id, "learn-vehicle");
              const isActive = index === activeIndex;

              return (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  unlocked={unlocked}
                  isActive={isActive}
                  onClick={handleLessonClick}
                />
              );
            })}
          </div>
        </div>
      </main>
    </GameLayout>
  );
}
