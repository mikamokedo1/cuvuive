import { GROUPS } from "@/features/games/learn-emotion/constants";
import GameEmotionLogo from "@/assets/games/learn-emotion/logo.png";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnEmotionPage() {
  return <GameWrapGroups logo={GameEmotionLogo} gameId="learn-emotion" groups={GROUPS} title="Nhận Biết Cảm Xúc" />;
}
