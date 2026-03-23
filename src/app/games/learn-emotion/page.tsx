import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-emotion/constants";
const GameEmotionLogo = "https://assets.cuthongminh.com/games/learn-emotion/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-emotion"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-emotion` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-emotion`,
    type: "website",
  },
};

export default function LearnEmotionPage() {
  return (
    <>
      <GameWrapGroups logo={GameEmotionLogo} gameId="learn-emotion" groups={GROUPS} title="Nhận Biết Cảm Xúc" />
      <GameSeoSection gameId="learn-emotion" />
    </>
  );
}
