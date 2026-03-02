import { GROUPS } from "@/features/games/find-pattern/constants";
import GamePatternLogo from "@/assets/games/find-pattern/logo.png";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function FindPatternPage() {
  return <GameWrapGroups logo={GamePatternLogo} gameId="find-pattern" groups={GROUPS} title="Tìm Quy Luật" />;
}
