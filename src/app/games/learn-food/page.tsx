import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-food/constants";
const GameFoodLogo = "https://assets.cuthongminh.com/games/learn-food/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-food");

export default function LearnFoodPage() {
  return (
    <>
      <GameWrapGroups logo={GameFoodLogo} gameId="learn-food" groups={GROUPS} title="Học Món Ăn" />
      <GameSeoSection gameId="learn-food" />
    </>
  );
}
