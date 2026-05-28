"use client";
import { GameLayout } from "@/components/layout/GameLayout";
import { GroupCard } from "@/features/games/learn-game/GroupCard";
import Image from "next/image";
import { LessonTitle } from "@/components/games/LessonTitle";
import { GroupData } from "@/features/games/learn-vehicle/constants";
import { StaticImageData } from "next/image";

interface GameWrapGroupsFreeProps {
  logo: string | StaticImageData;
  gameId: string;
  groups: GroupData[];
  title: string;
}

/**
 * GameWrapGroupsFree — same UI as GameWrapGroups but with NO lock logic.
 * All groups are always unlocked and freely accessible.
 */
export const GameWrapGroupsFree = ({ logo, gameId, groups, title }: GameWrapGroupsFreeProps) => {
  return (
    <GameLayout showBackButton={true} backTo="/games">
      <main className="w-full">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center relative mb-8 pt-4">
          <div className="relative w-24 h-24 md:w-48 md:h-48 mb-4">
            <Image src={logo} alt={title} fill className="object-contain" priority />
          </div>
          <LessonTitle tag="h1">{title}</LessonTitle>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5">
          {groups.map((group, index) => (
            <GroupCard
              key={group.id}
              path={`/games/${gameId}/${group.id}`}
              title={group.title}
              variant={group.variant}
              isLocked={false}
              mainImage={group.logo}
              level={index + 1}
              isCompleted={false}
              isPremiumLocked={false}
            />
          ))}
        </div>
      </main>
    </GameLayout>
  );
};
