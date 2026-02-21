import { GROUPS } from "@/features/games/learn-food/constants";
import GameFoodLogo from "@/assets/games/learn-food/logo.png";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnFoodPage() {
  return <GameWrapGroups logo={GameFoodLogo} gameId="learn-food" groups={GROUPS} title="Học Món Ăn" />;
}
