"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { CompletionModal } from "@/components/games/CompletionModal";
import { GROUPS, COLORS } from "@/features/games/learn-color/constants";
import { ColorLearnLesson } from "@/features/games/learn-color/ColorLearnLesson";
import { ColorQuizLesson } from "@/features/games/learn-color/ColorQuizLesson";
import { ColorImageMatchLesson } from "@/features/games/learn-color/ColorImageMatchLesson";
import { CheckingPermission } from "@/components/common/CheckingPermission";

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

  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const lessonId = typeof params.lessonId === "string" ? params.lessonId : "";

  const group = GROUPS.find((g) => g.id === groupId);

  useEffect(() => {
    const runAccessCheck = async () => {
      if (!isLoaded) return;

      // 1. Progress Check
      if (!isLessonUnlocked(groupId, lessonId, "learn-color")) {
        router.push(`/games/learn-color/${groupId}`);
        return;
      }

      // 2. Freemium Check
      const access = await checkAccess("learn-color", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-color/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-color/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/learn-color/${groupId}`);
        return;
      }

      setIsCheckingAccess(false);
    };

    runAccessCheck();
  }, [isLoaded, groupId, lessonId, isLessonUnlocked, checkAccess, showPaywall, router]);

  if (!group || !lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  // Define lesson order
  const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

  const handleComplete = () => {
    markLessonComplete(groupId, lessonId, "learn-color");

    const currentIdx = LESSON_ORDER.indexOf(lessonId);
    setCurrentLessonNum(currentIdx + 1);

    if (currentIdx < LESSON_ORDER.length - 1) {
      setNextLessonNum(currentIdx + 2);
      setIsGroupDone(false);
    } else {
      setIsGroupDone(true);
      // Next group logic could be added here
      setNextLessonNum(null);
    }

    setShowModal(true);
  };

  const handleNextLesson = async () => {
    setShowModal(false);
    const currentIdx = LESSON_ORDER.indexOf(lessonId);

    if (currentIdx < LESSON_ORDER.length - 1) {
      const nextLessonId = LESSON_ORDER[currentIdx + 1];

      const access = await checkAccess("learn-color", groupId, nextLessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-color/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-color/${groupId}/lesson/${nextLessonId}`);
        }
        router.push(`/games/learn-color/${groupId}`);
        return;
      }

      router.push(`/games/learn-color/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/learn-color`);
    }
  };

  if (!isLoaded || isCheckingAccess) {
    return <CheckingPermission path={`/games/learn-color/${groupId}`} />;
  }

  let Content = null;
  let title = "";

  // Filter colors for this group
  // Assume group.colors contains color IDs
  // Implementation note: we need to map IDs to actual ColorData objects.
  // IMPORT COLORS from constants needed.
  // Actually, I should import COLORS in this file too.

  // Wait, I didn't import COLORS in the top block, I only imported GROUPS.
  // I need to import COLORS.

  // Re-map colors
  // const groupColors = COLORS.filter(c => group.colors.includes(c.id));

  // Since I can't edit the file content inside this `CodeContent` block dynamically (I'm writing it now),
  // I will write the component logic properly assuming imports are present.

  // BUT I need to fetch the COLORS data.
  // I will assume I imported it. (I will add it to the import list).

  switch (lessonId) {
    case "lesson1":
      title = "Học màu sắc";
      // We need to resolve colors.
      // Since I can't do complex logic outside component easily without double importing or such,
      // I'll do it inside.
      break;
    case "lesson2":
      title = "Màu nào đúng?";
      break;
    default:
      Content = <div>Unknown Lesson</div>;
  }

  return (
    <LessonPageContent
      groupId={groupId}
      lessonId={lessonId}
      title={title}
      group={group}
      onComplete={handleComplete}
      showModal={showModal}
      handleNextLesson={handleNextLesson}
      currentLessonNum={currentLessonNum}
      nextLessonNum={nextLessonNum}
      isGroupDone={isGroupDone}
    />
  );
}

// Separate component to handle the content logic cleanly
// COLORS imported at top

function LessonPageContent({
  groupId,
  lessonId,
  title,
  group,
  onComplete,
  showModal,
  handleNextLesson,
  currentLessonNum,
  nextLessonNum,
  isGroupDone,
}: any) {
  const groupColors = COLORS.filter((c) => group.colors.includes(c.id));

  const requireWins = groupId === "group3" ? 12 : groupId === "group1" ? 6 : 8;

  let Content = null;
  let displayTitle = title;

  if (lessonId === "lesson1") {
    displayTitle = "Học màu sắc";
    Content = <ColorLearnLesson colors={groupColors} onComplete={onComplete} />;
  } else if (lessonId === "lesson2") {
    displayTitle = "Tìm màu giống";
    Content = <ColorQuizLesson colors={groupColors} onComplete={onComplete} requiredWins={requireWins} />;
  } else if (lessonId === "lesson3") {
    displayTitle = "Hình gì màu gì?";
    Content = <ColorImageMatchLesson colors={groupColors} onComplete={onComplete} requiredWins={requireWins} />;
  } else {
    Content = <div>Bài học không hợp lệ</div>;
  }

  return (
    <GameLayout title={displayTitle} backTo={`/games/learn-color/${groupId}`}>
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
