import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/line-connect/constants";
const GameLineConnectLogo = "https://assets.cuthongminh.com/games/line-connect/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["line-connect"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/line-connect` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/line-connect`,
    type: "website",
  },
};

export default function LineConnectGroupsPage() {
  return (
    <>
      <GameWrapGroups logo={GameLineConnectLogo} gameId="line-connect" groups={GROUPS} title="Nối Điểm Trí Tuệ" />
      <GameSeoSection gameId="line-connect" />
    </>
  );
}
