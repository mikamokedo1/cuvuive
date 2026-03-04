"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { GROUPS, getItemsForGroup } from "@/features/games/learn-weather/constants";
import { WeatherLearnLesson } from "@/features/games/learn-weather/WeatherLearnLesson";
import { WeatherSpeakingLesson } from "@/features/games/learn-weather/WeatherSpeakingLesson";
import { WeatherQuizLesson } from "@/features/games/learn-weather/WeatherQuizLesson";
import { WeatherMemoryLesson } from "@/features/games/learn-weather/WeatherMemoryLesson";
import { SeasonClothingLesson } from "@/features/games/learn-weather/SeasonClothingLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

export default function WeatherLessonPage() {
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

  // Lesson order depends on group (group 3 has 5 lessons)
  const LESSON_ORDER =
    group?.id === "group3"
      ? ["lesson1", "lesson2", "lesson3", "lesson4", "lesson5"]
      : ["lesson1", "lesson2", "lesson3", "lesson4"];

  useEffect(() => {
    const runAccessCheck = async () => {
      if (!isLoaded) return;

      // 1. Progress Check
      if (!isLessonUnlocked(groupId, lessonId, "learn-weather")) {
        router.push(`/games/learn-weather/${groupId}`);
        return;
      }

      // 2. Freemium Check
      const access = await checkAccess("learn-weather", groupId, lessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-weather/${groupId}/lesson/${lessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-weather/${groupId}/lesson/${lessonId}`);
        }
        router.push(`/games/learn-weather/${groupId}`);
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
    markLessonComplete(groupId, lessonId, "learn-weather");

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

      const access = await checkAccess("learn-weather", groupId, nextLessonId);
      if (!access.userHasAccess) {
        if (access.reason === "not_logged_in") {
          showPaywall("login", `/games/learn-weather/${groupId}/lesson/${nextLessonId}`);
        } else if (access.reason === "premium_required") {
          showPaywall("premium", `/games/learn-weather/${groupId}/lesson/${nextLessonId}`);
        }
        router.push(`/games/learn-weather/${groupId}`);
        return;
      }

      router.push(`/games/learn-weather/${groupId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/games/learn-weather`);
    }
  };

  const items = getItemsForGroup(groupId);

  const renderLesson = () => {
    switch (lessonId) {
      case "lesson1":
        return <WeatherLearnLesson items={items} onComplete={handleComplete} />;
      case "lesson2":
        return <WeatherSpeakingLesson items={items} onComplete={handleComplete} />;
      case "lesson3":
        return <WeatherQuizLesson items={items} onComplete={handleComplete} />;
      case "lesson4":
        return <WeatherMemoryLesson items={items} onComplete={handleComplete} />;
      case "lesson5":
        if (groupId === "group3") {
          return <SeasonClothingLesson seasons={items} onComplete={handleComplete} />;
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <GameWrapGame
      LessonContent={<main>{renderLesson()}</main>}
      LessonTitle={group.title}
      groupId={groupId}
      gameSlug="learn-weather"
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
