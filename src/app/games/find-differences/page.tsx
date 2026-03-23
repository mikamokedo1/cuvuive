import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { FIND_DIFFERENCES_DATA } from "@/features/games/find-differences/constans";
const GameFindDifferencesLogo = "https://assets.cuthongminh.com/games/game-4-logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["find-differences"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/find-differences` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/find-differences`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function FindDifferencesPage() {
  return (
    <>
      <GameWrapGroups
      logo={GameFindDifferencesLogo}
      gameId="find-differences"
      groups={FIND_DIFFERENCES_DATA}
      title="Tìm Điểm Khác Biệt"
    />
      <GameSeoSection gameId="find-differences" />
    </>
  );
}
