import { GROUPS } from "@/features/games/learn-alphabet/constants";
const GameAlphabetLogo = "https://assets.cuthongminh.com/games/learn-alphabet/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnAlphabetPage() {
  return <GameWrapGroups logo={GameAlphabetLogo} gameId="learn-alphabet" groups={GROUPS} title="Bảng Chữ Cái" />;
}
