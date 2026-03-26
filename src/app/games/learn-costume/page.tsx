import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-costume/constants";
const GameCostumeLogo = "https://assets.cuthongminh.com/games/learn-costume/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export const metadata: Metadata = getGameMetadata("learn-costume");

export default function LearnCostumePage() {
  return (
    <>
      <GameWrapGroups logo={GameCostumeLogo} gameId="learn-costume" groups={GROUPS} title="Trang Phục Thế Giới" />
      <GameSeoSection gameId="learn-costume" />
    </>
  );
}
