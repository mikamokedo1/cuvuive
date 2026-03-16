import { GROUPS } from "@/features/games/learn-syllable/constants";
const GameSyllableLogo = "https://assets.cuthongminh.com/games/learn-syllable/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnSyllablePage() {
  return <GameWrapGroups logo={GameSyllableLogo} gameId="learn-syllable" groups={GROUPS} title="Ghép Vần" />;
}
