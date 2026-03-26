import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-cleaning/constants";
const GameCleaningLogo = "https://assets.cuthongminh.com/games/learn-cleaning/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-cleaning");

export default function LearnCleaningPage() {
  return (
    <>
      <GameWrapGroups logo={GameCleaningLogo} gameId="learn-cleaning" groups={GROUPS} title="Học Dọn Dẹp" />
      <GameSeoSection gameId="learn-cleaning" />
    </>
  );
}
