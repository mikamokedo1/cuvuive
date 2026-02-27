import { GROUPS } from "@/features/games/learn-weather/constants";
import GameWeatherLogo from "@/assets/games/learn-weather/logo.png";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnWeatherPage() {
  return <GameWrapGroups logo={GameWeatherLogo} gameId="learn-weather" groups={GROUPS} title="Học Thời Tiết" />;
}
