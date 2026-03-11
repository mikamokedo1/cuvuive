import { GROUPS } from "@/features/games/odd-one-out/constants";
import GameOddOneOutLogo from "@/assets/games/find-pattern/logo.webp"; // temporary logo reuse
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function OddOneOutPage() {
  return <GameWrapGroups logo={GameOddOneOutLogo} gameId="odd-one-out" groups={GROUPS} title="Tìm Hình Khác Biệt" />;
}
