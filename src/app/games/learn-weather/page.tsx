import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-weather/constants";
const GameWeatherLogo = "https://assets.cuthongminh.com/games/learn-weather/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


export const metadata: Metadata = getGameMetadata("learn-weather");

export default function LearnWeatherPage() {
  return (
    <>
      <GameWrapGroups logo={GameWeatherLogo} gameId="learn-weather" groups={GROUPS} title="Học Thời Tiết" />
      <GameSeoSection gameId="learn-weather" />
    </>
  );
}
