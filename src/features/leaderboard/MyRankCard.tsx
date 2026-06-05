"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp, Gamepad2, Sparkles } from "lucide-react";
import Link from "next/link";
import type { MyRankData } from "@/libs/actions/leaderboard";

interface MyRankCardProps {
  data: MyRankData;
}

export function MyRankCard({ data }: MyRankCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-5 md:p-6 text-white shadow-xl shadow-orange-500/20 mb-8 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-yellow-200" />
            </div>
            <div>
              <p className="text-white/80 text-sm font-semibold">Thứ hạng của bạn</p>
              <p className="text-2xl md:text-3xl font-black font-[family-name:var(--font-baloo-2)]">
                #{data.rank}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm font-semibold">Điểm Thông Minh</p>
            <p className="text-2xl md:text-3xl font-black font-[family-name:var(--font-baloo-2)]">
              {data.smartScore.toLocaleString("vi-VN")}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <Gamepad2 className="w-4 h-4 mx-auto mb-1 text-white/70" />
            <p className="text-lg font-black">{data.totalLessons}</p>
            <p className="text-[11px] font-semibold text-white/70">Bài học</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <Flame className="w-4 h-4 mx-auto mb-1 text-yellow-300" />
            <p className="text-lg font-black">{data.currentStreak}</p>
            <p className="text-[11px] font-semibold text-white/70">Ngày streak</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <TrendingUp className="w-4 h-4 mx-auto mb-1 text-green-300" />
            <p className="text-lg font-black">{data.totalMinutes}</p>
            <p className="text-[11px] font-semibold text-white/70">Phút học</p>
          </div>
        </div>

        {/* Next rank hint */}
        {data.pointsToNextRank && data.nextRankName && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-yellow-300 shrink-0" />
            <p className="text-sm font-semibold text-white/90">
              Cần thêm <span className="font-black text-yellow-200">{data.pointsToNextRank.toLocaleString("vi-VN")}</span> điểm
              để vượt <span className="font-black">{data.nextRankName}</span>!
            </p>
          </div>
        )}

        {data.rank > 1 && (
          <Link
            href="/games"
            className="mt-4 w-full flex items-center justify-center gap-2 bg-white text-orange-600 font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors text-sm shadow-md"
          >
            <Gamepad2 className="w-4 h-4" />
            Học thêm để leo hạng!
          </Link>
        )}
      </div>
    </motion.div>
  );
}
