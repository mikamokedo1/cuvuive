import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-color/constants";
const GameColorLogo = "https://assets.cuthongminh.com/games/learn-color-color.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-color"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-color` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-color`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function LearnColorPage() {
  return (
    <>
      <GameWrapGroups logo={GameColorLogo} gameId="learn-color" groups={GROUPS} title="Học màu sắc" />
      <GameSeoSection gameId="learn-color" />
    </>
  );
}
