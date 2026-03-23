import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-body/constants";
const GameBodyLogo = "https://assets.cuthongminh.com/games/learn-body/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-body"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-body` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-body`,
    type: "website",
  },
};

export default function LearnBodyPage() {
  return (
    <>
      <GameWrapGroups logo={GameBodyLogo} gameId="learn-body" groups={GROUPS} title="Bộ Phận Cơ Thể" />
      <GameSeoSection gameId="learn-body" />
    </>
  );
}
