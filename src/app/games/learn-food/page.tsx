import { GROUPS } from "@/features/games/learn-food/constants";
const GameFoodLogo = "https://assets.cuthongminh.com/games/learn-food/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnFoodPage() {
  return <GameWrapGroups logo={GameFoodLogo} gameId="learn-food" groups={GROUPS} title="Học Món Ăn" />;
}
