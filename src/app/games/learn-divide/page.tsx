import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
import { GROUPS } from "@/features/games/learn-divide/constants";
const DivideLogo = "https://assets.cuthongminh.com/games/learn-divide/logo.webp";


export const metadata: Metadata = getGameMetadata("learn-divide");

export default function LearnDividePage() {
  return (
    <>
      <GameWrapGroups logo={DivideLogo} gameId="learn-divide" groups={GROUPS} title="Học Phép Chia" />
      <GameSeoSection gameId="learn-divide" />
    </>
  );
}
