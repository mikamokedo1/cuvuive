import { GROUPS } from "@/features/games/learn-tones/constants";
const GameLearnTonesLogo = "https://assets.cuthongminh.com/games/learn-tones/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnTonesPage() {
  return <GameWrapGroups logo={GameLearnTonesLogo} gameId="learn-tones" groups={GROUPS} title="Học Dấu Tiếng Việt" />;
}
