import { GROUPS } from "@/features/games/learn-animal/constants";
import GameAnimalLogo from "@/assets/games/learn-animal/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnAnimalPage() {
  return <GameWrapGroups logo={GameAnimalLogo} gameId="learn-animal" groups={GROUPS} title="Học Động Vật" />;
}
