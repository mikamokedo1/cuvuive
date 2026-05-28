import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { GROUPS } from "@/features/games/talk-with-owl/constants";
import { GameWrapGroupsFree } from "@/components/layout/GameWrapGroupsFree";

const LOGO = "https://assets.cuthongminh.com/assets/logo.webp";

export const metadata: Metadata = getGameMetadata("talk-with-owl");

export default function TalkWithOwlPage() {
  return (
    <>
      <GameWrapGroupsFree logo={LOGO} gameId="talk-with-owl" groups={GROUPS} title="Giao Tiếp Tiếng Anh" />
      <GameSeoSection gameId="talk-with-owl" />
    </>
  );
}
