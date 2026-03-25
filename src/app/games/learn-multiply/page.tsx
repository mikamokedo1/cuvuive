import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
import { GROUPS } from "@/features/games/learn-multiply/constants";
const MultiplyLogo = "https://assets.cuthongminh.com/games/learn-multiply/logo.webp";


export const metadata: Metadata = getGameMetadata("learn-multiply");

export default function LearnMultiplyPage() {
  return (
    <>
      <GameWrapGroups logo={MultiplyLogo} gameId="learn-multiply" groups={GROUPS} title="Học Phép Nhân" />
      <GameSeoSection gameId="learn-multiply" />
    </>
  );
}
