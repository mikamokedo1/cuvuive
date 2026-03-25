import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-fruit/constants";
const GameFruitLogo = "https://assets.cuthongminh.com/games/learn-fruit/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-fruit");

export default function LearnFruitPage() {
  return (
    <>
      <GameWrapGroups logo={GameFruitLogo} gameId="learn-fruit" groups={GROUPS} title="Học Trái Cây" />
      <GameSeoSection gameId="learn-fruit" />
    </>
  );
}
