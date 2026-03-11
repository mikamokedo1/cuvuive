import { GROUPS } from "@/features/games/find-pattern/constants";
const GamePatternLogo = "https://assets.cuthongminh.com/games/find-pattern/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function FindPatternPage() {
  return <GameWrapGroups logo={GamePatternLogo} gameId="find-pattern" groups={GROUPS} title="Tìm Quy Luật" />;
}
