import { GROUPS } from "@/features/games/learn-alphabet/constants";
import GameAlphabetLogo from "@/assets/games/learn-alphabet/logo.png";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnAlphabetPage() {
  return <GameWrapGroups logo={GameAlphabetLogo} gameId="learn-alphabet" groups={GROUPS} title="Bảng Chữ Cái" />;
}
