import { GROUPS } from "@/features/games/learn-flower/constants";
const GameFlowerLogo = "https://assets.cuthongminh.com/games/learn-flower/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnFlowerPage() {
  return <GameWrapGroups logo={GameFlowerLogo} gameId="learn-flower" groups={GROUPS} title="Học Hoa & Cây" />;
}
