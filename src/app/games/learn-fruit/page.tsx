import { GROUPS } from "@/features/games/learn-fruit/constants";
const GameFruitLogo = "https://assets.cuthongminh.com/games/learn-fruit/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnFruitPage() {
  return <GameWrapGroups logo={GameFruitLogo} gameId="learn-fruit" groups={GROUPS} title="Học Trái Cây" />;
}
