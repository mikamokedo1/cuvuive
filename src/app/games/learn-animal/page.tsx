import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-animal/constants";
const GameAnimalLogo = "https://assets.cuthongminh.com/games/learn-animal/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-animal");

export default function LearnAnimalPage() {
  return (
    <>
      <GameWrapGroups logo={GameAnimalLogo} gameId="learn-animal" groups={GROUPS} title="Học Động Vật" />
      <GameSeoSection gameId="learn-animal" />
    </>
  );
}
