"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { CompletionModal } from "@/components/games/CompletionModal";
import { GROUPS } from "@/features/games/paint-picture/constants";
import { FreeColorLesson } from "@/features/games/paint-picture/FreeColorLesson";
import { AIPaintLesson } from "@/features/games/paint-picture/AIPaintLesson";
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

      if (!isLessonUnlocked(groupId, lessonId, "paint-picture")) {
        router.push(`/games/paint-picture/${groupId}`);
        return;
      }

      const access = await checkAccess("paint-picture", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/paint-picture/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/paint-picture/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/paint-picture/${groupId}`);
        return;
      }

      setIsCheckingAccess(false);
    };

    runAccessCheck();
  }, [isLoaded, groupId, lessonId, isLessonUnlocked, checkAccess, showPaywall, router]);

  if (!group || !lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const LESSON_ORDER = ["lesson1", "lesson2"];

  const handleComplete = () => {
    markLessonComplete(groupId, lessonId, "paint-picture");

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

      const access = await checkAccess("paint-picture", groupId, nextLessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/paint-picture/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/paint-picture/${groupId}/lesson/${nextLessonId}`);
        }
        router.push(`/games/paint-picture/${groupId}`);
        return;
      }

      router.push(`/games/paint-picture/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/paint-picture`);
    }
  };

  if (!isLoaded || isCheckingAccess) {
    return <CheckingPermission path={`/games/paint-picture/${groupId}`} />;
  }

  let title = "";
  switch (lessonId) {
    case "lesson1":
      title = "Tô tự do";
      break;
    case "lesson2":
      title = "Hoạ Khám Phá";
      break;
    default:
      title = "Bài học";
  }

  return (
    <LessonPageContent
      groupId={groupId}
      lessonId={lessonId}
      title={title}
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
  title,
  onComplete,
  showModal,
  handleNextLesson,
  currentLessonNum,
  nextLessonNum,
  isGroupDone,
}: {
  groupId: string;
  lessonId: string;
  title: string;
  onComplete: () => void;
  showModal: boolean;
  handleNextLesson: () => void;
  currentLessonNum: number | string;
  nextLessonNum: number | string | null;
  isGroupDone: boolean;
}) {
  let Content = null;

  if (lessonId === "lesson1") {
    Content = <FreeColorLesson groupId={groupId} onComplete={onComplete} />;
  } else if (lessonId === "lesson2") {
    Content = <AIPaintLesson groupId={groupId} onComplete={onComplete} />;
  } else {
    Content = <div>Bài học không hợp lệ</div>;
  }

  return (
    <GameLayout title={title} backTo={`/games/paint-picture/${groupId}`}>
      <main>{Content}</main>

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
