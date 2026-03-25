import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-syllable/constants";
const GameSyllableLogo = "https://assets.cuthongminh.com/games/learn-syllable/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-syllable");

export default function LearnSyllablePage() {
  return (
    <>
      <GameWrapGroups logo={GameSyllableLogo} gameId="learn-syllable" groups={GROUPS} title="Ghép Vần" />
      <GameSeoSection gameId="learn-syllable" />
    </>
  );
}
