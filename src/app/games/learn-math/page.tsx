import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
import { GROUPS } from "@/features/games/learn-math/constants";
const MathLogo = "https://assets.cuthongminh.com/games/learn-math/logo.webp";


export const metadata: Metadata = getGameMetadata("learn-math");

export default function LearnMathPage() {
  return (
    <>
      <GameWrapGroups logo={MathLogo} gameId="learn-math" groups={GROUPS} title="Học Toán Đơn Giản" />
      <GameSeoSection gameId="learn-math" />
    </>
  );
}
