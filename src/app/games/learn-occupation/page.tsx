import { GROUPS } from "@/features/games/learn-occupation/constants";
import GameOccupationLogo from "@/assets/games/learn-occupation/logo.png";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnOccupationPage() {
  return <GameWrapGroups logo={GameOccupationLogo} gameId="learn-occupation" groups={GROUPS} title="Học Nghề Nghiệp" />;
}
