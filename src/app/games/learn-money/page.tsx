import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
import { GROUPS } from "@/features/games/learn-money/constants";
const MoneyLogo = "https://assets.cuthongminh.com/games/learn-money/logo.webp";

export const metadata: Metadata = getGameMetadata("learn-money");

export default function LearnMoneyPage() {
  return (
    <>
      <GameWrapGroups logo={MoneyLogo} gameId="learn-money" groups={GROUPS} title="Tiền Việt Nam" />
      <GameSeoSection gameId="learn-money" />
    </>
  );
}
