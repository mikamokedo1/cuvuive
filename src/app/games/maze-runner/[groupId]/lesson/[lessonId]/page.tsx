"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { CompletionModal } from "@/components/games/CompletionModal";
import { GROUPS } from "@/features/games/maze-runner/constants";
import { MazeBoard } from "@/features/games/maze-runner/MazeBoard";
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

      if (!isLessonUnlocked(groupId, lessonId, "maze-runner")) {
        router.push(`/games/maze-runner/${groupId}`);
        return;
      }

      const access = await checkAccess("maze-runner", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/maze-runner/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/maze-runner/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/maze-runner/${groupId}`);
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
    markLessonComplete(groupId, lessonId, "maze-runner");

    setCurrentLessonNum(1);
    setIsGroupDone(true);
    setNextLessonNum(null);
    setShowModal(true);
  };

  const handleNextLesson = async () => {
    setShowModal(false);
    router.push(`/games/maze-runner`);
  };

  if (!isLoaded || isCheckingAccess) {
    return <CheckingPermission path={`/games/maze-runner/${groupId}`} />;
  }

  const renderLesson = () => {
    if (lessonId === "lesson1") {
      return <MazeBoard groupId={groupId} onComplete={handleComplete} />;
    }
    return <div>Lesson not found</div>;
  };

  return (
    <GameLayout backTo={`/games/maze-runner/${groupId}`} title={group.title}>
      <main className="flex flex-col items-center justify-center min-h-[60vh] w-full">{renderLesson()}</main>

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
