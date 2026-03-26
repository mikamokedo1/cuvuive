import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-hygiene/constants";
const GameHygieneLogo = "https://assets.cuthongminh.com/games/learn-hygiene/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-hygiene");

export default function LearnHygienePage() {
  return (
    <>
      <GameWrapGroups logo={GameHygieneLogo} gameId="learn-hygiene" groups={GROUPS} title="Học Vệ Sinh Cá Nhân" />
      <GameSeoSection gameId="learn-hygiene" />
    </>
  );
}
