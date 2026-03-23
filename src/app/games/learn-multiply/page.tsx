import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
import { GROUPS } from "@/features/games/learn-multiply/constants";
const MultiplyLogo = "https://assets.cuthongminh.com/games/learn-multiply/logo.webp";


const seo = GAME_SEO["learn-multiply"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-multiply` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-multiply`,
    type: "website",
  },
};

export default function LearnMultiplyPage() {
  return (
    <>
      <GameWrapGroups logo={MultiplyLogo} gameId="learn-multiply" groups={GROUPS} title="Học Phép Nhân" />
      <GameSeoSection gameId="learn-multiply" />
    </>
  );
}
