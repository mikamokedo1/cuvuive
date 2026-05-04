import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/learn-english-songs/constants";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

const GameSongsLogo = "https://assets.cuthongminh.com/games/learn-english-songs/logo.webp";

export const metadata: Metadata = getGameMetadata("learn-english-songs");

export default function LearnEnglishSongsPage() {
  return (
    <>
      <GameWrapGroups logo={GameSongsLogo} gameId="learn-english-songs" groups={GROUPS} title="Học Qua Bài Hát" />
      <GameSeoSection gameId="learn-english-songs" />
    </>
  );
}
