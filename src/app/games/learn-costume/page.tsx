import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-costume/constants";
const GameCostumeLogo = "https://assets.cuthongminh.com/games/learn-flag/logo.webp"; // Using placeholder for now
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-costume"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-costume` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-costume`,
    type: "website",
  },
};

export default function LearnCostumePage() {
  return (
    <>
      <GameWrapGroups logo={GameCostumeLogo} gameId="learn-costume" groups={GROUPS} title="Trang Phục Thế Giới" />
      <GameSeoSection gameId="learn-costume" />
    </>
  );
}
