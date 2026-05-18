import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-english-vocab/constants";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

const GameEnglishLogo = "https://assets.cuthongminh.com/games/learn-english-vocab/logo.webp";

export const metadata: Metadata = getGameMetadata("learn-english-vocab");

export default function LearnEnglishVocabPage() {
  return (
    <>
      <GameWrapGroups logo={GameEnglishLogo} gameId="learn-english-vocab" groups={GROUPS} title="Học Từ Vựng Tiếng Anh" />
      <GameSeoSection gameId="learn-english-vocab" />
    </>
  );
}
