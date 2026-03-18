import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
import { GROUPS } from "@/features/games/learn-multiply/constants";
const MultiplyLogo = "https://assets.cuthongminh.com/games/learn-multiply/logo.webp";

export default function LearnMultiplyPage() {
  return <GameWrapGroups logo={MultiplyLogo} gameId="learn-multiply" groups={GROUPS} title="Học Phép Nhân" />;
}
