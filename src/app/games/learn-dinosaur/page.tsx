import { GROUPS } from "@/features/games/learn-dinosaur/constants";
const GameDinosaurLogo = "https://assets.cuthongminh.com/games/learn-dinosaur/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnDinosaurPage() {
  return <GameWrapGroups logo={GameDinosaurLogo} gameId="learn-dinosaur" groups={GROUPS} title="Học Khủng Long" />;
}
