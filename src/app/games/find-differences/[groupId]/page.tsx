"use client";

import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, Search, Eye } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { FIND_DIFFERENCES_DATA } from "@/features/games/find-differences/constans";

export default function GroupLessonsPage() {
  const params = useParams();
  const router = useRouter();
  const { getCourseProgress, isLessonUnlocked } = useProgress();
  const { checkAccess, showPaywall } = useAccess();
  const courseId = "find-differences";

  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const group = FIND_DIFFERENCES_DATA.find((g) => g.id === groupId);

  if (!group) {
    return <div>Group not found</div>;
  }

  const handleLessonClick = async (lessonId: string) => {
    if (!isLessonUnlocked(courseId, groupId, lessonId)) {
      return;
    }

    const access = checkAccess(courseId, groupId, lessonId);

    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/find-differences/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/find-differences/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/find-differences/${groupId}/lesson/${lessonId}`);
  };

  const iconsList = [
    <BookOpen key="book" className="text-white w-6 h-6" />,
    <Search key="search" className="text-white w-6 h-6" />,
    <Eye key="eye" className="text-white w-6 h-6" />,
  ];

  const lessons = group.lessons.map((lesson, index) => ({
    id: lesson.id,
    title: lesson.title,
    icon: iconsList[index % iconsList.length],
    isPremium: index > 0,
  }));

  const findDifferencesProgress = getCourseProgress(courseId);
  const isGroupCompleted = findDifferencesProgress.completedGroups.includes(groupId);
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
      gameId="find-differences"
      lessons={lessons}
      title={group.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
