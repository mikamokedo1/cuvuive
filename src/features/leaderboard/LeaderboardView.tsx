"use client";

import { motion } from "framer-motion";
import { Flame, BookOpen, Trophy, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { LeaderboardPodium } from "./LeaderboardPodium";
import { MyRankCard } from "./MyRankCard";
import type { LeaderboardEntry, MyRankData } from "@/libs/actions/leaderboard";

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
  myRank: MyRankData | null;
}

const MEDAL_STYLES: Record<number, { bg: string; text: string; icon: string }> = {
  1: { bg: "bg-amber-50", text: "text-amber-600", icon: "🥇" },
  2: { bg: "bg-slate-50", text: "text-slate-600", icon: "🥈" },
  3: { bg: "bg-orange-50", text: "text-orange-600", icon: "🥉" },
};

export function LeaderboardView({ entries, myRank }: LeaderboardViewProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">🏆</div>
        <h2 className="text-2xl font-bold text-slate-700 mb-3 font-[family-name:var(--font-baloo-2)]">
          Bảng xếp hạng đang chờ bạn!
        </h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Hoàn thành ít nhất 5 bài học để xuất hiện trên bảng xếp hạng. Hãy là người đầu tiên!
        </p>
        <Link
          href="/games"
          className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
        >
          <Gamepad2 className="w-5 h-5" />
          Bắt đầu học ngay
        </Link>
      </div>
    );
  }

  const restEntries = entries.slice(3);

  return (
    <div>
      {/* Podium — Top 3 */}
      {entries.length >= 3 && <LeaderboardPodium entries={entries.slice(0, 3)} />}

      {/* My Rank Card (logged-in users only) */}
      {myRank && <MyRankCard data={myRank} />}

      {/* Full Ranking Table/List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-100 text-sm font-bold text-slate-400">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Tên bé / Email</div>
          <div className="col-span-3 text-center">Điểm Thông Minh</div>
          <div className="col-span-2 text-center">Bài học</div>
          <div className="col-span-1 text-center">🔥</div>
        </div>

        {/* Entries — start from #4 (top 3 already in podium) */}
        <div className="divide-y divide-slate-50">
          {restEntries.map((entry, idx) => {
            const medalStyle = MEDAL_STYLES[entry.rank];
            const isCurrentUser = myRank && entry.rank === myRank.rank;

            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.5) }}
                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors hover:bg-orange-50/50 ${
                  isCurrentUser ? "bg-orange-50 border-l-4 border-orange-400" : ""
                } ${medalStyle ? medalStyle.bg : ""}`}
              >
                {/* Rank */}
                <div className="col-span-2 md:col-span-1">
                  {medalStyle ? (
                    <span className="text-2xl">{medalStyle.icon}</span>
                  ) : (
                    <span className="text-lg font-black text-slate-300 font-[family-name:var(--font-baloo-2)]">
                      {entry.rank}
                    </span>
                  )}
                </div>

                {/* Name + Avatar */}
                <div className="col-span-5 md:col-span-5 flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${
                      entry.rank === 1
                        ? "bg-gradient-to-br from-amber-400 to-yellow-500"
                        : entry.rank === 2
                          ? "bg-gradient-to-br from-slate-300 to-slate-400"
                          : entry.rank === 3
                            ? "bg-gradient-to-br from-orange-300 to-orange-400"
                            : "bg-gradient-to-br from-blue-300 to-blue-400"
                    }`}
                  >
                    {entry.kidName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm md:text-base truncate max-w-[120px] md:max-w-none">
                      {entry.kidName}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs font-semibold text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full">
                          Bạn
                        </span>
                      )}
                    </p>
                    {entry.email && (
                      <p className="text-xs text-slate-400 truncate max-w-[120px] md:max-w-[200px]">{entry.email}</p>
                    )}
                  </div>
                </div>

                {/* Smart Score */}
                <div className="col-span-3 md:col-span-3 text-center">
                  <span
                    className={`font-black text-base md:text-lg font-[family-name:var(--font-baloo-2)] ${medalStyle ? medalStyle.text : "text-slate-700"}`}
                  >
                    {entry.smartScore.toLocaleString("vi-VN")}
                  </span>
                  <span className="hidden md:inline text-xs text-slate-400 ml-1">điểm</span>
                </div>

                {/* Lessons */}
                <div className="col-span-1 md:col-span-2 text-center">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500">
                    <BookOpen className="w-3.5 h-3.5 hidden md:inline" />
                    {entry.totalLessons}
                  </span>
                </div>

                {/* Streak */}
                <div className="col-span-1 text-center">
                  {entry.currentStreak > 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-sm font-bold text-orange-500">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      {entry.currentStreak}
                    </span>
                  ) : (
                    <span className="text-slate-300 text-sm">—</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA at bottom */}
      <div className="text-center mt-10">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-1 transition-all duration-300 text-lg"
        >
          <Trophy className="w-5 h-5" />
          Chơi ngay để leo hạng!
        </Link>
      </div>
    </div>
  );
}
