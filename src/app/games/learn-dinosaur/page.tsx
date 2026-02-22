import { GROUPS } from "@/features/games/learn-dinosaur/constants";
import GameDinosaurLogo from "@/assets/games/learn-dinosaur/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnDinosaurPage() {
  return <GameWrapGroups logo={GameDinosaurLogo} gameId="learn-dinosaur" groups={GROUPS} title="Học Khủng Long" />;
}
