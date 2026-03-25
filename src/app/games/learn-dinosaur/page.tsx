import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-dinosaur/constants";
const GameDinosaurLogo = "https://assets.cuthongminh.com/games/learn-dinosaur/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-dinosaur");

export default function LearnDinosaurPage() {
  return (
    <>
      <GameWrapGroups logo={GameDinosaurLogo} gameId="learn-dinosaur" groups={GROUPS} title="Học Khủng Long" />
      <GameSeoSection gameId="learn-dinosaur" />
    </>
  );
}
