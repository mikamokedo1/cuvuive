import { GROUPS } from "@/features/games/maze-runner/constants";
import GameMazeRunnerLogo from "@/assets/games/maze-runner/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function MazeRunnerPage() {
  return <GameWrapGroups logo={GameMazeRunnerLogo} gameId="maze-runner" groups={GROUPS} title="Mê Cung Phiêu Lưu" />;
}
