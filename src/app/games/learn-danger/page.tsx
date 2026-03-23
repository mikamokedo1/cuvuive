import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-danger/constants";
const GameDangerLogo = "https://assets.cuthongminh.com/games/learn-danger/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-danger"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-danger` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-danger`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function LearnDangerPage() {
  return (
    <>
      <GameWrapGroups logo={GameDangerLogo} gameId="learn-danger" groups={GROUPS} title="Đồ Vật Nguy Hiểm" />
      <GameSeoSection gameId="learn-danger" />
    </>
  );
}
