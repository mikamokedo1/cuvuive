"use client";

import { useState, useMemo } from "react";
import { StatsOverview } from "./StatsOverview";
import { ProgressChart } from "./ProgressChart";
import { CategoryAnalysis } from "./CategoryAnalysis";
import { StrengthsWeaknesses } from "./StrengthsWeaknesses";
import { SkillsRadarChart } from "./SkillsRadarChart";
import type { DashboardStats, CategoryStat, LessonSuggestion } from "@/libs/actions/dashboard";
import type { CourseDef } from "@/libs/actions/courses";
import Header from "@/components/layout/Header";
import Link from "next/link";
import Image from "next/image";
import { ActionButton } from "@/components/common/ActionButton";
import { useUser } from "@/context/UserContext";
import { useProgress } from "@/context/ProgressContext";
import { CourseCard } from "@/features/profile/CourseCard";
import { UserProfileHeader } from "@/features/profile/UserProfileHeader";
import { COURSES } from "@/libs/constants/courses";
import { GROUPS, GameGroupType } from "@/libs/constants/groups";
import { BarChart2, GraduationCap } from "lucide-react";

// Build a static map: courseId → category type
const COURSE_TYPE_MAP: Record<string, GameGroupType> = {};
COURSES.forEach((c) => {
  COURSE_TYPE_MAP[c.id] = c.type;
});

interface ParentDashboardViewProps {
  todayStats: DashboardStats | null;
  yesterdayStats: DashboardStats | null;
  weekStats: DashboardStats | null;
  monthStats: DashboardStats | null;
  categoryAnalysis: CategoryStat[];
  suggestions: LessonSuggestion[];
  courses: CourseDef[];
  currentStreak: number;
  activeDays: number[];
}

export function ParentDashboardView({
  todayStats,
  yesterdayStats,
  weekStats,
  monthStats,
  categoryAnalysis,
  suggestions,
  courses,
  currentStreak,
  activeDays,
}: ParentDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<"stats" | "progress">("stats");
  const [period, setPeriod] = useState<"today" | "yesterday" | "week" | "month">("week");
  const { user, isPremium } = useUser();
  const { allProgress } = useProgress();

  let stats = weekStats;
  if (period === "today") stats = todayStats;
  else if (period === "yesterday") stats = yesterdayStats;
  else if (period === "month") stats = monthStats;

  const kidName = user?.user_metadata?.kidName || "Bé";

  // --- Progress tab logic (from old ProfileView) ---
  const { startedCourses, userLevel } = useMemo(() => {
    let completedCoursesCount = 0;
    const started = courses.filter((course) => {
      const progress = allProgress[course.id];
      if (!progress) return false;
      const hasStarted = Object.values(progress.completedLessons).some((lessons) => lessons.length > 0);
      if (hasStarted) {
        const totalLessons = course.groups.reduce((sum, g) => sum + g.lessons.length, 0);
        const completedLessons = course.groups.reduce((sum, g) => {
          const done = progress.completedLessons[g.id] || [];
          return sum + done.length;
        }, 0);
        if (totalLessons > 0 && completedLessons >= totalLessons) completedCoursesCount++;
      }
      return hasStarted;
    });
    return { startedCourses: started, userLevel: 1 + completedCoursesCount };
  }, [courses, allProgress]);

  const groupedByCategory = useMemo(() => {
    const grouped: Record<string, CourseDef[]> = {};
    startedCourses.forEach((course) => {
      const type = COURSE_TYPE_MAP[course.id] || "other";
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push(course);
    });
    const ordered: { type: GameGroupType; title: string; icon: string; courses: CourseDef[] }[] = [];
    GROUPS.forEach((group) => {
      if (grouped[group.id]) {
        ordered.push({
          type: group.id,
          title: group.title,
          icon: typeof group.icon === "string" ? group.icon : "",
          courses: grouped[group.id],
        });
      }
    });
    return ordered;
  }, [startedCourses]);
  // --- end Progress tab logic ---

  if (!user) {
    return (
      <main className="min-h-screen bg-[#F0F7FF] flex flex-col py-6 px-4">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-500 mb-6">Vui lòng đăng nhập để xem thống kê học tập.</p>
            <Link href="/auth/login">
              <ActionButton variant="glossy" color="orange">
                Đăng nhập ngay
              </ActionButton>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F0F7FF] py-6 px-4">
      <Header />

      <div className="container mx-auto max-w-5xl pt-4">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-black text-blue-500 font-[family-name:var(--font-baloo-2)]">
            Góc Phụ Huynh — <span className="text-orange-500">{kidName}</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Theo dõi hành trình học tập và phát triển của bé mỗi ngày</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm w-fit">
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === "stats"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <BarChart2 size={16} />
            Hoạt động & Phân tích
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === "progress"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <GraduationCap size={16} />
            Tiến độ của con
          </button>
        </div>

        {/* ── Tab 1: Stats & Analysis ── */}
        {activeTab === "stats" && (
          <>
            {/* Period Toggle */}
            <div className="flex flex-wrap gap-2 mb-8">
              {(["today", "yesterday", "week", "month"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${
                    period === p
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                      : "bg-white text-slate-500 border border-slate-200 hover:border-orange-300"
                  }`}
                >
                  {p === "today"
                    ? "Hôm nay"
                    : p === "yesterday"
                      ? "Hôm qua"
                      : p === "week"
                        ? "7 ngày qua"
                        : "30 ngày qua"}
                </button>
              ))}
            </div>

            {stats && <StatsOverview stats={stats} />}

            {stats && stats.dailyData.length > 0 && (
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ProgressChart data={stats.dailyData} period={period} />
                </div>
                <div className="lg:col-span-1">
                  <SkillsRadarChart categories={categoryAnalysis} />
                </div>
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CategoryAnalysis categories={categoryAnalysis} />
              <StrengthsWeaknesses categories={categoryAnalysis} suggestions={suggestions} />
            </div>
          </>
        )}

        {/* ── Tab 2: Kid's Learning Progress ── */}
        {activeTab === "progress" && (
          <div className="space-y-8">
            {/* Streak header */}
            <UserProfileHeader
              user={user}
              isPremium={isPremium}
              level={userLevel}
              currentStreak={currentStreak}
              activeDays={activeDays}
            />

            <h2 className="text-2xl font-black text-slate-800 font-[family-name:var(--font-baloo-2)]">
              🎯 Tiến độ học tập
            </h2>

            {startedCourses.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl shadow-sm border-2 border-dashed border-slate-200">
                <p className="text-slate-500 text-lg mb-3">Bé chưa bắt đầu học khóa nào cả.</p>
                <p className="text-slate-400 text-sm mb-6">Hãy chọn một lộ trình hoặc trò chơi để bắt đầu nhé!</p>
                <Link
                  href="/lo-trinh"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all"
                >
                  Chọn lộ trình học
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                {groupedByCategory.map((category) => (
                  <section key={category.type}>
                    <div className="flex items-center gap-3 mb-4">
                      {category.icon && (
                        <Image src={category.icon} alt={category.title} width={40} height={40} className="rounded-xl" />
                      )}
                      <h3 className="text-2xl font-black text-orange-500 font-[family-name:var(--font-baloo-2)]">
                        {category.title}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-4">
                      {category.courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
