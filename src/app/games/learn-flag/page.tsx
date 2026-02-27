import { GROUPS } from "@/features/games/learn-flag/constants";
import GameFlagLogo from "@/assets/games/learn-flag/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnFlagPage() {
  return <GameWrapGroups logo={GameFlagLogo} gameId="learn-flag" groups={GROUPS} title="Học Cờ Quốc Gia" />;
}
