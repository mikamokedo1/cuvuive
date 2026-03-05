import { GROUPS } from "@/features/games/learn-landmark/constants";
import GameLogo from "@/assets/games/learn-landmark/logo.png";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnLandmarkPage() {
  return <GameWrapGroups logo={GameLogo} gameId="learn-landmark" groups={GROUPS} title="Học Địa Danh" />;
}
