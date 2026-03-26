import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-flag/constants";
const GameFlagLogo = "https://assets.cuthongminh.com/games/learn-flag/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-flag");

export default function LearnFlagPage() {
  return (
    <>
      <GameWrapGroups logo={GameFlagLogo} gameId="learn-flag" groups={GROUPS} title="Học Cờ Quốc Gia" />
      <GameSeoSection gameId="learn-flag" />
    </>
  );
}
