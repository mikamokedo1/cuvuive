import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-shape/constants";
const GameShapeLogo = "https://assets.cuthongminh.com/games/learn-shape/learn-shape-logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-shape"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-shape` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-shape`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function LearnShapePage() {
  return (
    <>
      <GameWrapGroups logo={GameShapeLogo} gameId="learn-shape" groups={GROUPS} title="Học Hình Dạng" />
      <GameSeoSection gameId="learn-shape" />
    </>
  );
}
