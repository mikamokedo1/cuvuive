import type { Metadata } from "next";
import { GAME_SEO } from "@/libs/constants/game-seo";

export function getGameMetadata(gameId: string): Metadata {
  const seo = GAME_SEO[gameId];
  if (!seo) {
    return {
      title: "Trò chơi không tồn tại | Cú Thông Minh",
    };
  }

  const url = `https://cuthongminh.com/games/${gameId}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/games/${gameId}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      type: "website",
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
    },
  };
}
