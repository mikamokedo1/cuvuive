import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-landmark/constants";
const GameLogo = "https://assets.cuthongminh.com/games/learn-landmark/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-landmark"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-landmark` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-landmark`,
    type: "website",
  },
};

export default function LearnLandmarkPage() {
  return (
    <>
      <GameWrapGroups logo={GameLogo} gameId="learn-landmark" groups={GROUPS} title="Học Địa Danh" />
      <GameSeoSection gameId="learn-landmark" />
    </>
  );
}
