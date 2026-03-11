import { GROUPS } from "@/features/games/learn-emotion/constants";
const GameEmotionLogo = "https://assets.cuthongminh.com/games/learn-emotion/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

export default function LearnEmotionPage() {
  return <GameWrapGroups logo={GameEmotionLogo} gameId="learn-emotion" groups={GROUPS} title="Nhận Biết Cảm Xúc" />;
}
