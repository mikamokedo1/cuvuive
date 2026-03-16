import { GROUPS } from "@/features/games/line-connect/constants";
const GameLineConnectLogo = "https://assets.cuthongminh.com/games/line-connect/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LineConnectGroupsPage() {
  return <GameWrapGroups logo={GameLineConnectLogo} gameId="line-connect" groups={GROUPS} title="Nối Điểm Trí Tuệ" />;
}
