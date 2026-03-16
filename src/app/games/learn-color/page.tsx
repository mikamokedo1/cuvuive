import { GROUPS } from "@/features/games/learn-color/constants";
const GameColorLogo = "https://assets.cuthongminh.com/games/learn-color-color.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnColorPage() {
  return <GameWrapGroups logo={GameColorLogo} gameId="learn-color" groups={GROUPS} title="Học màu sắc" />;
}
