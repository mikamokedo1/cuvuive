import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-landmark/constants";
const GameLogo = "https://assets.cuthongminh.com/games/learn-landmark/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-landmark");

export default function LearnLandmarkPage() {
  return (
    <>
      <GameWrapGroups logo={GameLogo} gameId="learn-landmark" groups={GROUPS} title="Học Địa Danh" />
      <GameSeoSection gameId="learn-landmark" />
    </>
  );
}
