"use client";

import { useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { GroupCard } from "@/features/games/learn-game/GroupCard";
import { useProgress } from "@/context/ProgressContext";
import { GROUPS } from "@/features/games/learn-shape/constants";
import Image from "next/image";
import { LessonTitle } from "@/components/games/LessonTitle";
// Use one of the shape images as the main logo for now
import GameShapeLogo from "@/assets/games/learn-shape/learn-shape-logo.webp";

export default function LearnShapePage() {
  const router = useRouter();
  const { isGroupUnlocked, isLoaded, allProgress } = useProgress();

  if (!isLoaded && !allProgress["learn-shape"]) {
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
    router.push(`/games/learn-shape/${groupId}`);
  };

  return (
    <GameLayout showBackButton={false} backTo="/">
      <main className="flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center relative mb-8 pt-4">
          <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
            <Image src={GameShapeLogo} alt="Học Hình Dạng" fill className="object-contain" priority />
          </div>
          <LessonTitle>Học Hình Dạng</LessonTitle>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 w-full max-w-6xl items-center justify-center">
          {GROUPS.map((group, index) => {
            const unlocked = isGroupUnlocked(group.id, "learn-shape");
            const courseProgress = allProgress["learn-shape"] || { completedGroups: [] };
            const isCompleted = courseProgress.completedGroups.includes(group.id);

            return (
              <GroupCard
                key={group.id}
                title={group.title}
                variant={group.variant}
                isLocked={!unlocked}
                mainImage={group.logo}
                level={index + 1}
                onClick={() => handleGroupClick(group.id)}
                isCompleted={isCompleted}
              />
            );
          })}
        </div>
      </main>
    </GameLayout>
  );
}
