import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
import { GROUPS } from "@/features/games/learn-math/constants";
const MathLogo = "https://assets.cuthongminh.com/games/learn-math/logo.webp";

export default function LearnMathPage() {
  return <GameWrapGroups logo={MathLogo} gameId="learn-math" groups={GROUPS} title="Học Toán Đơn Giản" />;
}
