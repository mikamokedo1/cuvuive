import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { FIND_DIFFERENCES_DATA } from "@/features/games/find-differences/constans";
const GameFindDifferencesLogo = "https://assets.cuthongminh.com/games/game-4-logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("find-differences");

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
