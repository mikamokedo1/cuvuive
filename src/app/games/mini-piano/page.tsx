import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
import { COURSES } from "@/libs/constants/courses";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
const MiniPianoLogo = "https://assets.cuthongminh.com/games/mini-piano/logo.webp";


const seo = GAME_SEO["mini-piano"];

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: `/games/mini-piano` },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `https://cuthongminh.com/games/mini-piano`,
    type: "website",
  images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
};

export default function MiniPianoRootPage() {
    const course = COURSES.find((c) => c.id === "mini-piano");
    if (!course) return null;

    return (
    <>
      <GameWrapGroups
            logo={MiniPianoLogo}
            gameId="mini-piano"
            groups={course.groups as any}
            title="Đàn Piano Tí Hon"
        />
      <GameSeoSection gameId="mini-piano" />
    </>
  );
}
