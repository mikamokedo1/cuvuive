import { GROUPS } from "@/features/games/line-connect/constants";
import GameLineConnectLogo from "@/assets/games/line-connect/logo.png";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LineConnectGroupsPage() {
  return <GameWrapGroups logo={GameLineConnectLogo} gameId="line-connect" groups={GROUPS} title="Nối Điểm Trí Tuệ" />;
}
