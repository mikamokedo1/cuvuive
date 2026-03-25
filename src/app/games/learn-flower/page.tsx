import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-flower/constants";
const GameFlowerLogo = "https://assets.cuthongminh.com/games/learn-flower/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-flower");

export default function LearnFlowerPage() {
  return (
    <>
      <GameWrapGroups logo={GameFlowerLogo} gameId="learn-flower" groups={GROUPS} title="Học Hoa & Cây" />
      <GameSeoSection gameId="learn-flower" />
    </>
  );
}
