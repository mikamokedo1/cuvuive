import { GROUPS } from "@/features/games/learn-hygiene/constants";
import GameHygieneLogo from "@/assets/games/learn-hygiene/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnHygienePage() {
  return <GameWrapGroups logo={GameHygieneLogo} gameId="learn-hygiene" groups={GROUPS} title="Học Vệ Sinh Cá Nhân" />;
}
