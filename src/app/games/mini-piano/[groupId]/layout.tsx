import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";

const GAME_ID = "mini-piano";

export async function generateMetadata(): Promise<Metadata> {
  const seo = GAME_SEO[GAME_ID];
  if (!seo) return {};
  const gameTitle = seo.title.split(" - ")[0];
  return {
    title: `${gameTitle} - Cú Thông Minh`,
    description: seo.description,
    alternates: { canonical: `/games/${GAME_ID}` },
    openGraph: {
      title: `${gameTitle} - Cú Thông Minh`,
      description: seo.description,
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: gameTitle }],
    },
    robots: { index: false, follow: true },
  };
}

export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
