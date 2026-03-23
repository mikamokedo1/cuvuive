import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-fruit/constants";
const GameFruitLogo = "https://assets.cuthongminh.com/games/learn-fruit/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-fruit"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-fruit` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-fruit`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function LearnFruitPage() {
  return (
    <>
      <GameWrapGroups logo={GameFruitLogo} gameId="learn-fruit" groups={GROUPS} title="Học Trái Cây" />
      <GameSeoSection gameId="learn-fruit" />
    </>
  );
}
