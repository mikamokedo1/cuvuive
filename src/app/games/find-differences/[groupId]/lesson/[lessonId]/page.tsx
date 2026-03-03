"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { CompletionModal } from "@/components/games/CompletionModal";
import { CheckingPermission } from "@/components/common/CheckingPermission";
import { FIND_DIFFERENCES_DATA } from "@/features/games/find-differences/constans";
import { DifferenceBoard } from "@/features/games/find-differences/DifferenceBoard";
import { playSound } from "@/libs/utils/playSound";

export default function FDLessonPage() {
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

  const group = FIND_DIFFERENCES_DATA.find((g) => g.id === groupId);
  const lesson = group?.lessons.find((l) => l.id === lessonId);
  const LESSON_ORDER = group?.lessons.map((l) => l.id) || [];

  useEffect(() => {
    const runAccessCheck = async () => {
      if (!isLoaded) return;

      if (!isLessonUnlocked(groupId, lessonId, "find-differences")) {
        router.push(`/games/find-differences/${groupId}`);
        return;
      }

      const access = await checkAccess("find-differences", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/find-differences/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/find-differences/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/find-differences/${groupId}`);
        return;
      }

      setIsCheckingAccess(false);
    };

    runAccessCheck();
  }, [isLoaded, groupId, lessonId, isLessonUnlocked, checkAccess, showPaywall, router]);

  if (!group || !lesson || !lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const handleAllFound = () => {
    playSound("/sounds/correct.mp3");
    markLessonComplete(groupId, lessonId, "find-differences");

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

      const access = await checkAccess("find-differences", groupId, nextLessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/find-differences/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/find-differences/${groupId}/lesson/${nextLessonId}`);
        }
        router.push(`/games/find-differences/${groupId}`);
        return;
      }

      router.push(`/games/find-differences/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/find-differences`);
    }
  };

  if (!isLoaded || isCheckingAccess) {
    return <CheckingPermission path={`/games/find-differences/${groupId}`} />;
  }

  return (
    <GameLayout backTo={`/games/find-differences/${groupId}`} title={lesson.title}>
      <main className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 py-8">
        <DifferenceBoard
          originalImage={lesson.originalImage}
          modifiedImage={lesson.modifiedImage}
          differences={lesson.differences}
          onFoundDifference={() => playSound("/sounds/correct.mp3")}
          onWrongClick={() => playSound("/sounds/wrong.mp3")}
          onAllFound={handleAllFound}
        />
      </main>

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
