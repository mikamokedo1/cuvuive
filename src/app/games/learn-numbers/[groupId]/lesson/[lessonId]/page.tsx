"use client";

import { useState } from "react";
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
  const { markLessonComplete } = useProgress();
  const { checkAccess, showPaywall } = useAccess();

  const [showModal, setShowModal] = useState(false);
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
  };

  const range = groupRanges[groupId];

  if (!range || !groupId || !lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const LESSON_ORDER = ["lesson1", "lesson2", "lesson3", "lesson4"];
  const GROUPS_ORDER = ["group1", "group2", "group3"];

  const handleComplete = () => {
    markLessonComplete(groupId, lessonId);

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
      // Check if next group exists
      const groupIdx = GROUPS_ORDER.indexOf(groupId);
      if (groupIdx < GROUPS_ORDER.length - 1) {
        const nextGroupId = GROUPS_ORDER[groupIdx + 1];

        // Check access for next group's first lesson
        const access = await checkAccess("learn-numbers", nextGroupId, "lesson1");

        if (!access.userHasAccess) {
          if (access.reason === "not_logged_in") {
            showPaywall("login", `/games/learn-numbers/${nextGroupId}/lesson/lesson1`);
          } else if (access.reason === "premium_required") {
            showPaywall("premium", `/games/learn-numbers/${nextGroupId}/lesson/lesson1`);
          }
          router.push(`/games/learn-numbers`);
          return;
        }

        router.push(`/games/learn-numbers/${nextGroupId}`);
      } else {
        // Back to menu
        router.push(`/games/learn-numbers`);
      }
    }
  };

  let Content = null;
  let title = "";

  // Switch based on lessonId
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

  return (
    <GameLayout title={title} backTo={`/games/learn-numbers/${groupId}`}>
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh]">{Content}</div>

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
