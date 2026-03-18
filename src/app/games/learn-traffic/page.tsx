import { GROUPS } from "@/features/games/learn-traffic/constants";
const GameTrafficLogo = "https://assets.cuthongminh.com/games/learn-traffic/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnTrafficPage() {
  return <GameWrapGroups logo={GameTrafficLogo} gameId="learn-traffic" groups={GROUPS} title="An Toàn Giao Thông" />;
}
