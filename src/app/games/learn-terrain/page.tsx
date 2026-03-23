import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-terrain/constants";
const GameLogo = "https://assets.cuthongminh.com/games/learn-terrain/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-terrain"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-terrain` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-terrain`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function LearnTerrainPage() {
  return (
    <>
      <GameWrapGroups logo={GameLogo} gameId="learn-terrain" groups={GROUPS} title="Học Địa Hình" />
      <GameSeoSection gameId="learn-terrain" />
    </>
  );
}
