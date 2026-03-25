import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { COURSES } from "@/libs/constants/courses";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
const MiniPianoLogo = "https://assets.cuthongminh.com/games/mini-piano/logo.webp";


export const metadata: Metadata = getGameMetadata("mini-piano");

export default function MiniPianoRootPage() {
    const course = COURSES.find((c) => c.id === "mini-piano");
    if (!course) return null;
    const groups = course.groups.map((group) => ({
        ...group,
        description: group.description ?? group.title,
        logo: group.logo ?? MiniPianoLogo,
        variant: group.variant ?? "blue",
    }));

    return (
    <>
      <GameWrapGroups
            logo={MiniPianoLogo}
            gameId="mini-piano"
            groups={groups}
            title="Đàn Piano Tí Hon"
        />
      <GameSeoSection gameId="mini-piano" />
    </>
  );
}
