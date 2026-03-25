import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-body/constants";
const GameBodyLogo = "https://assets.cuthongminh.com/games/learn-body/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-body");

export default function LearnBodyPage() {
  return (
    <>
      <GameWrapGroups logo={GameBodyLogo} gameId="learn-body" groups={GROUPS} title="Bộ Phận Cơ Thể" />
      <GameSeoSection gameId="learn-body" />
    </>
  );
}
