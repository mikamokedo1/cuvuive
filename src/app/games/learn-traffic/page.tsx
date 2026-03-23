import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-traffic/constants";
const GameTrafficLogo = "https://assets.cuthongminh.com/games/learn-traffic/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-traffic"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-traffic` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-traffic`,
    type: "website",
  },
};

export default function LearnTrafficPage() {
  return (
    <>
      <GameWrapGroups logo={GameTrafficLogo} gameId="learn-traffic" groups={GROUPS} title="An Toàn Giao Thông" />
      <GameSeoSection gameId="learn-traffic" />
    </>
  );
}
