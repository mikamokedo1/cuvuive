"use client";

import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, HelpCircle, Puzzle } from "lucide-react";
import { LessonTitle } from "@/components/games/LessonTitle";
import { LessonCard } from "@/components/games/LessonCard";
import { GROUPS } from "@/features/games/odd-one-out/constants";

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
    if (!isLessonUnlocked(groupId, lessonId, "odd-one-out")) {
      return;
    }

    const access = await checkAccess("odd-one-out", groupId, lessonId);

    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/odd-one-out/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/odd-one-out/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/odd-one-out/${groupId}/lesson/${lessonId}`);
  };

  const lessons = [
    {
      id: "lesson1",
      title: "Tìm thử",
      icon: <HelpCircle className="text-white w-6 h-6" />,
      isPremium: false,
    },
  ];

  const oddOneOutProgress = allProgress["odd-one-out"] || { completedGroups: [], completedLessons: {} };
  const isGroupCompleted = oddOneOutProgress.completedGroups.includes(groupId);
  let activeIndex = -1;

  if (!isGroupCompleted) {
    for (let i = lessons.length - 1; i >= 0; i--) {
      if (isLessonUnlocked(groupId, lessons[i].id, "odd-one-out")) {
        activeIndex = i;
        break;
      }
    }
  }

  if (!isGroupCompleted && activeIndex === -1) {
    activeIndex = 0;
  }

  return (
    <GameLayout title="" backTo="/games/odd-one-out">
      <main className="w-full flex flex-col items-center">
        <div className="w-full max-w-2xl px-4 flex flex-col items-center gap-6 pt-4">
          <div className="text-center space-y-2">
            <LessonTitle>{group.title}</LessonTitle>
          </div>

          <div className="w-full space-y-4 pb-10">
            {lessons.map((lesson, index) => {
              const unlocked = isLessonUnlocked(groupId, lesson.id, "odd-one-out");
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
