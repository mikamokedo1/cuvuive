import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-food/constants";
const GameFoodLogo = "https://assets.cuthongminh.com/games/learn-food/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-food"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-food` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-food`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function LearnFoodPage() {
  return (
    <>
      <GameWrapGroups logo={GameFoodLogo} gameId="learn-food" groups={GROUPS} title="Học Món Ăn" />
      <GameSeoSection gameId="learn-food" />
    </>
  );
}
