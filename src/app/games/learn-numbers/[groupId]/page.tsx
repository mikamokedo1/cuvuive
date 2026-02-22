"use client";

import { useParams, useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { BookOpen, HelpCircle, Calculator, PenTool } from "lucide-react";
import { LessonTitle } from "@/components/games/LessonTitle";

// Assets
import group1 from "@/assets/games/learn-numbers/number-logo-1.png";
import group2 from "@/assets/games/learn-numbers/number-logo-2.png";
import group3 from "@/assets/games/learn-numbers/number-logo-3.png";
import group4 from "@/assets/games/learn-numbers/number-logo-4.webp";
import { LessonCard } from "@/components/games/LessonCard";
// Note: User mentioned "own-sleep" but design shows lock icon for locked state.
// Using LockCardIcon for the right side image of locked cards.

export default function GroupLessonsPage() {
  const params = useParams();
  const router = useRouter();
  const { isLessonUnlocked, progress } = useProgress();
  const { checkAccess, showPaywall } = useAccess();

  // Ensure groupId is string
  const groupId =
    typeof params.groupId === "string" ? params.groupId : Array.isArray(params.groupId) ? params.groupId[0] : "";

  // Config mapping
  const groupConfig: Record<string, { title: string; range: string; image: StaticImageData }> = {
    group1: { title: "Nhóm 1,2,3", range: "1 - 3", image: group1 },
    group2: { title: "Nhóm 4,5,6", range: "4 - 6", image: group2 },
    group3: { title: "Nhóm 7,8,9", range: "7 - 9", image: group3 },
    group4: { title: "Số 10-20", range: "0, 10 - 20", image: group4 },
    group5: { title: "Luyện tập", range: "0 - 20", image: group1 },
  };

  const config = groupConfig[groupId];

  if (!config) {
    return <div>Group not found</div>;
  }

  const handleLessonClick = async (lessonId: string) => {
    // Step 1: Check progress - must complete previous lesson first
    if (!isLessonUnlocked(groupId, lessonId)) {
      // Lesson is locked due to progress (previous lesson not completed)
      // Don't show paywall, the UI already shows it as locked
      return;
    }

    // Step 2: Check access - lesson must be free OR user must be premium
    const access = await checkAccess("learn-numbers", groupId, lessonId);

    if (!access.userHasAccess) {
      if (access.reason === "not_logged_in") {
        showPaywall("login", `/games/learn-numbers/${groupId}/lesson/${lessonId}`);
      } else if (access.reason === "premium_required") {
        showPaywall("premium", `/games/learn-numbers/${groupId}/lesson/${lessonId}`);
      }
      return;
    }

    // Both checks passed - navigate to lesson
    router.push(`/games/learn-numbers/${groupId}/lesson/${lessonId}`);
  };

  // Regular lessons for groups 1-3
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

  // Practice lessons for group4 - only 2 lessons with full range 1-9
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

  // Choose lessons based on group
  const lessons = groupId === "group5" ? practiceLessons : groupId === "group4" ? regularLessons : regularLessons;

  // Determine active lesson
  // Logic: The first unlocked lesson that is NOT completed?
  // OR simpy the first unlocked lesson if we want linear progression.
  // The design implies one "Active" main card.
  // Let's assume the highest unlocked lesson is the active one to focus on.
  // Or if all completed, maybe looking back at 1?
  // Let's go with: Find the first incomplete lesson. If all complete, default to the last one or first one?
  // For "Learning", usuallly you work on the current level.
  // Let's try: Find the first unlocked lesson.
  // Actually, standard game UI: Focus on the "Current Level".
  // Which is the first one that is NOT completed.

  const groupProgress = progress.completedLessons[groupId] || [];

  // Find the first lesson that is either locked (stop) or unlocked-and-not-completed.
  // Actually simpler: The first lesson that is Unlocked AND Not Completed is the current target.
  // If all unlocked are completed, then the user has finished the group.
  // But maybe they want to replay.
  // Let's default "Active" to be the *first unlocked lesson* that the user clicked?
  // Determine active lesson
  // Logic: The "Frontier". The highest lesson that is Unlocked.
  // This allows users to continue where they left off.
  // BUT if the whole group is completed, we want all shrunken (activeIndex = -1)

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

  // If nothing is unlocked (shouldn't happen for group1) or just starting, defaults to -1 (shrunken) or 0?
  // Code previously defaulted to 0 if found nothing.
  // If group is NOT completed but somehow no lessons found (bug?), maybe fallback to 0.
  // But if group IS completed, activeIndex stays -1.

  if (!isGroupCompleted && activeIndex === -1) {
    activeIndex = 0;
  }

  // Override logic: The user wants the UI to look specific.
  // If "Active" means "Expanded", we render that one differently.

  return (
    <GameLayout title="" backTo="/games/learn-numbers">
      <main className="w-full flex flex-col items-center">
        {/* Custom Header Section */}
        <div className="w-full max-w-2xl px-4 flex flex-col items-center gap-6 pt-4">
          {/* Title Group */}
          <div className="text-center space-y-2">
            <LessonTitle>{config.title}</LessonTitle>
            <div className="relative w-60 h-24 mx-auto">
              <Image src={config.image} alt="Group Logo" fill className="object-contain" priority />
            </div>
          </div>

          {/* Lesson Cards */}
          <div className="w-full space-y-4 pb-10">
            {lessons.map((lesson, index) => {
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
      </main>
    </GameLayout>
  );
}
