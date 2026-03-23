import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-clock/constants";
const GameClockLogo = "https://assets.cuthongminh.com/games/learn-clock/logo-main.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["learn-clock"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-clock` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-clock`,
    type: "website",
  },
};

export default function LearnClockPage() {
  return (
    <>
      <GameWrapGroups logo={GameClockLogo} gameId="learn-clock" groups={GROUPS} title="Học Xem Đồng Hồ" />
      <GameSeoSection gameId="learn-clock" />
    </>
  );
}
