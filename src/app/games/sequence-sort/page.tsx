import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/sequence-sort/constants";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

const GameSequenceSortLogo = "https://assets.cuthongminh.com/games/sequence-sort/logo.webp";

export const metadata: Metadata = getGameMetadata("sequence-sort");

export default function SequenceSortPage() {
  return (
    <>
      <GameWrapGroups logo={GameSequenceSortLogo} gameId="sequence-sort" groups={GROUPS} title="Sắp Xếp" />
      <GameSeoSection gameId="sequence-sort" />
    </>
  );
}
