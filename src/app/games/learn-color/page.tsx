import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-color/constants";
const GameColorLogo = "https://assets.cuthongminh.com/games/learn-color-color.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-color");

export default function LearnColorPage() {
  return (
    <>
      <GameWrapGroups logo={GameColorLogo} gameId="learn-color" groups={GROUPS} title="Học màu sắc" />
      <GameSeoSection gameId="learn-color" />
    </>
  );
}
