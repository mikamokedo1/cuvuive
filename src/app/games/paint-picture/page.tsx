import { GROUPS } from "@/features/games/paint-picture/constants";
import GameLogo from "@/assets/games/paint-picture/logo.png";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function PaintPicturePage() {
  return <GameWrapGroups logo={GameLogo} gameId="paint-picture" groups={GROUPS} title="Tô Màu" />;
}
