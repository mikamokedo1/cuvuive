import { GROUPS } from "@/features/games/learn-shape/constants";
const GameShapeLogo = "https://assets.cuthongminh.com/games/learn-shape/learn-shape-logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnShapePage() {
  return <GameWrapGroups logo={GameShapeLogo} gameId="learn-shape" groups={GROUPS} title="Học Hình Dạng" />;
}
