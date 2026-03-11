import { GROUPS } from "@/features/games/learn-costume/constants";
const GameCostumeLogo = "https://assets.cuthongminh.com/games/learn-flag/logo.webp"; // Using placeholder for now
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnCostumePage() {
  return <GameWrapGroups logo={GameCostumeLogo} gameId="learn-costume" groups={GROUPS} title="Trang Phục Thế Giới" />;
}
