import { GROUPS } from "@/features/games/learn-hygiene/constants";
const GameHygieneLogo = "https://assets.cuthongminh.com/games/learn-hygiene/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnHygienePage() {
  return <GameWrapGroups logo={GameHygieneLogo} gameId="learn-hygiene" groups={GROUPS} title="Học Vệ Sinh Cá Nhân" />;
}
