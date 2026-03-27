import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-word/constants";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

const GameWordLogo = "https://assets.cuthongminh.com/games/learn-word/logo.webp";

export const metadata: Metadata = getGameMetadata("learn-word");

export default function LearnWordPage() {
  return (
    <>
      <GameWrapGroups logo={GameWordLogo} gameId="learn-word" groups={GROUPS} title="Học Từ Vựng" />
      <GameSeoSection gameId="learn-word" />
    </>
  );
}
