import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-alphabet/constants";
const GameAlphabetLogo = "https://assets.cuthongminh.com/games/learn-alphabet/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-alphabet");

export default function LearnAlphabetPage() {
  return (
    <>
      <GameWrapGroups logo={GameAlphabetLogo} gameId="learn-alphabet" groups={GROUPS} title="Bảng Chữ Cái" />
      <GameSeoSection gameId="learn-alphabet" />
    </>
  );
}
