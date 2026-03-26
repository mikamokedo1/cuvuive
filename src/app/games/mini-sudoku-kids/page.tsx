import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/mini-sudoku-kids/constants";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

const GameLogo = "https://assets.cuthongminh.com/games/mini-sudoku-kids/logo.webp";

export const metadata: Metadata = getGameMetadata("mini-sudoku-kids");

export default function MiniSudokuKidsPage() {
  return (
    <>
      <GameWrapGroups logo={GameLogo} gameId="mini-sudoku-kids" groups={GROUPS} title="Sudoku" />
      <GameSeoSection gameId="mini-sudoku-kids" />
    </>
  );
}
