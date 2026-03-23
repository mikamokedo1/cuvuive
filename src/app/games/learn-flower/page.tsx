import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-flower/constants";
const GameFlowerLogo = "https://assets.cuthongminh.com/games/learn-flower/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-flower"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-flower` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-flower`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function LearnFlowerPage() {
  return (
    <>
      <GameWrapGroups logo={GameFlowerLogo} gameId="learn-flower" groups={GROUPS} title="Học Hoa & Cây" />
      <GameSeoSection gameId="learn-flower" />
    </>
  );
}
