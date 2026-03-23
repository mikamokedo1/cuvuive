import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
import { GROUPS } from "@/features/games/learn-divide/constants";
const DivideLogo = "https://assets.cuthongminh.com/games/learn-divide/logo.webp";


const seo = GAME_SEO["learn-divide"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-divide` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-divide`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function LearnDividePage() {
  return (
    <>
      <GameWrapGroups logo={DivideLogo} gameId="learn-divide" groups={GROUPS} title="Học Phép Chia" />
      <GameSeoSection gameId="learn-divide" />
    </>
  );
}
