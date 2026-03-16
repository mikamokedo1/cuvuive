import { GROUPS } from "@/features/games/learn-weather/constants";
const GameWeatherLogo = "https://assets.cuthongminh.com/games/learn-weather/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnWeatherPage() {
  return <GameWrapGroups logo={GameWeatherLogo} gameId="learn-weather" groups={GROUPS} title="Học Thời Tiết" />;
}
