import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/mini-sudoku-kids/constants";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

const GameLogo = "https://assets.cuthongminh.com/games/mini-sudoku-kids/logo.webp";

const seo = GAME_SEO["mini-sudoku-kids"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/mini-sudoku-kids` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/mini-sudoku-kids`,
    type: "website",
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function MiniSudokuKidsPage() {
  return (
    <>
      <GameWrapGroups logo={GameLogo} gameId="mini-sudoku-kids" groups={GROUPS} title="Sudoku" />
      <GameSeoSection gameId="mini-sudoku-kids" />
    </>
  );
}
