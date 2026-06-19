"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { getCourseIcon, getCourseTotalLessons } from "@/libs/constants/course-helpers";
import { playButtonSound } from "@/libs/utils/playSound";
import type { Roadmap, RoadmapStage, RoadmapGame } from "@/libs/constants/roadmaps";
import { getGameLabel } from "@/libs/constants/roadmaps";
import { ChevronDown, ChevronUp, Star, ArrowLeft } from "lucide-react";

// ─── Assets ──────────────────────────────────────────────────────────────────

const owlAvatar = "https://assets.cuthongminh.com/assets/avatar-boy.webp";


// ─── Stage colour maps ──────────────────────────────────────────────────────

const STAGE_COLORS = {
  green: {
    banner: "bg-emerald-500",
    bannerText: "text-white",
    ring: "ring-emerald-400",
    progress: "bg-emerald-400",
    progressTrack: "bg-emerald-100",
    dot: "bg-emerald-400",
    categoryBg: "bg-emerald-50",
    categoryBorder: "border-emerald-200",
    nodeActive: "border-emerald-400 shadow-emerald-200",
    pathColor: "#6ee7b7",
  },
  blue: {
    banner: "bg-blue-500",
    bannerText: "text-white",
    ring: "ring-blue-400",
    progress: "bg-blue-400",
    progressTrack: "bg-blue-100",
    dot: "bg-blue-400",
    categoryBg: "bg-blue-50",
    categoryBorder: "border-blue-200",
    nodeActive: "border-blue-400 shadow-blue-200",
    pathColor: "#93c5fd",
  },
  orange: {
    banner: "bg-orange-500",
    bannerText: "text-white",
    ring: "ring-orange-400",
    progress: "bg-orange-400",
    progressTrack: "bg-orange-100",
    dot: "bg-orange-400",
    categoryBg: "bg-orange-50",
    categoryBorder: "border-orange-200",
    nodeActive: "border-orange-400 shadow-orange-200",
    pathColor: "#fdba74",
  },
} as const;

// ─── Sub-components ──────────────────────────────────────────────────────────

/** A single game node on the skill tree */
function GameNode({
  game,
  stageColor,
  completedLessons,
  totalLessons,
  isEven,
  isCurrent,
  roadmapSlug,
}: {
  game: RoadmapGame;
  stageColor: (typeof STAGE_COLORS)[keyof typeof STAGE_COLORS];
  completedLessons: number;
  totalLessons: number;
  isEven: boolean;
  isCurrent: boolean;
  roadmapSlug: string;
}) {
  const icon = getCourseIcon(game.gameId);
  const label = getGameLabel(game);
  const isDone = totalLessons > 0 && completedLessons >= totalLessons;
  const isStarted = completedLessons > 0;
  const progressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const gameHref = `/games/${game.gameId}#from=lo-trinh/${roadmapSlug}`;

  return (
    <div className={`flex items-center gap-4 ${isEven ? "flex-row" : "flex-row-reverse"}`}>
      {/* Node circle */}
      <Link
        href={gameHref}
        onClick={() => playButtonSound()}
      className={`
          relative shrink-0 w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full
          bg-white border-[3px] flex items-center justify-center
          transition-all duration-300 hover:scale-110 active:scale-95 group
          ${isCurrent ? "scale-110" : ""}
          ${
            isDone
              ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
              : isCurrent
                ? `${stageColor.nodeActive} shadow-xl`
                : isStarted
                  ? `${stageColor.nodeActive} shadow-lg`
                  : "border-slate-200 shadow-md hover:border-slate-300"
          }
        `}
      >
        {icon && (
          <Image
            src={icon}
            alt={label}
            width={56}
            height={56}
            className="w-11 h-11 sm:w-14 sm:h-14 object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
          />
        )}

        {/* Beacon ping animation for current game */}
        {isCurrent && !isDone && (
          <span
            className={`absolute inset-0 rounded-full animate-ping opacity-40 border-[3px] ${stageColor.nodeActive}`}
          />
        )}

        {/* Completion crown */}
        {isDone && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-md" />
          </div>
        )}

        {/* Progress ring indicator (for in-progress) */}
        {isStarted && !isDone && (
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-slate-100"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={`${progressPct * 2.89} 289`}
              strokeLinecap="round"
              className="text-emerald-400"
            />
          </svg>
        )}
      </Link>

      {/* Label */}
      <div className={`flex flex-col ${isEven ? "items-start" : "items-end"}`}>
        <span className="text-sm sm:text-base font-bold text-slate-700 leading-tight">{label}</span>
        {isCurrent && !isDone && (
          <span className={`text-xs font-bold ${stageColor.dot.replace("bg-", "text-")} mt-0.5`}>
            ▶ Đang ở đây
          </span>
        )}
        {isStarted && !isCurrent && (
          <span className={`text-xs font-semibold ${isDone ? "text-yellow-500" : "text-slate-400"}`}>
            {isDone ? "Hoàn thành ✓" : `${progressPct}%`}
          </span>
        )}
        {isStarted && isCurrent && !isDone && (
          <span className="text-xs font-semibold text-slate-400">{progressPct}%</span>
        )}
      </div>
    </div>
  );
}

/** Category section with zigzag game nodes */
function CategorySection({
  category,
  stageColor,
  allProgress,
  globalIndex,
  currentGameId,
  roadmapSlug,
}: {
  category: { id: string; title: string; emoji: string; games: RoadmapGame[] };
  stageColor: (typeof STAGE_COLORS)[keyof typeof STAGE_COLORS];
  allProgress: Record<string, { completedLessons: Record<string, string[]> }>;
  globalIndex: number;
  currentGameId: string | null;
  roadmapSlug: string;
}) {
  return (
    <div className="mt-6 first:mt-0">
      {/* Category label */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5
          ${stageColor.categoryBg} ${stageColor.categoryBorder} border`}
      >
        <span>{category.emoji}</span>
        <span className="text-slate-700">{category.title}</span>
      </div>

      {/* Zigzag game nodes */}
      <div className="flex flex-col gap-5 pl-2 sm:pl-4 relative">
        {/* Vertical dotted line */}
        <div
          className="absolute left-[37px] sm:left-[42px] top-4 bottom-4 w-[3px] rounded-full opacity-40"
          style={{
            background: `repeating-linear-gradient(to bottom, ${stageColor.pathColor} 0px, ${stageColor.pathColor} 8px, transparent 8px, transparent 16px)`,
          }}
        />

        {category.games.map((game, i) => {
          const prog = allProgress[game.gameId];
          const completedLessons = prog ? Object.values(prog.completedLessons).flat().length : 0;
          const totalLessons = getCourseTotalLessons(game.gameId);

          return (
            <GameNode
              key={game.gameId}
              game={game}
              stageColor={stageColor}
              completedLessons={completedLessons}
              totalLessons={totalLessons}
              isEven={(globalIndex + i) % 2 === 0}
              isCurrent={game.gameId === currentGameId}
              roadmapSlug={roadmapSlug}
            />
          );
        })}
      </div>
    </div>
  );
}

/** A collapsible stage card */
function StageCard({
  stage,
  isExpanded,
  onToggle,
  stageProgress,
  allProgress,
  currentGameId,
  roadmapSlug,
}: {
  stage: RoadmapStage;
  isExpanded: boolean;
  onToggle: () => void;
  stageProgress: { completed: number; total: number; pct: number };
  allProgress: Record<string, { completedLessons: Record<string, string[]> }>;
  currentGameId: string | null;
  roadmapSlug: string;
}) {
  const colors = STAGE_COLORS[stage.color];
  let gameGlobalIndex = 0;

  return (
    <div
      className={`
        relative rounded-[1.5rem] border-2 overflow-hidden transition-all duration-500
        ${
          isExpanded
            ? `border-transparent shadow-xl ring-2 ${colors.ring}`
            : "border-slate-200 shadow-md hover:shadow-lg"
        }
      `}
    >
      {/* Stage theme background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stage.bgTheme} -z-10`} />

      {/* Stage header (clickable) */}
      <button
        onClick={() => {
          playButtonSound();
          onToggle();
        }}
        className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center gap-4 cursor-pointer group"
      >
        {/* Stage number badge */}
        <div
          className={`
            shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center
            font-extrabold text-lg shadow-md transition-transform group-hover:scale-105
            ${colors.banner} ${colors.bannerText}
          `}
        >
          {stage.number}
        </div>

        {/* Title & subtitle */}
        <div className="flex-1 text-left min-w-0">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 leading-tight">
            {stage.emoji} {stage.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 truncate">
            {stage.subtitle}
          </p>
        </div>

        {/* Progress badge or locked */}
        <div className="shrink-0 flex items-center gap-2">
          <div className="text-right mr-1">
            <span className={`text-sm font-bold ${stageProgress.pct === 100 ? "text-yellow-500" : "text-slate-600"}`}>
              {stageProgress.pct}%
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {/* Progress bar */}
      <div className="px-5 sm:px-6 pb-1">
        <div className={`h-2 rounded-full ${colors.progressTrack} overflow-hidden`}>
          <div
            className={`h-full rounded-full ${colors.progress} transition-all duration-700 ease-out`}
            style={{ width: `${stageProgress.pct}%` }}
          />
        </div>
      </div>

      {/* Expandable content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 sm:px-6 pt-4 pb-6 space-y-6">
          {stage.categories.map((cat) => {
            const startIndex = gameGlobalIndex;
            gameGlobalIndex += cat.games.length;
            return (
              <CategorySection
                key={cat.id}
                category={cat}
                stageColor={colors}
                allProgress={allProgress}
                globalIndex={startIndex}
                currentGameId={currentGameId}
                roadmapSlug={roadmapSlug}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function RoadmapView({ roadmap }: { roadmap: Roadmap }) {
  const { allProgress, lastPlayedCourseId, isLoaded } = useProgress();
  const [expandedStage, setExpandedStage] = useState<string>(roadmap.stages[0]?.id ?? "");
  const hasAutoExpanded = useRef(false);

  // Calculate per-stage progress
  const stageProgressMap = useMemo(() => {
    const map: Record<string, { completed: number; total: number; pct: number }> = {};

    roadmap.stages.forEach((stage) => {
      let stageCompleted = 0;
      let stageTotal = 0;

      stage.categories.forEach((cat) => {
        cat.games.forEach((game) => {
          const totalLessons = getCourseTotalLessons(game.gameId);
          const prog = allProgress[game.gameId];
          const completed = prog ? Object.values(prog.completedLessons).flat().length : 0;

          stageTotal += totalLessons;
          stageCompleted += Math.min(completed, totalLessons);
        });
      });

      map[stage.id] = {
        completed: stageCompleted,
        total: stageTotal,
        pct: stageTotal > 0 ? Math.round((stageCompleted / stageTotal) * 100) : 0,
      };
    });

    return map;
  }, [allProgress, roadmap.stages]);

  // Overall progress
  const overall = useMemo(() => {
    const values = Object.values(stageProgressMap);
    const totalCompleted = values.reduce((s, v) => s + v.completed, 0);
    const totalAll = values.reduce((s, v) => s + v.total, 0);
    return {
      completed: totalCompleted,
      total: totalAll,
      pct: totalAll > 0 ? Math.round((totalCompleted / totalAll) * 100) : 0,
    };
  }, [stageProgressMap]);

  // Tìm game hiện tại đang chơi
  const currentGameId = useMemo(() => {
    // Ưu tiên game cuối cùng user chơi (nếu thuộc roadmap này)
    if (lastPlayedCourseId) {
      for (const stage of roadmap.stages) {
        for (const cat of stage.categories) {
          if (cat.games.some((g) => g.gameId === lastPlayedCourseId)) {
            return lastPlayedCourseId;
          }
        }
      }
    }
    // Fallback: game đầu tiên chưa hoàn thành trong roadmap
    for (const stage of roadmap.stages) {
      for (const cat of stage.categories) {
        for (const game of cat.games) {
          const prog = allProgress[game.gameId];
          const totalLessons = getCourseTotalLessons(game.gameId);
          const completed = prog ? Object.values(prog.completedLessons).flat().length : 0;
          if (completed < totalLessons) return game.gameId;
        }
      }
    }
    return null;
  }, [lastPlayedCourseId, allProgress, roadmap.stages]);

  // Tìm stage đang học: ưu tiên stage có progress dở dang (0 < pct < 100)
  // Nếu không có, chọn stage đầu tiên chưa bắt đầu
  const activeStageId = useMemo(() => {
    // Stage đang làm dở
    for (const stage of roadmap.stages) {
      const prog = stageProgressMap[stage.id];
      if (prog && prog.pct > 0 && prog.pct < 100) return stage.id;
    }
    // Stage chưa bắt đầu đầu tiên
    for (const stage of roadmap.stages) {
      const prog = stageProgressMap[stage.id];
      if (prog && prog.pct === 0) return stage.id;
    }
    return roadmap.stages[0]?.id ?? "";
  }, [roadmap.stages, stageProgressMap]);

  // Auto-expand stage đang học — chỉ 1 lần khi progress load xong
  useEffect(() => {
    if (isLoaded && !hasAutoExpanded.current) {
      hasAutoExpanded.current = true;
      setExpandedStage(activeStageId);
    }
  }, [isLoaded, activeStageId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] via-[#ecfeff] to-[#fffbeb] font-[family-name:var(--font-nunito-sans)] pt-24 sm:pt-28 pb-28">
      {/* Hero section */}
      <section className="relative px-4 pt-4 pb-2 max-w-2xl mx-auto">
        <div className="bg-white rounded-[1.5rem] p-5 sm:p-6 shadow-lg border border-slate-100 flex items-start gap-4">
          <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-orange-200 shadow-sm relative">
            <Image
              src={roadmap.heroImage}
              alt={`Lộ Trình ${roadmap.title}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 font-[family-name:var(--font-baloo-2)] leading-tight">
              Lộ Trình {roadmap.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1 leading-relaxed">{roadmap.description}</p>
            {/* Quick stats */}
            <div className="flex items-center gap-4 mt-3 text-xs font-bold text-slate-400">
              <span>🚀 {roadmap.stages.length} chặng</span>
              <span>
                🎮 {roadmap.stages.reduce((s, st) => s + st.categories.reduce((s2, c) => s2 + c.games.length, 0), 0)}{" "}
                trò chơi
              </span>
              <span>
                📚 {overall.completed}/{overall.total} bài
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Progress & Navigation Section */}
      <section className="px-4 py-2 max-w-2xl mx-auto">
        <div className="bg-white rounded-[1.5rem] p-4 shadow-md border border-slate-100 flex items-center gap-4">
          <Link
            href="/games"
            className="shrink-0 w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center border border-slate-200 transition-colors"
            onClick={() => playButtonSound()}
            title="Quay lại danh sách trò chơi"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-sm font-extrabold text-slate-400 uppercase tracking-wider font-[family-name:var(--font-baloo-2)]">
                Tiến trình học
              </span>
              <span className="text-xs font-extrabold text-emerald-500">{overall.pct}% Hoàn thành</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-blue-400 to-orange-400 rounded-full transition-all duration-700"
                style={{ width: `${overall.pct}%` }}
              />
            </div>
          </div>

          {/* Owl avatar */}
          <div className="shrink-0 w-10 h-10 rounded-full bg-orange-50 border border-orange-200 overflow-hidden shadow-sm">
            <Image src={owlAvatar} alt="Cú Thông Minh" width={40} height={40} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Stages */}
      <section className="px-4 pb-24 max-w-2xl mx-auto space-y-4 mt-2">
        {roadmap.stages.map((stage) => {
          const isExpanded = expandedStage === stage.id;

          return (
            <StageCard
              key={stage.id}
              stage={stage}
              isExpanded={isExpanded}
              onToggle={() => setExpandedStage((prev) => (prev === stage.id ? "" : stage.id))}
              stageProgress={stageProgressMap[stage.id] ?? { completed: 0, total: 0, pct: 0 }}
              allProgress={allProgress}
              currentGameId={currentGameId}
              roadmapSlug={roadmap.slug}
            />
          );
        })}
      </section>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-4 bg-gradient-to-t from-white via-white/95 to-transparent">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/games/${findNextGame(roadmap, allProgress)}#from=lo-trinh/${roadmap.slug}`}
            onClick={() => playButtonSound()}
            className="block w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center text-lg font-extrabold shadow-[0_8px_30px_rgba(255,156,1,0.35)] hover:shadow-[0_8px_40px_rgba(255,156,1,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            {overall.completed === 0 ? "Bắt đầu học ngay" : "Tiếp tục học"}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Utility: find the next game the user should play ────────────────────────

function findNextGame(
  roadmap: Roadmap,
  allProgress: Record<string, { completedLessons: Record<string, string[]> }>,
): string {
  for (const stage of roadmap.stages) {
    for (const cat of stage.categories) {
      for (const game of cat.games) {
        const totalLessons = getCourseTotalLessons(game.gameId);
        const prog = allProgress[game.gameId];
        const completed = prog ? Object.values(prog.completedLessons).flat().length : 0;

        if (completed < totalLessons) {
          return game.gameId;
        }
      }
    }
  }
  // All done — return first game
  return roadmap.stages[0]?.categories[0]?.games[0]?.gameId ?? "learn-alphabet";
}
