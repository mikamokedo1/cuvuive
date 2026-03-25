import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/mix-color/constants";
const GameColorLogo = "https://assets.cuthongminh.com/games/mix-color/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("mix-color");

export default function MixColorPage() {
  return (
    <>
      <GameWrapGroups logo={GameColorLogo} gameId="mix-color" groups={GROUPS} title="Pha Màu" />
      <GameSeoSection gameId="mix-color" />
    </>
  );
}
