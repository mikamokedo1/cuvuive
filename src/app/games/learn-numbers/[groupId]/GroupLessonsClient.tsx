"use client";

import { StaticImageData } from "next/image";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, HelpCircle, Calculator, PenTool } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";

const group1 = "https://assets.cuthongminh.com/games/learn-numbers/number-logo-1.webp";
const group2 = "https://assets.cuthongminh.com/games/learn-numbers/number-logo-2.webp";
const group3 = "https://assets.cuthongminh.com/games/learn-numbers/number-logo-3.webp";
const group4 = "https://assets.cuthongminh.com/games/learn-numbers/number-logo-4.webp";
const group5 = "https://assets.cuthongminh.com/games/compare-quantity/compare-quantity-logo-4.webp";

interface GroupLessonsClientProps {
  groupId: string;
}

export function GroupLessonsClient({ groupId }: GroupLessonsClientProps) {
  const { getCourseProgress, isLessonUnlocked } = useProgress();
  const { checkAccess, showPaywall } = useAccess();
  const courseId = "learn-numbers";

  const groupConfig: Record<string, { title: string; range: string; image: string | StaticImageData }> = {
    group1: { title: "Nhóm 1,2,3", range: "1 - 3", image: group1 },
    group2: { title: "Nhóm 4,5,6", range: "4 - 6", image: group2 },
    group3: { title: "Nhóm 7,8,9", range: "7 - 9", image: group3 },
    group4: { title: "Số 10-20", range: "0, 10 - 20", image: group4 },
    group5: { title: "Luyện tập", range: "0 - 20", image: group5 },
  };

  const config = groupConfig[groupId];

  if (!config) {
    return <div>Group not found</div>;
  }
  const handleLessonClick = async (lessonId: string) => {
    if (!isLessonUnlocked(courseId, groupId, lessonId)) {
      return;
    }

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

  const regularLessons = [
    {
      id: "lesson1",
      title: `Học số ${config.range}`,
      icon: <BookOpen className="text-white w-6 h-6" />,
      color: "blue",
      isPremium: false,
    },
    {
      id: "lesson2",
      title: "Số nào đúng?",
      icon: <HelpCircle className="text-white w-6 h-6" />,
      color: "green",
      isPremium: true,
    },
    {
      id: "lesson3",
      title: "Đếm và chọn",
      icon: <Calculator className="text-white w-6 h-6" />,
      color: "purple",
      isPremium: true,
    },
    {
      id: "lesson4",
      title: "Tập viết số",
      icon: <PenTool className="text-white w-6 h-6" />,
      color: "green",
      isPremium: true,
    },
  ];

  const practiceLessons = [
    {
      id: "lesson1",
      title: "Số nào đúng?",
      icon: <HelpCircle className="text-white w-6 h-6" />,
      color: "green",
      isPremium: false,
    },
    {
      id: "lesson2",
      title: "Đếm và chọn",
      icon: <Calculator className="text-white w-6 h-6" />,
      color: "purple",
      isPremium: true,
    },
  ];

  const lessons = (groupId === "group5" ? practiceLessons : regularLessons).map((lesson) => {
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
  const progress = getCourseProgress(courseId);
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
      gameId="learn-numbers"
      lessons={lessons}
      title={config.title}
      activeIndex={activeIndex}
      handleLessonClick={handleLessonClick}
    />
  );
}
