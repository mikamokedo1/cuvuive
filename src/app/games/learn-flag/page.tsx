import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-flag/constants";
const GameFlagLogo = "https://assets.cuthongminh.com/games/learn-flag/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-flag"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-flag` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-flag`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function LearnFlagPage() {
  return (
    <>
      <GameWrapGroups logo={GameFlagLogo} gameId="learn-flag" groups={GROUPS} title="Học Cờ Quốc Gia" />
      <GameSeoSection gameId="learn-flag" />
    </>
  );
}
