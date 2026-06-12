"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { X } from "lucide-react";
import { ActionButton } from "@/components/common/ActionButton";
import { updateUserStreakAction, getUserWeeklyActivityAction } from "@/libs/actions/user";
import { useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { Streak } from "../games/Streak";

export function WelcomeBackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const [activeDays, setActiveDays] = useState<number[]>([]);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasCheckedRef = useRef(false);
  const router = useRouter();
  const { allProgress } = useProgress();

  const activeGameLink = useMemo(() => {
    const startedCourseId = Object.keys(allProgress).find((courseId) => {
      const p = allProgress[courseId];
      if (!p || !p.completedLessons) return false;
      return Object.values(p.completedLessons).some((lessons) => lessons.length > 0);
    });
    return startedCourseId ? `/games/${startedCourseId}` : "/games";
  }, [allProgress]);

  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    async function checkStreak() {
      try {
        // Parallel fetching
        const [streakResult, weeklyActivity] = await Promise.all([
          updateUserStreakAction(),
          getUserWeeklyActivityAction(),
        ]);

        setStreak(streakResult.currentStreak);
        setActiveDays(weeklyActivity);
        setIsFirstTime(streakResult.isFirstTime ?? false);

        if (streakResult.streakUpdated) {
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Failed to check streak:", error);
      } finally {
        setLoading(false);
      }
    }
    checkStreak();
  }, []);

  if (loading || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60">
      <div className="relative w-full max-w-md rounded-3xl p-8 border-4 border-yellow-300 shadow-xl bg-[#FFF4E0] text-center flex flex-col items-center animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsOpen(false)}
          className="cursor-pointer absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-500 hover:text-gray-700"
          aria-label="Đóng"
        >
          <X size={18} strokeWidth={3} />
        </button>

        <div className="text-[80px] leading-none mb-6 origin-bottom animate-bounce drop-shadow-lg">🔥</div>

        <h2 className="text-3xl font-black text-gray-800 font-display mb-2">
          {isFirstTime ? "Bé bắt đầu hành trình!" : "Chào mừng bé quay lại!"}
        </h2>

        <p className="text-gray-500 font-medium mb-6">
          {isFirstTime
            ? "Hãy bắt đầu chuỗi học tập ngay nhé!"
            : streak <= 1
              ? "Hãy học hành chăm chỉ nhé."
              : streak === 2
                ? "Chuỗi học tập của bé đang rất tuyệt!"
                : "Đừng bỏ lỡ chuỗi nhé!"}
        </p>

        <div className="mb-4">
          <Streak activeDays={activeDays} />
        </div>

        <ActionButton
          variant="glossy"
          color="orange"
          className="w-full text-xl py-6"
          onClick={() => {
            setIsOpen(false);
            router.push(activeGameLink);
          }}
        >
          {isFirstTime ? "Bắt đầu học ngay" : "Tiếp tục học ngay"}
        </ActionButton>
      </div>
    </div>
  );
}
