import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/paint-picture/constants";
const GameLogo = "https://assets.cuthongminh.com/games/paint-picture/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("paint-picture");

export default function PaintPicturePage() {
  return (
    <>
      <GameWrapGroups logo={GameLogo} gameId="paint-picture" groups={GROUPS} title="Tô Màu" />
      <GameSeoSection gameId="paint-picture" />
    </>
  );
}
