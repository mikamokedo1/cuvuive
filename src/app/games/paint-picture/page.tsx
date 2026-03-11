import { GROUPS } from "@/features/games/paint-picture/constants";
const GameLogo = "https://assets.cuthongminh.com/games/paint-picture/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function PaintPicturePage() {
  return <GameWrapGroups logo={GameLogo} gameId="paint-picture" groups={GROUPS} title="Tô Màu" />;
}
