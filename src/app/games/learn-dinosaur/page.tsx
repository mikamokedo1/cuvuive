import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-dinosaur/constants";
const GameDinosaurLogo = "https://assets.cuthongminh.com/games/learn-dinosaur/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-dinosaur"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-dinosaur` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-dinosaur`,
    type: "website",
  },
};

export default function LearnDinosaurPage() {
  return (
    <>
      <GameWrapGroups logo={GameDinosaurLogo} gameId="learn-dinosaur" groups={GROUPS} title="Học Khủng Long" />
      <GameSeoSection gameId="learn-dinosaur" />
    </>
  );
}
