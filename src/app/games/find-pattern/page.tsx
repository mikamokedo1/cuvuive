import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/find-pattern/constants";
const GamePatternLogo = "https://assets.cuthongminh.com/games/find-pattern/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["find-pattern"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/find-pattern` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/find-pattern`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function FindPatternPage() {
  return (
    <>
      <GameWrapGroups logo={GamePatternLogo} gameId="find-pattern" groups={GROUPS} title="Tìm Quy Luật" />
      <GameSeoSection gameId="find-pattern" />
    </>
  );
}
