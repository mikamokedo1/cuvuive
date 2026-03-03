"use client";
import { useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { GroupCard } from "@/features/games/learn-game/GroupCard";
import Image from "next/image";
import { LessonTitle } from "@/components/games/LessonTitle";
import { useProgress } from "@/context/ProgressContext";
import { GroupData } from "@/features/games/learn-vehicle/constants";
import { StaticImageData } from "next/image";

interface GameWrapGroups {
  logo: StaticImageData;
  gameId: string;
  groups: GroupData[];
  title: string;
}

export const GameWrapGroups = ({ logo, gameId, groups, title }: GameWrapGroups) => {
  const router = useRouter();
  const { isGroupUnlocked, isLoaded, allProgress } = useProgress();

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

  const handleGroupClick = (groupId: string) => {
    router.push(`/games/${gameId}/${groupId}`);
  };

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
};
