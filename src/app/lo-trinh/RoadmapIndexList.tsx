"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlayCircle, Rocket } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { ROADMAPS, getRoadmapTotalGames, type Roadmap } from "@/libs/constants/roadmaps";

const CARD_THEMES = [
  {
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    hoverRing: "hover:ring-emerald-300",
    activeRing: "ring-emerald-400",
    activeBadge: "bg-emerald-500 text-white",
    progressBar: "bg-emerald-500",
    ctaColor: "text-emerald-600",
  },
  {
    gradient: "from-orange-500 to-amber-600",
    shadow: "shadow-orange-500/20",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    hoverRing: "hover:ring-orange-300",
    activeRing: "ring-orange-400",
    activeBadge: "bg-orange-500 text-white",
    progressBar: "bg-orange-500",
    ctaColor: "text-orange-500",
  },
  {
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    hoverRing: "hover:ring-blue-300",
    activeRing: "ring-blue-400",
    activeBadge: "bg-blue-500 text-white",
    progressBar: "bg-blue-500",
    ctaColor: "text-blue-600",
  },
] as const;

/** Tìm roadmap chứa courseId. Fallback → ROADMAPS[0] */
function getActiveRoadmap(lastPlayedCourseId: string | null): Roadmap {
  if (!lastPlayedCourseId) return ROADMAPS[0];
  for (const roadmap of ROADMAPS) {
    for (const stage of roadmap.stages) {
      for (const cat of stage.categories) {
        if (cat.games.some((g) => g.gameId === lastPlayedCourseId)) {
          return roadmap;
        }
      }
    }
  }
  return ROADMAPS[0];
}

/** Tính tổng lessons đã hoàn thành trong 1 roadmap */
function getRoadmapCompletedLessons(
  roadmap: Roadmap,
  allProgress: Record<string, { completedLessons: Record<string, string[]> }>,
): number {
  let count = 0;
  for (const stage of roadmap.stages) {
    for (const cat of stage.categories) {
      for (const game of cat.games) {
        const prog = allProgress[game.gameId];
        if (prog) {
          count += Object.values(prog.completedLessons).flat().length;
        }
      }
    }
  }
  return count;
}

export function RoadmapIndexList() {
  const { lastPlayedCourseId, allProgress, isLoaded } = useProgress();

  const activeRoadmap = getActiveRoadmap(lastPlayedCourseId);

  return (
    <div className="grid gap-6 md:gap-8">
      {ROADMAPS.map((roadmap, i) => {
        const theme = CARD_THEMES[i % CARD_THEMES.length];
        const totalGames = getRoadmapTotalGames(roadmap);
        const totalStages = roadmap.stages.length;
        const isActive = roadmap.id === activeRoadmap.id;

        const completedLessons = isLoaded ? getRoadmapCompletedLessons(roadmap, allProgress) : 0;
        const hasProgress = completedLessons > 0;

        // Tính % progress (approximation: mỗi game có ~3 lessons trung bình)
        const totalLessonsEstimate = totalGames * 3;
        const progressPct = Math.min(100, Math.round((completedLessons / totalLessonsEstimate) * 100));

        return (
          <Link
            key={roadmap.id}
            href={`/lo-trinh/${roadmap.slug}`}
            className={`group relative bg-white rounded-[2rem] border overflow-hidden
              shadow-lg ${theme.shadow} hover:shadow-2xl hover:-translate-y-1
              ring-2 transition-all duration-300 flex flex-col md:flex-row
              ${
                isActive
                  ? `${theme.activeRing} border-transparent`
                  : `ring-transparent border-slate-100 ${theme.hoverRing}`
              }`}
          >
            {/* "Lộ trình của bé" top banner — active only */}
            {isActive && <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${theme.gradient} z-30`} />}

            {/* Hero Image */}
            <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0 overflow-hidden">
              <Image
                src={roadmap.heroImage}
                alt={`Lộ Trình ${roadmap.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 288px"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Age badge overlay */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-sm font-extrabold text-slate-800 shadow-sm">
                  👶 {roadmap.ageRange[0]}-{roadmap.ageRange[1]} tuổi
                </span>
              </div>
              {/* Gradient overlay for text readability on mobile */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden" />
              {/* Title overlay on mobile */}
              <div className="absolute bottom-4 left-4 right-4 z-20 md:hidden">
                <h2 className="text-2xl font-extrabold text-white font-[family-name:var(--font-baloo-2)] [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
                  {roadmap.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Title row + active badge */}
                <div className="hidden md:flex items-start gap-3 mb-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-baloo-2)] group-hover:text-orange-600 transition-colors flex-1">
                    Lộ Trình {roadmap.title}
                  </h2>
                  {isActive && (
                    <span
                      className={`shrink-0 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mt-1 ${theme.activeBadge}`}
                    >
                      {hasProgress ? "🎯 Đang học" : "Gợi ý cho bé"}
                    </span>
                  )}
                </div>

                {/* Mobile active badge */}
                {isActive && (
                  <div className="md:hidden mb-2">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${theme.activeBadge}`}
                    >
                      {hasProgress ? "🎯 Đang học" : "Gợi ý cho bé"}
                    </span>
                  </div>
                )}

                <p className="text-slate-500 leading-relaxed text-sm sm:text-base mb-4">{roadmap.description}</p>

                {/* Stats pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${theme.badge}`}
                  >
                    🚀 {totalStages} chặng
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${theme.badge}`}
                  >
                    🎮 {totalGames} trò chơi
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${theme.badge}`}
                  >
                    📖 {roadmap.stages.map((s) => s.title).join(" → ")}
                  </span>
                </div>

                {/* Progress bar — chỉ hiện khi active và isLoaded */}
                {isActive && isLoaded && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
                      <span>{hasProgress ? `${completedLessons} bài đã hoàn thành` : "Chưa bắt đầu"}</span>
                      {hasProgress && <span>{progressPct}%</span>}
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${theme.progressBar}`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div
                className={`flex items-center gap-2 font-extrabold group-hover:gap-3 transition-all ${theme.ctaColor}`}
              >
                {isActive ? (
                  <>
                    {hasProgress ? <PlayCircle className="w-5 h-5" /> : <Rocket className="w-5 h-5" />}
                    <span>{hasProgress ? "Tiếp tục học" : "Bắt đầu khám phá"}</span>
                  </>
                ) : (
                  <>
                    <span>Khám phá lộ trình</span>
                  </>
                )}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
