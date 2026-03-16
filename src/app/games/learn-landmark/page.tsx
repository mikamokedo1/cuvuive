import { GROUPS } from "@/features/games/learn-landmark/constants";
const GameLogo = "https://assets.cuthongminh.com/games/learn-landmark/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnLandmarkPage() {
  return <GameWrapGroups logo={GameLogo} gameId="learn-landmark" groups={GROUPS} title="Học Địa Danh" />;
}
