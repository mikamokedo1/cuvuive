import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Reusable Breadcrumbs component — renders both visual breadcrumb UI
 * and BreadcrumbList JSON-LD structured data for SEO.
 *
 * Usage:
 *   <Breadcrumbs items={[
 *     { label: "Trang chủ", href: "/" },
 *     { label: "Blog", href: "/blogs" },
 *     { label: "Bài viết hiện tại", href: "/blogs/current-post" },
 *   ]} />
 */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  // Generate BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href.startsWith("http")
        ? item.href
        : `https://cuthongminh.com${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`mb-6 ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1.5 text-sm font-medium font-[family-name:var(--font-nunito-sans)]">
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-1.5">
                {/* Separator */}
                {!isFirst && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                )}

                {/* Breadcrumb item */}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-slate-500 hover:text-orange-500 transition-colors"
                  >
                    {isFirst && (
                      <Home className="w-3.5 h-3.5" />
                    )}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-slate-700 font-semibold">
                    {isFirst && (
                      <Home className="w-3.5 h-3.5" />
                    )}
                    <span className="line-clamp-1">{item.label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
