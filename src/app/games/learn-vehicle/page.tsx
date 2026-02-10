import { GROUPS } from "@/features/games/learn-vehicle/constants";
import GameVehicleLogo from "@/assets/games/learn-vehicle/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnVehiclePage() {
  return <GameWrapGroups logo={GameVehicleLogo} gameId="learn-vehicle" groups={GROUPS} title="Học Phương Tiện" />;
}
