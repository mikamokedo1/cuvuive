"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { CompletionModal } from "@/components/games/CompletionModal";
import { GROUPS, MIXING_RULES } from "@/features/games/mix-color/constants";
import { MixColorLearnLesson } from "@/features/games/mix-color/MixColorLearnLesson";
import { MixColorQuizLesson } from "@/features/games/mix-color/MixColorQuizLesson";
import { MixColorReverseQuizLesson } from "@/features/games/mix-color/MixColorReverseQuizLesson";
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
      if (!isLessonUnlocked(groupId, lessonId, "mix-color")) {
        router.push(`/games/mix-color/${groupId}`);
        return;
      }

      // 2. Freemium Check
      const access = await checkAccess("mix-color", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/mix-color/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/mix-color/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/mix-color/${groupId}`);
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
    markLessonComplete(groupId, lessonId, "mix-color");

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

      const access = await checkAccess("mix-color", groupId, nextLessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/mix-color/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/mix-color/${groupId}/lesson/${nextLessonId}`);
        }
        router.push(`/games/mix-color/${groupId}`);
        return;
      }

      router.push(`/games/mix-color/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/mix-color`);
    }
  };

  if (!isLoaded || isCheckingAccess) {
    return <CheckingPermission path={`/games/mix-color/${groupId}`} />;
  }

  let title = "";
  switch (lessonId) {
    case "lesson1":
      title = "Học pha màu";
      break;
    case "lesson2":
      title = "Pha màu nào?";
      break;
    case "lesson3":
      title = "Thử thách pha màu";
      break;
    default:
      title = "Bài học";
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
  const groupRules = MIXING_RULES.filter((r) => group.rules.includes(r.id));

  // Determine required wins based on group and lesson
  // group3 has more rules (practice all) so requires more wins
  const requireWins = groupId === "group3" ? 6 : 4;

  let Content = null;

  if (lessonId === "lesson1") {
    Content = <MixColorLearnLesson rules={groupRules} onComplete={onComplete} />;
  } else if (lessonId === "lesson2") {
    Content = <MixColorQuizLesson rules={groupRules} onComplete={onComplete} requiredWins={requireWins} />;
  } else if (lessonId === "lesson3") {
    Content = <MixColorReverseQuizLesson rules={groupRules} onComplete={onComplete} requiredWins={requireWins} />;
  } else {
    Content = <div>Bài học không hợp lệ</div>;
  }

  return (
    <GameLayout title={title} backTo={`/games/mix-color/${groupId}`}>
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
