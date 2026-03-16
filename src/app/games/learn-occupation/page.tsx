import { GROUPS } from "@/features/games/learn-occupation/constants";
const GameOccupationLogo = "https://assets.cuthongminh.com/games/learn-occupation/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnOccupationPage() {
  return <GameWrapGroups logo={GameOccupationLogo} gameId="learn-occupation" groups={GROUPS} title="Học Nghề Nghiệp" />;
}
