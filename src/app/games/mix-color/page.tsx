import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/mix-color/constants";
const GameColorLogo = "https://assets.cuthongminh.com/games/mix-color/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["mix-color"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/mix-color` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/mix-color`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function MixColorPage() {
  return (
    <>
      <GameWrapGroups logo={GameColorLogo} gameId="mix-color" groups={GROUPS} title="Pha Màu" />
      <GameSeoSection gameId="mix-color" />
    </>
  );
}
