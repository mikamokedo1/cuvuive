"use client";

import { useState } from "react";
import { StatsOverview } from "./StatsOverview";
import { ProgressChart } from "./ProgressChart";
import { CategoryAnalysis } from "./CategoryAnalysis";
import { StrengthsWeaknesses } from "./StrengthsWeaknesses";
import { SkillsRadarChart } from "./SkillsRadarChart";
import type { DashboardStats, CategoryStat, LessonSuggestion } from "@/libs/actions/dashboard";
import Header from "@/components/layout/Header";
import Link from "next/link";
import { ActionButton } from "@/components/common/ActionButton";
import { useUser } from "@/context/UserContext";

interface ParentDashboardViewProps {
  todayStats: DashboardStats | null;
  yesterdayStats: DashboardStats | null;
  weekStats: DashboardStats | null;
  monthStats: DashboardStats | null;
  categoryAnalysis: CategoryStat[];
  suggestions: LessonSuggestion[];
}

export function ParentDashboardView({
  todayStats,
  yesterdayStats,
  weekStats,
  monthStats,
  categoryAnalysis,
  suggestions,
}: ParentDashboardViewProps) {
  const [period, setPeriod] = useState<"today" | "yesterday" | "week" | "month">("week");
  const { user } = useUser();

  let stats = weekStats;
  if (period === "today") stats = todayStats;
  else if (period === "yesterday") stats = yesterdayStats;
  else if (period === "month") stats = monthStats;

  const kidName = user?.user_metadata?.kidName || "Bé";

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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 font-[family-name:var(--font-baloo-2)]">
            📊 Thống kê học tập của <span className="text-orange-500">{kidName}</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Theo dõi hành trình học tập và phát triển của bé mỗi ngày</p>
        </div>

        {/* Period Toggle */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setPeriod("today")}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${
              period === "today"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                : "bg-white text-slate-500 border border-slate-200 hover:border-orange-300"
            }`}
          >
            Hôm nay
          </button>
          <button
            onClick={() => setPeriod("yesterday")}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${
              period === "yesterday"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                : "bg-white text-slate-500 border border-slate-200 hover:border-orange-300"
            }`}
          >
            Hôm qua
          </button>
          <button
            onClick={() => setPeriod("week")}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${
              period === "week"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                : "bg-white text-slate-500 border border-slate-200 hover:border-orange-300"
            }`}
          >
            7 ngày qua
          </button>
          <button
            onClick={() => setPeriod("month")}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${
              period === "month"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                : "bg-white text-slate-500 border border-slate-200 hover:border-orange-300"
            }`}
          >
            30 ngày qua
          </button>
        </div>

        {/* Stats Overview Cards */}
        {stats && <StatsOverview stats={stats} />}

        {/* Progress Chart & Radar Chart */}
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

        {/* Category Analysis + Strengths/Weaknesses */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryAnalysis categories={categoryAnalysis} />
          <StrengthsWeaknesses categories={categoryAnalysis} suggestions={suggestions} />
        </div>
      </div>
    </main>
  );
}
