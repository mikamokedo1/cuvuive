import { GAME_SEO } from "@/libs/constants/game-seo";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";

interface GameSchemaProps {
  courseId: string;
}

/**
 * Server Component that renders WebApplication JSON-LD for a game.
 */
export function GameSchema({ courseId }: GameSchemaProps) {
  const seo = GAME_SEO[courseId];
  if (!seo) return null;

  const gameTitle = seo.title.split(" - ")[0];
  const gameUrl = `https://cuthongminh.com/games/${courseId}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: gameTitle,
    description: seo.description,
    url: gameUrl,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "VND",
    },
    audience: {
      "@type": "ChildAudience",
      suggestedMinAge: "3",
      suggestedMaxAge: "8",
    },
    publisher: {
      "@type": "Organization",
      name: "Cú Thông Minh",
      url: "https://cuthongminh.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
    />
  );
}
