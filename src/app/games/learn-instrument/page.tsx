import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-instrument/constants";
const GameInstrumentLogo = "https://assets.cuthongminh.com/games/learn-instrument/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-instrument");

export default function LearnInstrumentPage() {
  return (
    <>
      <GameWrapGroups logo={GameInstrumentLogo} gameId="learn-instrument" groups={GROUPS} title="Học Nhạc Cụ" />
      <GameSeoSection gameId="learn-instrument" />
    </>
  );
}
