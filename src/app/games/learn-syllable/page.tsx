import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-syllable/constants";
const GameSyllableLogo = "https://assets.cuthongminh.com/games/learn-syllable/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-syllable"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-syllable` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-syllable`,
    type: "website",
  },
};

export default function LearnSyllablePage() {
  return (
    <>
      <GameWrapGroups logo={GameSyllableLogo} gameId="learn-syllable" groups={GROUPS} title="Ghép Vần" />
      <GameSeoSection gameId="learn-syllable" />
    </>
  );
}
