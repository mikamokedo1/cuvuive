import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/paint-picture/constants";
const GameLogo = "https://assets.cuthongminh.com/games/paint-picture/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["paint-picture"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/paint-picture` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/paint-picture`,
    type: "website",
  },
};

export default function PaintPicturePage() {
  return (
    <>
      <GameWrapGroups logo={GameLogo} gameId="paint-picture" groups={GROUPS} title="Tô Màu" />
      <GameSeoSection gameId="paint-picture" />
    </>
  );
}
