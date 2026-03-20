"use client";

import { COURSES } from "@/libs/constants/courses";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
const LearnNotesLogo = "https://assets.cuthongminh.com/games/learn-notes/logo.webp";

export default function LearnNotesRootPage() {
  const course = COURSES.find((c) => c.id === "learn-notes");
  if (!course) return null;

  return (
    <GameWrapGroups
      logo={LearnNotesLogo}
      gameId="learn-notes"
      groups={course.groups as any}
      title="Học Nốt Nhạc"
    />
  );
}
