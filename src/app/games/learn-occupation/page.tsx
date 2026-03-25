import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-occupation/constants";
const GameOccupationLogo = "https://assets.cuthongminh.com/games/learn-occupation/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-occupation");

export default function LearnOccupationPage() {
  return (
    <>
      <GameWrapGroups logo={GameOccupationLogo} gameId="learn-occupation" groups={GROUPS} title="Học Nghề Nghiệp" />
      <GameSeoSection gameId="learn-occupation" />
    </>
  );
}
