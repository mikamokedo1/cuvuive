"use client";

import { motion } from "framer-motion";
import { Crown, Medal } from "lucide-react";
import type { LeaderboardEntry } from "@/libs/actions/leaderboard";

interface LeaderboardPodiumProps {
  entries: LeaderboardEntry[];
}

const PODIUM_CONFIG = [
  {
    // 2nd place (left)
    order: 1,
    rank: 2,
    height: "h-28 md:h-36",
    gradient: "from-slate-200 to-slate-300",
    bg: "bg-gradient-to-b from-slate-50 to-slate-100",
    border: "border-slate-200",
    avatarBg: "bg-gradient-to-br from-slate-300 to-slate-400",
    medal: "🥈",
    delay: 0.3,
  },
  {
    // 1st place (center)
    order: 0,
    rank: 1,
    height: "h-36 md:h-44",
    gradient: "from-amber-300 to-yellow-400",
    bg: "bg-gradient-to-b from-amber-50 to-yellow-50",
    border: "border-amber-200",
    avatarBg: "bg-gradient-to-br from-amber-400 to-yellow-500",
    medal: "🥇",
    delay: 0.1,
  },
  {
    // 3rd place (right)
    order: 2,
    rank: 3,
    height: "h-24 md:h-28",
    gradient: "from-orange-200 to-orange-300",
    bg: "bg-gradient-to-b from-orange-50 to-amber-50",
    border: "border-orange-200",
    avatarBg: "bg-gradient-to-br from-orange-300 to-orange-400",
    medal: "🥉",
    delay: 0.5,
  },
];

export function LeaderboardPodium({ entries }: LeaderboardPodiumProps) {
  if (entries.length < 3) return null;

  // Reorder: [2nd, 1st, 3rd] for visual layout
  const podiumOrder = [entries[1], entries[0], entries[2]];

  return (
    <div className="flex items-end justify-center gap-3 md:gap-6 mb-10">
      {podiumOrder.map((entry, visualIdx) => {
        const config = PODIUM_CONFIG[visualIdx];
        const initial = entry.kidName.charAt(0).toUpperCase();

        return (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: config.delay, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Avatar + Crown */}
            <div className="relative mb-3">
              {config.rank === 1 && (
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
                >
                  <Crown className="w-7 h-7 text-amber-400 fill-amber-400 drop-shadow-md" />
                </motion.div>
              )}
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${config.avatarBg} flex items-center justify-center text-white font-black text-2xl md:text-3xl shadow-lg border-4 border-white font-[family-name:var(--font-baloo-2)]`}
              >
                {initial}
              </div>
              <div className="absolute -bottom-1 -right-1 text-xl md:text-2xl drop-shadow-sm">
                {config.medal}
              </div>
            </div>

            {/* Name */}
            <p className="text-sm md:text-base font-bold text-slate-800 mb-0.5 text-center max-w-[120px] truncate">
              {entry.kidName}
            </p>
            <p className="text-[10px] md:text-xs text-slate-400 mb-1 text-center max-w-[120px] truncate">
              {entry.email}
            </p>

            {/* Score */}
            <p className="text-xs md:text-sm font-extrabold text-orange-500 mb-3">
              {entry.smartScore.toLocaleString("vi-VN")} điểm
            </p>

            {/* Podium pillar */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.4, delay: config.delay + 0.2, ease: "easeOut" }}
              style={{ transformOrigin: "bottom" }}
              className={`w-24 md:w-32 ${config.height} rounded-t-2xl bg-gradient-to-b ${config.gradient} border-2 ${config.border} border-b-0 flex items-center justify-center shadow-inner`}
            >
              <span className="text-3xl md:text-4xl font-black text-white/60 font-[family-name:var(--font-baloo-2)]">
                #{config.rank}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
