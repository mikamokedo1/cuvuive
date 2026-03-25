import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-traffic/constants";
const GameTrafficLogo = "https://assets.cuthongminh.com/games/learn-traffic/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-traffic");

export default function LearnTrafficPage() {
  return (
    <>
      <GameWrapGroups logo={GameTrafficLogo} gameId="learn-traffic" groups={GROUPS} title="An Toàn Giao Thông" />
      <GameSeoSection gameId="learn-traffic" />
    </>
  );
}
