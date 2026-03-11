import { GROUPS } from "@/features/games/learn-clock/constants";
const GameClockLogo = "https://assets.cuthongminh.com/games/learn-clock/logo-main.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnClockPage() {
  return <GameWrapGroups logo={GameClockLogo} gameId="learn-clock" groups={GROUPS} title="Học Xem Đồng Hồ" />;
}
