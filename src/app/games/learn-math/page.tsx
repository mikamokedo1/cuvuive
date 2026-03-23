import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
import { GROUPS } from "@/features/games/learn-math/constants";
const MathLogo = "https://assets.cuthongminh.com/games/learn-math/logo.webp";


const seo = GAME_SEO["learn-math"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-math` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-math`,
    type: "website",
  },
};

export default function LearnMathPage() {
  return (
    <>
      <GameWrapGroups logo={MathLogo} gameId="learn-math" groups={GROUPS} title="Học Toán Đơn Giản" />
      <GameSeoSection gameId="learn-math" />
    </>
  );
}
