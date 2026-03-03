import { GROUPS } from "@/features/games/mix-color/constants";
import GameColorLogo from "@/assets/games/mix-color/logo.png";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function MixColorPage() {
  return <GameWrapGroups logo={GameColorLogo} gameId="mix-color" groups={GROUPS} title="Pha Màu" />;
}
