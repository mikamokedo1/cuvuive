"use client";

import { useParams, useRouter } from "next/navigation";
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

export default function GroupLessonsPage() {
  const params = useParams();
  const router = useRouter();
  const { allProgress } = useProgress();
  const { checkAccess, showPaywall } = useAccess();

  const progress = allProgress["learn-divide"] || {
    completedGroups: [],
    completedLessons: {},
  };

  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const baseConfig = GROUP_CONFIG[groupId];

  if (!baseConfig) {
    return <div>Group not found</div>;
  }

  const lessons = baseConfig.lessons.map((lesson: any) => {
    return {
      ...lesson,
      icon: iconMap[lesson.icon],
    };
  });

  const isGroupUnlocked = (gId: string) => {
    if (gId === "group1") return true;
    if (gId === "group2") return progress.completedGroups.includes("group1");
    if (gId === "group3") return progress.completedGroups.includes("group2");
    if (gId === "group4") return progress.completedGroups.includes("group3");
    if (gId === "group5") return progress.completedGroups.includes("group4");
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
    if (lessonId === "lesson5") return completedInGroup.includes("lesson4");
    return false;
  };

  const handleLessonClick = async (lessonId: string) => {
    if (!isLessonUnlocked(groupId, lessonId)) return;

    const access = checkAccess("learn-divide", groupId, lessonId);
    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/learn-divide/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/learn-divide/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/learn-divide/${groupId}/lesson/${lessonId}`);
  };

  const isGroupCompleted = progress.completedGroups.includes(groupId);
  let activeIndex = -1;

  if (!isGroupCompleted) {
    for (let i = lessons.length - 1; i >= 0; i--) {
      if (isLessonUnlocked(groupId, lessons[i].id)) {
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
      lessons={lessons}
      title={baseConfig.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
