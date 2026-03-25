"use client";

import { useParams, useRouter } from "next/navigation";
import { StaticImageData } from "next/image";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, Scale, Hash, PenTool } from "lucide-react";

// Assets
import { ThingImages } from "@/libs/constants/thingImages";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";

// Group configurations
const groupConfig: Record<
  string,
  {
    title: string;
    symbol: string;
    image: string | StaticImageData;
    comparisonType: "greater" | "less" | "equal" | "mixed";
    lessons: Array<{ id: string; title: string; icon: React.ReactNode }>;
  }
> = {
  group1: {
    title: "Lớn hơn",
    symbol: ">",
    image: ThingImages[0].icon,
    comparisonType: "greater",
    lessons: [
      { id: "lesson1", title: "Học dấu lớn hơn", icon: <BookOpen className="text-white w-6 h-6" /> },
      { id: "lesson2", title: "Nhóm nào nhiều hơn?", icon: <Scale className="text-white w-6 h-6" /> },
      { id: "lesson3", title: "Số nào lớn hơn?", icon: <Hash className="text-white w-6 h-6" /> },
      { id: "lesson4", title: "Tập viết dấu >", icon: <PenTool className="text-white w-6 h-6" /> },
    ],
  },
  group2: {
    title: "Nhỏ hơn",
    symbol: "<",
    image: ThingImages[3].icon,
    comparisonType: "less",
    lessons: [
      { id: "lesson1", title: "Học dấu nhỏ hơn", icon: <BookOpen className="text-white w-6 h-6" /> },
      { id: "lesson2", title: "Nhóm nào ít hơn?", icon: <Scale className="text-white w-6 h-6" /> },
      { id: "lesson3", title: "Số nào nhỏ hơn?", icon: <Hash className="text-white w-6 h-6" /> },
      { id: "lesson4", title: "Tập viết dấu <", icon: <PenTool className="text-white w-6 h-6" /> },
    ],
  },
  group3: {
    title: "Bằng nhau",
    symbol: "=",
    image: ThingImages[6].icon,
    comparisonType: "equal",
    lessons: [
      { id: "lesson1", title: "Học dấu bằng", icon: <BookOpen className="text-white w-6 h-6" /> },
      { id: "lesson2", title: "Nhóm nào bằng nhau?", icon: <Scale className="text-white w-6 h-6" /> },
      { id: "lesson3", title: "Số nào bằng nhau?", icon: <Hash className="text-white w-6 h-6" /> },
      { id: "lesson4", title: "Tập viết dấu =", icon: <PenTool className="text-white w-6 h-6" /> },
    ],
  },
  group4: {
    title: "Luyện tập",
    symbol: "Mix",
    image: ThingImages[8].icon,
    comparisonType: "mixed",
    lessons: [
      { id: "lesson1", title: "So sánh đồ vật", icon: <Scale className="text-white w-6 h-6" /> },
      { id: "lesson2", title: "So sánh số", icon: <Hash className="text-white w-6 h-6" /> },
    ],
  },
};

export default function GroupLessonsPage() {
  const params = useParams();
  const router = useRouter();
  const { getCourseProgress, isLessonUnlocked } = useProgress();
  const { checkAccess, showPaywall } = useAccess();
  const courseId = "compare-quantity";

  const progress = getCourseProgress(courseId);

  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const config = groupConfig[groupId];

  if (!config) {
    return <div>Group not found</div>;
  }

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

  const isGroupCompleted = progress.completedGroups.includes(groupId);

  let activeIndex = -1;

  if (!isGroupCompleted) {
    for (let i = config.lessons.length - 1; i >= 0; i--) {
      if (isLessonUnlocked(courseId, groupId, config.lessons[i].id)) {
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
      gameId="compare-quantity"
      lessons={config.lessons}
      title={config.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
