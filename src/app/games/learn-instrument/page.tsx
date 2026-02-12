import { GROUPS } from "@/features/games/learn-instrument/constants";
import GameInstrumentLogo from "@/assets/games/learn-instrument/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnInstrumentPage() {
  return <GameWrapGroups logo={GameInstrumentLogo} gameId="learn-instrument" groups={GROUPS} title="Học Nhạc Cụ" />;
}
