import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/libs/blog";
import { Tag, Clock, Calendar } from "lucide-react";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";
import { normalizeTagPathSegment } from "@/libs/utils/tag-slug";

interface PageProps {
  params: Promise<{ tag: string }>;
}

async function resolveCanonicalTag(rawTag: string): Promise<string | null> {
  const decodedTag = decodeURIComponent(rawTag);
  const posts = await getAllPosts();
  const matchedTag = posts
    .flatMap((post) => post.tags ?? [])
    .find((tag) => tag.toLowerCase() === decodedTag.toLowerCase());

  return matchedTag ?? null;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    if (post.tags) {
      post.tags.forEach((tag) => tagSet.add(normalizeTagPathSegment(tag)));
    }
  }
  return Array.from(tagSet).map((tag) => ({ tag: decodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const canonicalTag = await resolveCanonicalTag(tag);

  if (!canonicalTag) {
    return {
      title: "Không tìm thấy chủ đề",
      robots: { index: false, follow: false },
    };
  }

  const title = `Bài viết về "${canonicalTag}" | Blog Cú Thông Minh`;
  const description = `Tổng hợp các bài viết về chủ đề "${canonicalTag}" trên blog Cú Thông Minh - Kiến thức giáo dục sớm cho phụ huynh.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blogs/tag/${normalizeTagPathSegment(canonicalTag)}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const canonicalTag = await resolveCanonicalTag(tag);

  if (!canonicalTag) {
    notFound();
  }

  const normalizedTag = normalizeTagPathSegment(canonicalTag);
  if (tag !== normalizedTag) {
    permanentRedirect(`/blogs/tag/${normalizedTag}`);
  }

  const allPosts = await getAllPosts();
  const filteredPosts = allPosts.filter(
    (post) => post.tags && post.tags.some((t) => t.toLowerCase() === canonicalTag.toLowerCase()),
  );

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
        name: "Blog",
        item: "https://cuthongminh.com/blogs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: canonicalTag,
        item: `https://cuthongminh.com/blogs/tag/${normalizedTag}`,
      },
    ],
  };

  return (
    <div className="container mx-auto px-6 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6">
          <Tag className="w-4 h-4" />
          {canonicalTag}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-4 tracking-tight">
          Bài viết về &ldquo;{canonicalTag}&rdquo;
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          {filteredPosts.length} bài viết về chủ đề này
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredPosts.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {post.image && (
                <div className="relative aspect-[16/9] bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors font-[family-name:var(--font-baloo-2)]">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">{post.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime} phút
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Back to blog */}
      <div className="text-center mb-12">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-full transition-colors"
        >
          ← Xem tất cả bài viết
        </Link>
      </div>
    </div>
  );
}
