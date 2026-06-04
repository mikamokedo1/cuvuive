"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, BookOpen, Award, Flame, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { DashboardStats } from "@/libs/actions/dashboard";

interface StatsOverviewProps {
  stats: DashboardStats;
}

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (target === 0) {
      setCurrent(0);
      return;
    }

    const duration = 1000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  );
}

function DeltaBadge({ value }: { value: number }) {
  if (value === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
        <Minus className="w-3 h-3" />
        0%
      </span>
    );
  }

  if (value > 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
        <TrendingUp className="w-3 h-3" />+{value}%
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">
      <TrendingDown className="w-3 h-3" />
      {value}%
    </span>
  );
}

const STAT_CARDS = [
  {
    key: "time",
    label: "Thời gian học",
    icon: Clock,
    color: "from-blue-500 to-indigo-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    getValue: (s: DashboardStats) => s.totalMinutes,
    suffix: " phút",
    getDelta: (s: DashboardStats) => s.minutesDelta,
  },
  {
    key: "lessons",
    label: "Bài hoàn thành",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
    getValue: (s: DashboardStats) => s.lessonsCompleted,
    suffix: " bài",
    getDelta: (s: DashboardStats) => s.lessonsDelta,
  },
  {
    key: "xp",
    label: "Điểm tích lũy",
    icon: Award,
    color: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    getValue: (s: DashboardStats) => s.lessonsCompleted * 100 + s.totalMinutes * 10,
    suffix: " XP",
    getDelta: () => 0,
  },
  {
    key: "streak",
    label: "Chuỗi học tập",
    icon: Flame,
    color: "from-rose-500 to-pink-500",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
    getValue: (s: DashboardStats) => s.currentStreak,
    suffix: " ngày",
    getDelta: () => 0,
  },
] as const;

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STAT_CARDS.map((card) => {
        const Icon = card.icon;
        const value = card.getValue(stats);
        const delta = card.getDelta(stats);

        return (
          <div
            key={card.key}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 ${card.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              {delta !== 0 && <DeltaBadge value={delta} />}
            </div>
            <p className="text-2xl md:text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-baloo-2)]">
              <AnimatedNumber target={value} suffix={card.suffix} />
            </p>
            <p className="text-sm font-semibold text-slate-400 mt-1">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
}
