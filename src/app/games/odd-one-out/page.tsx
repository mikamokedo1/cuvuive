import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/odd-one-out/constants";
const GameOddOneOutLogo = "https://assets.cuthongminh.com/games/find-pattern/logo.webp"; // temporary logo reuse
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["odd-one-out"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/odd-one-out` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/odd-one-out`,
    type: "website",
  },
};

export default function OddOneOutPage() {
  return (
    <>
      <GameWrapGroups logo={GameOddOneOutLogo} gameId="odd-one-out" groups={GROUPS} title="Tìm Hình Khác Biệt" />
      <GameSeoSection gameId="odd-one-out" />
    </>
  );
}
