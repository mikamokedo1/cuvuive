"use client";

import Image from "next/image";
import Link from "next/link";
import type { CategoryStat } from "@/libs/actions/dashboard";
import { GROUPS } from "@/libs/constants/groups";

interface CategoryAnalysisProps {
  categories: CategoryStat[];
}

const BAR_COLORS: Record<string, { bg: string; fill: string }> = {
  math: { bg: "bg-blue-100", fill: "bg-blue-500" },
  language: { bg: "bg-purple-50", fill: "bg-purple-500" },
  science: { bg: "bg-emerald-100", fill: "bg-emerald-500" },
  "life-skill": { bg: "bg-amber-100", fill: "bg-amber-500" },
  logic: { bg: "bg-indigo-100", fill: "bg-indigo-500" },
  art: { bg: "bg-pink-100", fill: "bg-pink-500" },
  music: { bg: "bg-teal-100", fill: "bg-teal-500" },
  geography: { bg: "bg-cyan-100", fill: "bg-cyan-500" },
  english: { bg: "bg-red-100", fill: "bg-red-500" },
};

export function CategoryAnalysis({ categories }: CategoryAnalysisProps) {
  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-baloo-2)] mb-4">
          🎯 Phân tích theo chủ đề
        </h2>
        <p className="text-slate-400 text-center py-8">Chưa có dữ liệu. Hãy cho bé bắt đầu học nhé!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-baloo-2)] mb-6">
        🎯 Phân tích theo chủ đề
      </h2>

      <div className="flex flex-col gap-4">
        {categories.map((cat) => {
          const colors = BAR_COLORS[cat.category] ?? { bg: "bg-slate-100", fill: "bg-slate-500" };
          const group = GROUPS.find((g) => g.id === cat.category);
          const href = group ? `/${group.slug}` : "#";

          return (
            <Link
              key={cat.category}
              href={href}
              className="group block hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-1.5">
                {cat.categoryIcon && (
                  <Image
                    src={cat.categoryIcon}
                    alt={cat.categoryTitle}
                    width={24}
                    height={24}
                    className="rounded-lg group-hover:scale-105 transition-transform duration-200"
                  />
                )}
                <span className="font-bold text-sm text-slate-700 flex-1 group-hover:text-orange-500 transition-colors">
                  {cat.categoryTitle}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {cat.completedLessons}/{cat.totalLessons}
                </span>
                <span className="text-sm font-extrabold text-slate-900 w-12 text-right">
                  {cat.percentage}%
                </span>
              </div>
              <div className={`w-full h-3 ${colors.bg} rounded-full overflow-hidden`}>
                <div
                  className={`h-full ${colors.fill} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
