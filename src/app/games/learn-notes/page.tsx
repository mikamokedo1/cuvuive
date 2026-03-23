import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { COURSES } from "@/libs/constants/courses";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
const LearnNotesLogo = "https://assets.cuthongminh.com/games/learn-notes/logo.webp";


const seo = GAME_SEO["learn-notes"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/learn-notes` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/learn-notes`,
    type: "website",
  },
};

export default function LearnNotesRootPage() {
  const course = COURSES.find((c) => c.id === "learn-notes");
  if (!course) return null;

  return (
    <>
      <GameWrapGroups
      logo={LearnNotesLogo}
      gameId="learn-notes"
      groups={course.groups as any}
      title="Học Nốt Nhạc"
    />
      <GameSeoSection gameId="learn-notes" />
    </>
  );
}
