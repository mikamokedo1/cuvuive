import { GROUPS } from "@/features/games/learn-body/constants";
const GameBodyLogo = "https://assets.cuthongminh.com/games/learn-body/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnBodyPage() {
  return <GameWrapGroups logo={GameBodyLogo} gameId="learn-body" groups={GROUPS} title="Bộ Phận Cơ Thể" />;
}
