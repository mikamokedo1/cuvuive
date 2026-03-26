import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-tones/constants";
const GameLearnTonesLogo = "https://assets.cuthongminh.com/games/learn-tones/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-tones");

export default function LearnTonesPage() {
  return (
    <>
      <GameWrapGroups logo={GameLearnTonesLogo} gameId="learn-tones" groups={GROUPS} title="Học Dấu Tiếng Việt" />
      <GameSeoSection gameId="learn-tones" />
    </>
  );
}
