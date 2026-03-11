import { GROUPS } from "@/features/games/line-connect/constants";
import GameMazeRunnerLogo from "@/assets/games/maze-runner/logo.png"; // Placeholder logo
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LineConnectGroupsPage() {
  return <GameWrapGroups logo={GameMazeRunnerLogo} gameId="line-connect" groups={GROUPS} title="Nối Điểm Trí Tuệ" />;
}
