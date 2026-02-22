import { GROUPS } from "@/features/games/learn-flower/constants";
import GameFlowerLogo from "@/assets/games/learn-flower/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnFlowerPage() {
  return <GameWrapGroups logo={GameFlowerLogo} gameId="learn-flower" groups={GROUPS} title="Học Hoa & Cây" />;
}
