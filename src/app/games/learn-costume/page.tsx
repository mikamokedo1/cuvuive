import { GROUPS } from "@/features/games/learn-costume/constants";
import GameCostumeLogo from "@/assets/games/learn-flag/logo.webp"; // Using placeholder for now
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnCostumePage() {
  return <GameWrapGroups logo={GameCostumeLogo} gameId="learn-costume" groups={GROUPS} title="Trang Phục Thế Giới" />;
}
