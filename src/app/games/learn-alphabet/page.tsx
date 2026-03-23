import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-alphabet/constants";
const GameAlphabetLogo = "https://assets.cuthongminh.com/games/learn-alphabet/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-alphabet"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-alphabet` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-alphabet`,
    type: "website",
  },
};

export default function LearnAlphabetPage() {
  return (
    <>
      <GameWrapGroups logo={GameAlphabetLogo} gameId="learn-alphabet" groups={GROUPS} title="Bảng Chữ Cái" />
      <GameSeoSection gameId="learn-alphabet" />
    </>
  );
}
