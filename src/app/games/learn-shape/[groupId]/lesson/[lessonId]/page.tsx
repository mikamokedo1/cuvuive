"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { GROUPS, SHAPES } from "@/features/games/learn-shape/constants";
import { ShapeLearnLesson } from "@/features/games/learn-shape/ShapeLearnLesson";
import { ShapeQuizLesson } from "@/features/games/learn-shape/ShapeQuizLesson";
import { ShapeMatchLesson } from "@/features/games/learn-shape/ShapeMatchLesson";
import { ShapePaintLesson } from "@/features/games/learn-shape/ShapePaintLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

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

  const groupShapes = SHAPES.filter((s) => group.shapes.includes(s.id));
  const requireWins = groupId === "group3" ? 10 : 5;

  let LessonContent = null;
  let displayTitle = "";

  if (lessonId === "lesson1") {
    displayTitle = "Học hình dạng";
    LessonContent = (
      <main>
        <ShapeLearnLesson shapes={groupShapes} onComplete={handleComplete} />
      </main>
    );
  } else if (lessonId === "lesson2") {
    displayTitle = "Tìm hình giống";
    LessonContent = (
      <main>
        <ShapeQuizLesson shapes={groupShapes} onComplete={handleComplete} requiredWins={requireWins} />
      </main>
    );
  } else if (lessonId === "lesson3") {
    displayTitle = "Vật gì hình gì?";
    LessonContent = (
      <main>
        <ShapeMatchLesson shapes={groupShapes} onComplete={handleComplete} requiredWins={requireWins} />
      </main>
    );
  } else if (lessonId === "lesson4") {
    displayTitle = "Vẽ hình";
    LessonContent = (
      <main>
        <ShapePaintLesson shapes={groupShapes} onComplete={handleComplete} />
      </main>
    );
  }

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={displayTitle}
      groupId={groupId}
      gameSlug="learn-shape"
      showModal={showModal}
      handleNextLesson={handleNextLesson}
      currentLessonNum={currentLessonNum}
      nextLessonNum={nextLessonNum}
      isGroupDone={isGroupDone}
      isLoaded={isLoaded}
      isCheckingAccess={isCheckingAccess}
    />
  );
}
