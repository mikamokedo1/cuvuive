"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { CompletionModal } from "@/components/games/CompletionModal";
import { GROUPS } from "@/features/games/odd-one-out/constants";
import { OddOneOutBoard } from "@/features/games/odd-one-out/OddOneOutBoard";
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

  const LESSON_ORDER = ["lesson1"];

  useEffect(() => {
    const runAccessCheck = async () => {
      if (!isLoaded) return;

      if (!isLessonUnlocked(groupId, lessonId, "odd-one-out")) {
        router.push(`/games/odd-one-out/${groupId}`);
        return;
      }

      const access = await checkAccess("odd-one-out", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/odd-one-out/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/odd-one-out/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/odd-one-out/${groupId}`);
        return;
      }

      setIsCheckingAccess(false);
    };

    runAccessCheck();
  }, [isLoaded, groupId, lessonId, isLessonUnlocked, checkAccess, showPaywall, router]);

  if (!group || !lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const handleComplete = () => {
    markLessonComplete(groupId, lessonId, "odd-one-out");

    setCurrentLessonNum(1);
    setIsGroupDone(true);
    setNextLessonNum(null);
    setShowModal(true);
  };

  const handleNextLesson = async () => {
    setShowModal(false);
    router.push(`/games/odd-one-out`);
  };

  if (!isLoaded || isCheckingAccess) {
    return <CheckingPermission path={`/games/odd-one-out/${groupId}`} />;
  }

  const renderLesson = () => {
    if (lessonId === "lesson1") {
      return <OddOneOutBoard groupId={groupId} onComplete={handleComplete} />;
    }
    return <div>Lesson not found</div>;
  };

  return (
    <GameLayout backTo={`/games/odd-one-out/${groupId}`} title={group.title}>
      <main>{renderLesson()}</main>

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
