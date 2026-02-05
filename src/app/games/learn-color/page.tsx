"use client";

import { useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { GroupCard } from "@/features/games/learn-game/GroupCard";
import { useProgress } from "@/context/ProgressContext";
import { GROUPS } from "@/features/games/learn-color/constants";
import Image from "next/image";
import GameColorLogo from "@/assets/games/learn-color-color.webp";
import { LessonTitle } from "@/components/games/LessonTitle";

// Map variants to groups
const VARIANTS = ["green", "orange", "purple", "blue"] as const;

export default function LearnColorPage() {
  const router = useRouter();
  const { isGroupUnlocked, progress, isLoaded, allProgress } = useProgress();

  // Smart loading logic matching other games
  if (!isLoaded && !allProgress["learn-color"]) {
    return (
      <GameLayout showBackButton={false} backTo="/">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-orange-600 font-bold">Đang tải dữ liệu...</p>
        </div>
      </GameLayout>
    );
  }

  const handleGroupClick = (groupId: string) => {
    router.push(`/games/learn-color/${groupId}`);
  };

  return (
    <GameLayout showBackButton={false} backTo="/">
      <main className="flex flex-col items-center">
        {/* Title Section matching learn-numbers style */}
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center relative mb-8 pt-4">
          {/* Use GameLogo as main icon for now */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
            <Image src={GameColorLogo} alt="Học Màu Sắc" fill className="object-contain" priority />
          </div>
          <LessonTitle> Học Màu Sắc</LessonTitle>
        </div>

        <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 sm:gap-6  lg:grid-cols-3 lg:gap-6 w-full max-w-6xl items-center justify-center">
          {GROUPS.map((group, index) => {
            const unlocked = isGroupUnlocked(group.id, "learn-color");
            // Check specific course progress
            const courseProgress = allProgress["learn-color"] || { completedGroups: [] };
            const isCompleted = courseProgress.completedGroups.includes(group.id);

            const variant = VARIANTS[index % VARIANTS.length];

            return (
              <GroupCard
                key={group.id}
                title={group.title}
                variant={variant}
                isLocked={!unlocked}
                mainImage={group.logo}
                level={index + 1}
                onClick={() => handleGroupClick(group.id)}
                isCompleted={isCompleted}
                // GroupCard might expect subtitle? compare-quantity has it.
                // constants.ts has 'description', we can use that if GroupCard uses it.
                // Looking at used props in compare-quantity: title, subtitle, variant, isLocked, mainImage, level, onClick, isCompleted.
                // learn-numbers doesn't access subtitle.
                // Let's pass description as subtitle if GroupCard supports it, or check GroupCard def.
                // I'll stick to what learn-numbers did + title.
              />
            );
          })}
        </div>
      </main>
    </GameLayout>
  );
}
