"use client";

import { useParams, useRouter } from "next/navigation";
import { StaticImageData } from "next/image";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, Scale, Hash, PenTool, Dumbbell } from "lucide-react";

// Assets
import { ThingImages } from "@/libs/constants/thingImages";
import { LessonCard } from "@/components/games/LessonCard";

// Group configurations
const groupConfig: Record<
  string,
  {
    title: string;
    symbol: string;
    image: StaticImageData;
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
  const { allProgress } = useProgress();
  const { checkAccess, showPaywall } = useAccess();

  // Get course-specific progress
  const progress = allProgress["compare-quantity"] || {
    completedGroups: [],
    completedLessons: {},
  };

  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const config = groupConfig[groupId];

  if (!config) {
    return <div>Group not found</div>;
  }

  // Helper to check group unlock
  const isGroupUnlocked = (gId: string) => {
    if (gId === "group1") return true;
    if (gId === "group2") return progress.completedGroups.includes("group1");
    if (gId === "group3") return progress.completedGroups.includes("group2");
    if (gId === "group4") return progress.completedGroups.includes("group3");
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

    const access = await checkAccess("compare-quantity", groupId, lessonId);
    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/compare-quantity/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/compare-quantity/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    router.push(`/games/compare-quantity/${groupId}/lesson/${lessonId}`);
  };

  // Determine active lesson (the first one that is Unlocked AND Not Completed)
  const groupProgress = progress.completedLessons[groupId] || [];
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
    <GameLayout title={config.title} backTo="/games/compare-quantity">
      <div className="w-full max-w-2xl px-4 flex flex-col items-center gap-6 pt-4">
        {/* Lesson Cards */}
        <div className="w-full space-y-4 pb-10">
          {config.lessons.map((lesson, index) => {
            const unlocked = isLessonUnlocked(groupId, lesson.id);
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
    </GameLayout>
  );
}
