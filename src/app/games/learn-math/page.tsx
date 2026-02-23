import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
import { GROUPS } from "@/features/games/learn-math/constants";
import MathLogo from "@/assets/games/learn-math/logo.png";

export default function LearnMathPage() {
  return <GameWrapGroups logo={MathLogo} gameId="learn-math" groups={GROUPS} title="Học Toán Đơn Giản" />;
}
