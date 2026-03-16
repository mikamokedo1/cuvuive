import { GROUPS } from "@/features/games/learn-instrument/constants";
const GameInstrumentLogo = "https://assets.cuthongminh.com/games/learn-instrument/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnInstrumentPage() {
  return <GameWrapGroups logo={GameInstrumentLogo} gameId="learn-instrument" groups={GROUPS} title="Học Nhạc Cụ" />;
}
