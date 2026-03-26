import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-terrain/constants";
const GameLogo = "https://assets.cuthongminh.com/games/learn-terrain/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-terrain");

export default function LearnTerrainPage() {
  return (
    <>
      <GameWrapGroups logo={GameLogo} gameId="learn-terrain" groups={GROUPS} title="Học Địa Hình" />
      <GameSeoSection gameId="learn-terrain" />
    </>
  );
}
