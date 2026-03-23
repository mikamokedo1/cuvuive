import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-hygiene/constants";
const GameHygieneLogo = "https://assets.cuthongminh.com/games/learn-hygiene/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-hygiene"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-hygiene` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-hygiene`,
    type: "website",
  },
};

export default function LearnHygienePage() {
  return (
    <>
      <GameWrapGroups logo={GameHygieneLogo} gameId="learn-hygiene" groups={GROUPS} title="Học Vệ Sinh Cá Nhân" />
      <GameSeoSection gameId="learn-hygiene" />
    </>
  );
}
