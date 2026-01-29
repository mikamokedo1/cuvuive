"use client";

import { Metadata } from "next";

// Note: In Next.js, metadata cannot be exported from a Client Component.
// We should use a layout.tsx for metadata if needed.

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { LearnLesson } from "@/features/games/learn-game/LearnLesson";
import { QuizLesson } from "@/features/games/learn-game/QuizLesson";
import { CountingLesson } from "@/features/games/learn-game/CountingLesson";
import { WritingLesson } from "@/features/games/learn-game/WritingLesson";
import { CompletionModal } from "@/components/games/CompletionModal";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  const { isLoaded, isLessonUnlocked, markLessonComplete } = useProgress();
  const { checkAccess, showPaywall } = useAccess();

  const [currentLessonNum, setCurrentLessonNum] = useState<number | string>(1);
  const [nextLessonNum, setNextLessonNum] = useState<number | string | null>(null);
  const [isGroupDone, setIsGroupDone] = useState(false);

  // Parse IDs
  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const lessonId = typeof params.lessonId === "string" ? params.lessonId : "";

  // Determine configuration
  const groupRanges: Record<string, [number, number]> = {
    group1: [1, 3],
    group2: [4, 6],
    group3: [7, 9],
    group4: [1, 9],
  };

  const range = groupRanges[groupId];

  // Final check on mount/params change
  useEffect(() => {
    const runAccessCheck = async () => {
      // Wait for progress to load from Supabase/Local
      if (!isLoaded) return;

      // 1. Progress Check (must complete previous lesson)
      if (!isLessonUnlocked(groupId, lessonId)) {
        router.push(`/games/learn-numbers/${groupId}`);
        return;
      }

      // 2. Freemium Check (must be free or premium)
      const access = await checkAccess("learn-numbers", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-numbers/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-numbers/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/learn-numbers/${groupId}`);
        return;
      }

      setIsCheckingAccess(false);
    };

    runAccessCheck();
  }, [isLoaded, groupId, lessonId, isLessonUnlocked, checkAccess, showPaywall, router]);

  if (!range || !groupId || !lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  // Group4 has only 2 lessons, others have 4
  const LESSON_ORDER = groupId === "group4" ? ["lesson1", "lesson2"] : ["lesson1", "lesson2", "lesson3", "lesson4"];
  const GROUPS_ORDER = ["group1", "group2", "group3", "group4"];

  const handleComplete = () => {
    markLessonComplete(groupId, lessonId, "learn-numbers");

    // Determine next step
    const currentIdx = LESSON_ORDER.indexOf(lessonId);
    // Display numbers: lesson1 -> 1, lesson2 -> 2, etc.
    setCurrentLessonNum(currentIdx + 1);

    if (currentIdx < LESSON_ORDER.length - 1) {
      // Has next lesson
      setNextLessonNum(currentIdx + 2);
      setIsGroupDone(false);
    } else {
      // Last lesson of group
      setIsGroupDone(true);
      // Next is next group?
      const groupIdx = GROUPS_ORDER.indexOf(groupId);
      if (groupIdx < GROUPS_ORDER.length - 1) {
        setNextLessonNum(groupIdx + 2); // "Nhóm 2"
      } else {
        setNextLessonNum(null); // All done
      }
    }

    setShowModal(true);
  };

  const handleNextLesson = async () => {
    setShowModal(false);
    const currentIdx = LESSON_ORDER.indexOf(lessonId);

    if (currentIdx < LESSON_ORDER.length - 1) {
      const nextLessonId = LESSON_ORDER[currentIdx + 1];

      // Check access before navigating to next lesson
      const access = await checkAccess("learn-numbers", groupId, nextLessonId);

      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-numbers/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-numbers/${groupId}/lesson/${nextLessonId}`);
        }
        // Navigate back to group page instead of staying on completed lesson
        router.push(`/games/learn-numbers/${groupId}`);
        return;
      }

      router.push(`/games/learn-numbers/${groupId}/lesson/${nextLessonId}`);
    } else {
      // Group complete
      // Always back to menu
      router.push(`/games/learn-numbers`);
    }
  };

  let Content = null;
  let title = "";

  // Group4 has different lesson mapping (lesson1=Quiz, lesson2=Counting)
  if (groupId === "group4") {
    switch (lessonId) {
      case "lesson1":
        title = "Số nào đúng?";
        Content = <QuizLesson range={range} onComplete={handleComplete} requiredWins={12} />;
        break;
      case "lesson2":
        title = "Đếm và chọn";
        Content = <CountingLesson range={range} onComplete={handleComplete} requiredWins={12} />;
        break;
      default:
        Content = <div>Unknown Lesson</div>;
    }
  } else {
    // Regular groups (1-3)
    switch (lessonId) {
      case "lesson1":
        title = `Học số ${range[0]} - ${range[1]}`;
        Content = <LearnLesson range={range} onComplete={handleComplete} />;
        break;
      case "lesson2":
        title = "Số nào đúng?";
        Content = <QuizLesson range={range} onComplete={handleComplete} />;
        break;
      case "lesson3":
        title = "Đếm và chọn";
        Content = <CountingLesson range={range} onComplete={handleComplete} />;
        break;
      case "lesson4":
        title = "Tập viết số";
        Content = <WritingLesson range={range} onComplete={handleComplete} />;
        break;
      default:
        Content = <div>Unknown Lesson</div>;
    }
  }

  if (!isLoaded || isCheckingAccess) {
    return (
      <GameLayout title="" backTo={`/games/learn-numbers/${groupId}`} showBackButton={true}>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-orange-600 font-bold">Đang kiểm tra quyền truy cập...</p>
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout title={title} backTo={`/games/learn-numbers/${groupId}`}>
      <main className="flex flex-col items-center justify-center w-full min-h-[60vh]">{Content}</main>

      <CompletionModal
        isOpen={showModal}
        onNext={handleNextLesson}
        currentLessonNum={isGroupDone ? groupId.replace("group", "") : currentLessonNum}
        nextLessonNum={nextLessonNum ?? undefined}
        isGroupComplete={isGroupDone}
      />
    </GameLayout>
  );
}
