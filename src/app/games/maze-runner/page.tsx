import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/maze-runner/constants";
const GameMazeRunnerLogo = "https://assets.cuthongminh.com/games/maze-runner/logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";


const seo = GAME_SEO["maze-runner"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/maze-runner` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/maze-runner`,
    type: "website",
  },
};

export default function MazeRunnerPage() {
  return (
    <>
      <GameWrapGroups logo={GameMazeRunnerLogo} gameId="maze-runner" groups={GROUPS} title="Mê Cung Phiêu Lưu" />
      <GameSeoSection gameId="maze-runner" />
    </>
  );
}
