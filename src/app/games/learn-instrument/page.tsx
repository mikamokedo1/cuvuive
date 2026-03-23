import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-instrument/constants";
const GameInstrumentLogo = "https://assets.cuthongminh.com/games/learn-instrument/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-instrument"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-instrument` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-instrument`,
    type: "website",
  },
};

export default function LearnInstrumentPage() {
  return (
    <>
      <GameWrapGroups logo={GameInstrumentLogo} gameId="learn-instrument" groups={GROUPS} title="Học Nhạc Cụ" />
      <GameSeoSection gameId="learn-instrument" />
    </>
  );
}
