import { GROUPS } from "@/features/games/learn-tones/constants";
import GameLearnTonesLogo from "@/assets/games/learn-tones/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnTonesPage() {
  return <GameWrapGroups logo={GameLearnTonesLogo} gameId="learn-tones" groups={GROUPS} title="Học Dấu Tiếng Việt" />;
}
