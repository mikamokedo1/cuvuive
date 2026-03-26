import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/odd-one-out/constants";
const GameOddOneOutLogo = "https://assets.cuthongminh.com/games/find-pattern/logo.webp"; // temporary logo reuse
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("odd-one-out");

export default function OddOneOutPage() {
  return (
    <>
      <GameWrapGroups logo={GameOddOneOutLogo} gameId="odd-one-out" groups={GROUPS} title="Tìm Hình Khác Biệt" />
      <GameSeoSection gameId="odd-one-out" />
    </>
  );
}
