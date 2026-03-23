import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-occupation/constants";
const GameOccupationLogo = "https://assets.cuthongminh.com/games/learn-occupation/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-occupation"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-occupation` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-occupation`,
    type: "website",
  },
};

export default function LearnOccupationPage() {
  return (
    <>
      <GameWrapGroups logo={GameOccupationLogo} gameId="learn-occupation" groups={GROUPS} title="Học Nghề Nghiệp" />
      <GameSeoSection gameId="learn-occupation" />
    </>
  );
}
