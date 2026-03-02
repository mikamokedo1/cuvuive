"use client";

import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, HelpCircle, Grid2X2, Mic, PenTool } from "lucide-react";
import { LessonTitle } from "@/components/games/LessonTitle";
import { LessonCard } from "@/components/games/LessonCard";
import { GROUPS } from "@/features/games/learn-alphabet/constants";

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
    if (!isLessonUnlocked(groupId, lessonId, "learn-alphabet")) {
      return;
    }

    const access = await checkAccess("learn-alphabet", groupId, lessonId);

    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/learn-alphabet/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/learn-alphabet/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/learn-alphabet/${groupId}/lesson/${lessonId}`);
  };

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
      isPremium: true,
    },
    {
      id: "lesson3",
      title: "Tập viết",
      icon: <PenTool className="text-white w-6 h-6" />,
      isPremium: true,
    },
    {
      id: "lesson4",
      title: "Chữ nào đúng?",
      icon: <HelpCircle className="text-white w-6 h-6" />,
      isPremium: true,
    },
    {
      id: "lesson5",
      title: "Ghép đôi",
      icon: <Grid2X2 className="text-white w-6 h-6" />,
      isPremium: true,
    },
  ];

  const learnAlphabetProgress = allProgress["learn-alphabet"] || { completedGroups: [], completedLessons: {} };
  const isGroupCompleted = learnAlphabetProgress.completedGroups.includes(groupId);
  let activeIndex = -1;

  if (!isGroupCompleted) {
    for (let i = lessons.length - 1; i >= 0; i--) {
      if (isLessonUnlocked(groupId, lessons[i].id, "learn-alphabet")) {
        activeIndex = i;
        break;
      }
    }
  }

  if (!isGroupCompleted && activeIndex === -1) {
    activeIndex = 0;
  }

  return (
    <GameLayout title="" backTo="/games/learn-alphabet">
      <main className="w-full flex flex-col items-center">
        <div className="w-full max-w-2xl px-4 flex flex-col items-center gap-6 pt-4">
          <div className="text-center space-y-2">
            <LessonTitle>{group.title}</LessonTitle>
          </div>

          <div className="w-full space-y-4 pb-10">
            {lessons.map((lesson, index) => {
              const unlocked = isLessonUnlocked(groupId, lesson.id, "learn-alphabet");
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
