import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-shape/constants";
const GameShapeLogo = "https://assets.cuthongminh.com/games/learn-shape/learn-shape-logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-shape");

export default function LearnShapePage() {
  return (
    <>
      <GameWrapGroups logo={GameShapeLogo} gameId="learn-shape" groups={GROUPS} title="Học Hình Dạng" />
      <GameSeoSection gameId="learn-shape" />
    </>
  );
}
