"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { CompletionModal } from "@/components/games/CompletionModal";
import { GROUPS, SHAPES } from "@/features/games/learn-shape/constants";
import { ShapeLearnLesson } from "@/features/games/learn-shape/ShapeLearnLesson";
import { ShapeQuizLesson } from "@/features/games/learn-shape/ShapeQuizLesson";
import { ShapeMatchLesson } from "@/features/games/learn-shape/ShapeMatchLesson";
import { ShapePaintLesson } from "@/features/games/learn-shape/ShapePaintLesson";
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
      if (!isLessonUnlocked(groupId, lessonId, "learn-shape")) {
        router.push(`/games/learn-shape/${groupId}`);
        return;
      }

      // 2. Freemium Check
      const access = await checkAccess("learn-shape", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-shape/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-shape/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/learn-shape/${groupId}`);
        return;
      }

      setIsCheckingAccess(false);
    };

    runAccessCheck();
  }, [isLoaded, groupId, lessonId, isLessonUnlocked, checkAccess, showPaywall, router]);

  if (!group || !lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  // Define lesson order (group3 has only 3 lessons, group1 and group2 have 4)
  const LESSON_ORDER =
    groupId === "group3" ? ["lesson1", "lesson2", "lesson3"] : ["lesson1", "lesson2", "lesson3", "lesson4"];

  const handleComplete = () => {
    markLessonComplete(groupId, lessonId, "learn-shape");

    const currentIdx = LESSON_ORDER.indexOf(lessonId);
    setCurrentLessonNum(currentIdx + 1);

    if (currentIdx < LESSON_ORDER.length - 1) {
      setNextLessonNum(currentIdx + 2);
      setIsGroupDone(false);
    } else {
      setIsGroupDone(true);
      setNextLessonNum(null);
    }

    setShowModal(true);
  };

  const handleNextLesson = async () => {
    setShowModal(false);
    const currentIdx = LESSON_ORDER.indexOf(lessonId);

    if (currentIdx < LESSON_ORDER.length - 1) {
      const nextLessonId = LESSON_ORDER[currentIdx + 1];

      const access = await checkAccess("learn-shape", groupId, nextLessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-shape/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-shape/${groupId}/lesson/${nextLessonId}`);
        }
        router.push(`/games/learn-shape/${groupId}`);
        return;
      }

      router.push(`/games/learn-shape/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/learn-shape`);
    }
  };

  if (!isLoaded || isCheckingAccess) {
    return <CheckingPermission path={`/games/learn-shape/${groupId}`} />;
  }

  return (
    <LessonPageContent
      groupId={groupId}
      lessonId={lessonId}
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

function LessonPageContent({
  groupId,
  lessonId,
  group,
  onComplete,
  showModal,
  handleNextLesson,
  currentLessonNum,
  nextLessonNum,
  isGroupDone,
}: any) {
  const groupShapes = SHAPES.filter((s) => group.shapes.includes(s.id));
  const requireWins = groupId === "group3" ? 10 : 5;

  let Content = null;
  let displayTitle = "";

  if (lessonId === "lesson1") {
    displayTitle = "Học hình dạng";
    Content = <ShapeLearnLesson shapes={groupShapes} onComplete={onComplete} />;
  } else if (lessonId === "lesson2") {
    displayTitle = "Tìm hình giống";
    Content = <ShapeQuizLesson shapes={groupShapes} onComplete={onComplete} requiredWins={requireWins} />;
  } else if (lessonId === "lesson3") {
    displayTitle = "Vật gì hình gì?";
    Content = <ShapeMatchLesson shapes={groupShapes} onComplete={onComplete} requiredWins={requireWins} />;
  } else if (lessonId === "lesson4") {
    displayTitle = "Vẽ hình";
    Content = <ShapePaintLesson shapes={groupShapes} onComplete={onComplete} />;
  } else {
    Content = <div>Bài học không hợp lệ</div>;
  }

  return (
    <GameLayout title={displayTitle} backTo={`/games/learn-shape/${groupId}`}>
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
