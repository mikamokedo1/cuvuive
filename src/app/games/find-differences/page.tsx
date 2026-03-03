import { FIND_DIFFERENCES_DATA } from "@/features/games/find-differences/constans";
import GameFindDifferencesLogo from "@/assets/games/game-4-logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function FindDifferencesPage() {
  return (
    <GameWrapGroups
      logo={GameFindDifferencesLogo}
      gameId="find-differences"
      groups={FIND_DIFFERENCES_DATA}
      title="Tìm Điểm Khác Biệt"
    />
  );
}
