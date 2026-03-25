import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-emotion/constants";
const GameEmotionLogo = "https://assets.cuthongminh.com/games/learn-emotion/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-emotion");

export default function LearnEmotionPage() {
  return (
    <>
      <GameWrapGroups logo={GameEmotionLogo} gameId="learn-emotion" groups={GROUPS} title="Nhận Biết Cảm Xúc" />
      <GameSeoSection gameId="learn-emotion" />
    </>
  );
}
