import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-english-alphabet/constants";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

const GameAlphabetLogo = "https://assets.cuthongminh.com/games/learn-english-alphabet/logo.webp";

export const metadata: Metadata = getGameMetadata("learn-english-alphabet");

export default function LearnEnglishAlphabetPage() {
  return (
    <>
      <GameWrapGroups logo={GameAlphabetLogo} gameId="learn-english-alphabet" groups={GROUPS} title="Bảng Chữ Cái Tiếng Anh" />
      <GameSeoSection gameId="learn-english-alphabet" />
    </>
  );
}
