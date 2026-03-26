"use client";

import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, Eye, Hash, PencilLine, ArrowRight } from "lucide-react";
import { GROUP_CONFIG } from "@/features/games/learn-divide/constants";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="text-white w-6 h-6" />,
  Eye: <Eye className="text-white w-6 h-6" />,
  Hash: <Hash className="text-white w-6 h-6" />,
  PencilLine: <PencilLine className="text-white w-6 h-6" />,
  ArrowRight: <ArrowRight className="text-white w-6 h-6" />,
};

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  const { getCourseProgress, isLessonUnlocked } = useProgress();
  const { checkAccess, showPaywall } = useAccess();
  const courseId = "learn-divide";

  const progress = getCourseProgress(courseId);
  const baseConfig = GROUP_CONFIG[groupId];

  if (!baseConfig) {
    return <div>Group not found</div>;
  }

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

  };

  const lessonsWithHref = lessons.map((lesson) => {
    const unlocked = isLessonUnlocked(courseId, groupId, lesson.id);
    if (!unlocked) {
      return lesson;
    }

    const access = checkAccess(courseId, groupId, lesson.id);
    return {
      ...lesson,
      href: access.userHasAccess ? `/games/${courseId}/${groupId}/lesson/${lesson.id}` : undefined,
    };
  });

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

  if (!isGroupCompleted && activeIndex === -1) {
    activeIndex = 0;
  }

  return (
    <GameWrapLessons
      gameId="learn-divide"
      lessons={lessonsWithHref}
      title={baseConfig.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
