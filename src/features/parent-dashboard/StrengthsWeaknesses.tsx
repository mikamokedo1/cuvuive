"use client";

import Link from "next/link";
import { ThumbsUp, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";
import type { CategoryStat, LessonSuggestion } from "@/libs/actions/dashboard";
import { GROUPS } from "@/libs/constants/groups";

interface StrengthsWeaknessesProps {
  categories: CategoryStat[];
  suggestions: LessonSuggestion[];
}

export function StrengthsWeaknesses({ categories, suggestions }: StrengthsWeaknessesProps) {
  const strengths = categories.filter((c) => c.percentage >= 50 && c.completedLessons > 0);
  const weaknesses = categories.filter((c) => c.percentage < 30 && c.percentage > 0);
  const notStarted = categories.filter((c) => c.completedLessons === 0);

  const getHref = (category: string) => {
    const group = GROUPS.find((g) => g.id === category);
    return group ? `/${group.slug}` : "#";
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-baloo-2)] mb-6">
        💡 Đánh giá & Gợi ý
      </h2>

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
              <ThumbsUp className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="font-bold text-sm text-emerald-700">Thế mạnh</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {strengths.map((s) => {
              const href = getHref(s.category);
              return (
                <Link
                  key={s.category}
                  href={href}
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  ✅ {s.categoryTitle} ({s.percentage}%)
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Weaknesses */}
      {weaknesses.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <h3 className="font-bold text-sm text-amber-700">Cần luyện thêm</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {weaknesses.map((w) => {
              const href = getHref(w.category);
              return (
                <Link
                  key={w.category}
                  href={href}
                  className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  ⚠️ {w.categoryTitle} ({w.percentage}%)
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Not Started */}
      {notStarted.length > 0 && (
        <div className="mb-5">
          <p className="text-xs text-slate-400 font-medium">
            Chưa bắt đầu:{" "}
            {notStarted.map((n, idx) => {
              const href = getHref(n.category);
              return (
                <span key={n.category}>
                  <Link
                    href={href}
                    className="hover:underline hover:text-slate-500 transition-colors"
                  >
                    {n.categoryTitle}
                  </Link>
                  {idx < notStarted.length - 1 ? ", " : ""}
                </span>
              );
            })}
          </p>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-orange-500" />
            </div>
            <h3 className="font-bold text-sm text-orange-700">Bài học gợi ý</h3>
          </div>
          <div className="flex flex-col gap-2">
            {suggestions.slice(0, 4).map((s, i) => (
              <Link
                key={i}
                href={`/games/${s.courseId}/${s.groupId}/lesson/${s.lessonId}`}
                className="flex items-center justify-between p-3 bg-orange-50/50 rounded-xl border border-orange-100 hover:bg-orange-50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-700 truncate">
                    {s.courseTitle} — {s.lessonTitle}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">{s.reason}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {strengths.length === 0 && weaknesses.length === 0 && suggestions.length === 0 && (
        <p className="text-slate-400 text-center py-6 text-sm">
          Bé chưa học đủ để phân tích. Hãy bắt đầu với vài bài học nhé! 🦉
        </p>
      )}
    </div>
  );
}
