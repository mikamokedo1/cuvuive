import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-danger/constants";
const GameDangerLogo = "https://assets.cuthongminh.com/games/learn-danger/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-danger");

export default function LearnDangerPage() {
  return (
    <>
      <GameWrapGroups logo={GameDangerLogo} gameId="learn-danger" groups={GROUPS} title="Đồ Vật Nguy Hiểm" />
      <GameSeoSection gameId="learn-danger" />
    </>
  );
}
