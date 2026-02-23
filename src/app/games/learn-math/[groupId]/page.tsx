"use client";

import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, Eye, Hash, Pencil } from "lucide-react";

import { GROUP_CONFIG } from "@/features/games/learn-math/constants";
import { LessonCard } from "@/components/games/LessonCard";

// Map string icons to React components
const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="text-white w-6 h-6" />,
  Eye: <Eye className="text-white w-6 h-6" />,
  Hash: <Hash className="text-white w-6 h-6" />,
  Pencil: <Pencil className="text-white w-6 h-6" />,
};

export default function GroupLessonsPage() {
  const params = useParams();
  const router = useRouter();
  const { allProgress } = useProgress();
  const { checkAccess, showPaywall } = useAccess();

  // Get course-specific progress
  const progress = allProgress["learn-math"] || {
    completedGroups: [],
    completedLessons: {},
  };

  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const config = GROUP_CONFIG[groupId];

  if (!config) {
    return <div>Group not found</div>;
  }

  // Helper to check group unlock
  const isGroupUnlocked = (gId: string) => {
    if (gId === "group1") return true;
    if (gId === "group2") return progress.completedGroups.includes("group1");
    if (gId === "group3") return progress.completedGroups.includes("group2");
    return false;
  };

  const isLessonUnlocked = (gId: string, lessonId: string) => {
    if (!isGroupUnlocked(gId)) return false;
    const completedInGroup = progress.completedLessons[gId] || [];
    if (completedInGroup.includes(lessonId)) return true;
    if (lessonId === "lesson1") return true;
    if (lessonId === "lesson2") return completedInGroup.includes("lesson1");
    if (lessonId === "lesson3") return completedInGroup.includes("lesson2");
    if (lessonId === "lesson4") return completedInGroup.includes("lesson3");
    return false;
  };

  const handleLessonClick = async (lessonId: string) => {
    if (!isLessonUnlocked(groupId, lessonId)) return;

    const access = await checkAccess("learn-math", groupId, lessonId);
    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/learn-math/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/learn-math/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/learn-math/${groupId}/lesson/${lessonId}`);
  };

  // Determine active lesson (the first one that is Unlocked AND Not Completed)
  const isGroupCompleted = progress.completedGroups.includes(groupId);
  let activeIndex = -1;

  if (!isGroupCompleted) {
    for (let i = config.lessons.length - 1; i >= 0; i--) {
      if (isLessonUnlocked(groupId, config.lessons[i].id)) {
        activeIndex = i;
        break;
      }
    }
  }

  // Fallback to first lesson if just starting
  if (!isGroupCompleted && activeIndex === -1) {
    activeIndex = 0;
  }

  return (
    <GameLayout title={config.title} backTo="/games/learn-math">
      <main className="w-full flex flex-col items-center">
        <div className="w-full max-w-2xl px-4 flex flex-col items-center gap-6 pt-4">
          <div className="w-full space-y-4 pb-10">
            {config.lessons.map((lesson, index) => {
              const unlocked = isLessonUnlocked(groupId, lesson.id);
              const isActive = index === activeIndex;

              return (
                <LessonCard
                  key={lesson.id}
                  lesson={{ ...lesson, icon: iconMap[lesson.icon] }}
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
