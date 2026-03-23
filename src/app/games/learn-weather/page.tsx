import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-weather/constants";
const GameWeatherLogo = "https://assets.cuthongminh.com/games/learn-weather/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-weather"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-weather` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-weather`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function LearnWeatherPage() {
  return (
    <>
      <GameWrapGroups logo={GameWeatherLogo} gameId="learn-weather" groups={GROUPS} title="Học Thời Tiết" />
      <GameSeoSection gameId="learn-weather" />
    </>
  );
}
