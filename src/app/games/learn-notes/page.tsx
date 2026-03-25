import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { COURSES } from "@/libs/constants/courses";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
const LearnNotesLogo = "https://assets.cuthongminh.com/games/learn-notes/logo.webp";


export const metadata: Metadata = getGameMetadata("learn-notes");

export default function LearnNotesRootPage() {
  const course = COURSES.find((c) => c.id === "learn-notes");
  if (!course) return null;
  const groups = course.groups.map((group) => ({
    ...group,
    description: group.description ?? group.title,
    logo: group.logo ?? LearnNotesLogo,
    variant: group.variant ?? "purple",
  }));

  return (
    <>
      <GameWrapGroups
      logo={LearnNotesLogo}
      gameId="learn-notes"
      groups={groups}
      title="Học Nốt Nhạc"
    />
      <GameSeoSection gameId="learn-notes" />
    </>
  );
}
