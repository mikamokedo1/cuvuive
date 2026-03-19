import { GROUPS } from "@/features/games/learn-cleaning/constants";
const GameCleaningLogo = "https://assets.cuthongminh.com/games/learn-cleaning/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnCleaningPage() {
  return <GameWrapGroups logo={GameCleaningLogo} gameId="learn-cleaning" groups={GROUPS} title="Học Dọn Dẹp" />;
}
