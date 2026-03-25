import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/line-connect/constants";
const GameLineConnectLogo = "https://assets.cuthongminh.com/games/line-connect/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("line-connect");

export default function LineConnectGroupsPage() {
  return (
    <>
      <GameWrapGroups logo={GameLineConnectLogo} gameId="line-connect" groups={GROUPS} title="Nối Điểm Trí Tuệ" />
      <GameSeoSection gameId="line-connect" />
    </>
  );
}
