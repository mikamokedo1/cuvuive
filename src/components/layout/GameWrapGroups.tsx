"use client";
import { GameLayout } from "@/components/layout/GameLayout";
import { GroupCard } from "@/features/games/learn-game/GroupCard";
import Image from "next/image";
import { LessonTitle } from "@/components/games/LessonTitle";
import { useProgress } from "@/context/ProgressContext";
import { useAccess } from "@/context/AccessContext";
import { GroupData } from "@/features/games/learn-vehicle/constants";
import { StaticImageData } from "next/image";

interface GameWrapGroups {
  logo: string | StaticImageData;
  gameId: string;
  groups: GroupData[];
  title: string;
}

export const GameWrapGroups = ({ logo, gameId, groups, title }: GameWrapGroups) => {
  const { isGroupUnlocked, isLoaded, allProgress } = useProgress();
  const { isPremium, isLoggedIn, showPaywall } = useAccess();

  if (!isLoaded && !allProgress[gameId]) {
    return (
      <GameLayout showBackButton={false} backTo="/games">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-orange-600 font-bold">Đang tải dữ liệu..</p>
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout showBackButton={false} backTo="/games">
      <main className="w-full">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center relative mb-8 pt-4">
          <div className="relative w-24 h-24 md:w-48 md:h-48 mb-4">
            <Image src={logo} alt={title} fill className="object-contain" priority />
          </div>
          <LessonTitle>{title}</LessonTitle>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5">
          {groups.map((group, index) => {
            const unlocked = isGroupUnlocked(group.id, gameId);
            const courseProgress = allProgress[gameId] || { completedGroups: [] };
            const isCompleted = courseProgress.completedGroups.includes(group.id);

            // Check premium locking: if group requires premium and user doesn't have it
            const groupRequiresPremium = !!group.isPremium;
            const premiumLocked = groupRequiresPremium && (!isLoggedIn || !isPremium);
            const isLocked = !unlocked || premiumLocked;

            const handleGroupClick = premiumLocked
              ? (e: React.MouseEvent) => {
                  e.preventDefault();
                  if (!isLoggedIn) {
                    showPaywall("login", `/games/${gameId}/${group.id}`);
                  } else {
                    showPaywall("premium", `/games/${gameId}/${group.id}`);
                  }
                }
              : undefined;

            return (
              <GroupCard
                key={group.id}
                path={`/games/${gameId}/${group.id}`}
                title={group.title}
                variant={group.variant}
                isLocked={isLocked}
                mainImage={group.logo}
                level={index + 1}
                isCompleted={isCompleted}
                isPremiumLocked={premiumLocked}
                onLockedClick={handleGroupClick}
              />
            );
          })}
        </div>
      </main>
    </GameLayout>
  );
};

