"use client";

import { useEffect, useState } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { updateUserStreakAction, getUserWeeklyActivityAction } from "@/libs/actions/user";
import { useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { useMemo } from "react";
import { Check } from "lucide-react";
import { DAYS_OF_WEEK } from "@/libs/constants/dayOfWeek";

export function WelcomeBackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const [activeDays, setActiveDays] = useState<number[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [loading, setLoading] = useState(true);
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
    async function checkStreak() {
      try {
        setCurrentDayIndex(new Date().getDay());

        // Parallel fetching
        const [streakResult, weeklyActivity] = await Promise.all([
          updateUserStreakAction(),
          getUserWeeklyActivityAction(),
        ]);

        setStreak(streakResult.currentStreak);
        setActiveDays(weeklyActivity);

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
        <div className="text-[80px] leading-none mb-6 origin-bottom animate-bounce drop-shadow-lg">🔥</div>

        <h2 className="text-3xl font-black text-gray-800 font-display mb-2">Chào mừng bé quay lại!</h2>

        <p className="text-gray-500 font-medium mb-6">
          {streak <= 1
            ? "Hãy học hành chăm chỉ nhé."
            : streak === 2
              ? "Chuỗi học tập của bé đang rất tuyệt!"
              : "Đừng bỏ lỡ chuỗi nhé!"}
        </p>

        <div className="flex justify-between w-full px-2 mb-8 mt-2">
          {DAYS_OF_WEEK.map((day) => {
            const isActive = activeDays.includes(day.index);
            const isToday = day.index === currentDayIndex;

            return (
              <div key={day.label} className="flex flex-col items-center gap-2">
                <span className={`text-sm font-bold ${isToday ? "text-orange-500" : "text-gray-400"}`}>
                  {day.label}
                </span>
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
                    isActive ? "bg-[#FF9800] text-white shadow-md shadow-orange-200" : "bg-gray-200 text-transparent"
                  }`}
                >
                  <Check size={24} strokeWidth={4} />
                </div>
              </div>
            );
          })}
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
          Tiếp tục học ngay
        </ActionButton>
      </div>
    </div>
  );
}
