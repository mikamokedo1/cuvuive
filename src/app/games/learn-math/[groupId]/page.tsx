"use client";

import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, Eye, Hash, Pencil } from "lucide-react";
import { GROUP_CONFIG } from "@/features/games/learn-math/constants";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";

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
  const { getCourseProgress, isLessonUnlocked } = useProgress();
  const { checkAccess, showPaywall } = useAccess();
  const courseId = "learn-math";

  const progress = getCourseProgress(courseId);

  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const baseConfig = GROUP_CONFIG[groupId];

  if (!baseConfig) {
    return <div>Group not found</div>;
  }

  // Create a safe copy of lessons to avoid mutating GROUP_CONFIG
  const lessons = baseConfig.lessons.map((lesson) => {
    return {
      ...lesson,
      icon: iconMap[lesson.icon],
    };
  });

  const handleLessonClick = async (lessonId: string) => {
    if (!isLessonUnlocked(courseId, groupId, lessonId)) return;

    const access = checkAccess(courseId, groupId, lessonId);
    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/${courseId}/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/${courseId}/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/${courseId}/${groupId}/lesson/${lessonId}`);
  };

  // Determine active lesson (the first one that is Unlocked AND Not Completed)
  const isGroupCompleted = progress.completedGroups.includes(groupId);
  let activeIndex = -1;

  if (!isGroupCompleted) {
    for (let i = lessons.length - 1; i >= 0; i--) {
      if (isLessonUnlocked(courseId, groupId, lessons[i].id)) {
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
    <GameWrapLessons
      gameId="learn-math"
      lessons={lessons}
      title={baseConfig.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
