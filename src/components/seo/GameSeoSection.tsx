import { GAME_SEO } from "@/libs/constants/game-seo";

interface GameSeoSectionProps {
  gameId: string;
}

/**
 * Server Component that renders SEO-friendly text content below game interface.
 * This helps Googlebot discover meaningful text content on game pages.
 */
export function GameSeoSection({ gameId }: GameSeoSectionProps) {
  const seo = GAME_SEO[gameId];
  if (!seo) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: seo.title.split(" - ")[0],
    description: seo.description,
    url: `https://cuthongminh.com/games/${gameId}`,
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="max-w-3xl mx-auto px-6 py-10 text-slate-600 font-[family-name:var(--font-nunito-sans)]">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 font-[family-name:var(--font-baloo-2)]">
          {seo.title.split(" - ")[0]}
        </h2>
        <p className="text-base leading-relaxed mb-6">{seo.seoText}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {seo.seoFeatures.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5 shrink-0">✦</span>
              <span className="text-sm text-slate-500">{feature}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
