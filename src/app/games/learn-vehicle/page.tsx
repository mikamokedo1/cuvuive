import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-vehicle/constants";
const GameVehicleLogo = "https://assets.cuthongminh.com/games/learn-vehicle/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-vehicle"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-vehicle` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-vehicle`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function LearnVehiclePage() {
  return (
    <>
      <GameWrapGroups logo={GameVehicleLogo} gameId="learn-vehicle" groups={GROUPS} title="Học Phương Tiện" />
      <GameSeoSection gameId="learn-vehicle" />
    </>
  );
}
