import { GROUPS } from "@/features/games/learn-terrain/constants";
const GameLogo = "https://assets.cuthongminh.com/games/learn-terrain/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnTerrainPage() {
  return <GameWrapGroups logo={GameLogo} gameId="learn-terrain" groups={GROUPS} title="Học Địa Hình" />;
}
