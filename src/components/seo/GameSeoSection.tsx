import Link from "next/link";
import { GAME_SEO } from "@/libs/constants/game-seo";

interface GameSeoSectionProps {
  gameId: string;
}

/**
 * Server Component that renders SEO-friendly text content below game interface.
 * Includes BreadcrumbList JSON-LD, related games internal links, and optional VideoObject schema.
 */
export function GameSeoSection({ gameId }: GameSeoSectionProps) {
  const seo = GAME_SEO[gameId];
  if (!seo) return null;

  const gameTitle = seo.title.split(" - ")[0];
  const gameUrl = `https://cuthongminh.com/games/${gameId}`;

  // WebApplication JSON-LD
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

  // BreadcrumbList JSON-LD (Fix #4)
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://cuthongminh.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Trò chơi",
        item: "https://cuthongminh.com/games",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: gameTitle,
        item: gameUrl,
      },
    ],
  };

  // Optional VideoObject JSON-LD (Fix #11)
  const videoJsonLd = seo.videoUrl
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: `${gameTitle} - Hướng dẫn`,
        description: seo.description,
        thumbnailUrl: seo.ogImage,
        uploadDate: "2026-01-01",
        contentUrl: seo.videoUrl,
        publisher: {
          "@type": "Organization",
          name: "Cú Thông Minh",
          url: "https://cuthongminh.com",
        },
      }
    : null;

  // Related games (Fix #6)
  const relatedGames = seo.relatedGames
    .map((id) => {
      const related = GAME_SEO[id];
      if (!related) return null;
      return { id, title: related.title.split(" - ")[0], ogImage: related.ogImage };
    })
    .filter(Boolean) as { id: string; title: string; ogImage: string }[];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {videoJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      )}

      <section className="max-w-3xl mx-auto px-6 py-10 text-slate-600 font-[family-name:var(--font-nunito-sans)]">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 font-[family-name:var(--font-baloo-2)]">
          {gameTitle}
        </h2>
        <p className="text-base leading-relaxed mb-6">{seo.seoText}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {seo.seoFeatures.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-orange-500 shrink-0">✦</span>
              <span className="text-sm text-slate-500">{feature}</span>
            </div>
          ))}
        </div>

        {/* Related Games — Internal Linking (Fix #6) */}
        {relatedGames.length > 0 && (
          <div className="mt-10 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 font-[family-name:var(--font-baloo-2)]">
              Trò chơi liên quan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 transition-colors group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={game.ogImage}
                    alt={game.title}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg object-contain"
                    loading="lazy"
                  />
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {game.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Blog Posts — Internal Linking for SEO */}
        {seo.relatedBlogs && seo.relatedBlogs.length > 0 && (
          <div className="mt-8 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 font-[family-name:var(--font-baloo-2)]">
              📚 Bài viết liên quan
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {seo.relatedBlogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blogs/${blog.slug}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 transition-colors group"
                >
                  <span className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {blog.title}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0 text-slate-400 group-hover:text-orange-500 transition-colors">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
