import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-animal/constants";
const GameAnimalLogo = "https://assets.cuthongminh.com/games/learn-animal/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-animal"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-animal` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-animal`,
    type: "website",
  },
};

export default function LearnAnimalPage() {
  return (
    <>
      <GameWrapGroups logo={GameAnimalLogo} gameId="learn-animal" groups={GROUPS} title="Học Động Vật" />
      <GameSeoSection gameId="learn-animal" />
    </>
  );
}
