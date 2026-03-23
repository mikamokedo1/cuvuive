import Link from "next/link";
import { getAllPosts, getPaginatedPosts } from "@/libs/blog";
import Pagination from "@/components/common/Pagination";
import BlogCard from "@/components/blog/BlogCard";
import { SpeakableSchema } from "@/components/common/SpeakableSchema";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";
import { Tag } from "lucide-react";

/** Collect all tags with their post counts, sorted by count desc */
async function getTagsWithCounts(): Promise<{ tag: string; count: number }[]> {
  const allPosts = await getAllPosts();
  const tagMap = new Map<string, number>();
  for (const post of allPosts) {
    if (post.tags) {
      for (const tag of post.tags) {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      }
    }
  }
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
}

export default async function BlogIndexPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const limit = 6;
  const [{ posts, total }, tagsWithCounts] = await Promise.all([getPaginatedPosts(currentPage, limit), getTagsWithCounts()]);
  const totalPages = Math.ceil(total / limit);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Blog", "CollectionPage"],
    name: "Cú Thông Minh Blog",
    description: "Góc chia sẻ kiến thức, phương pháp giáo dục sớm và kinh nghiệm nuôi dạy trẻ.",
    url: "https://cuthongminh.com/blogs",
    inLanguage: "vi",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://cuthongminh.com/blogs",
    },
    publisher: {
      "@type": "Organization",
      name: "Cú Thông Minh",
      logo: {
        "@type": "ImageObject",
        url: "https://cuthongminh.com/icons/favicon-32x32.png",
      },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://cuthongminh.com/blogs/${post.slug}`,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author,
      },
    })),
  };

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
    ],
  };

  return (
    <div className="container mx-auto px-6 max-w-6xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />

      {/* Speakable Schema for AI voice reading */}
      <SpeakableSchema url="https://cuthongminh.com/blogs" cssSelectors={["h1", "h1 + p"]} />

      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-4 tracking-tight">
          Góc Chia Sẻ Dành Cho Phụ Huynh
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
          Khám phá những bài viết hữu ích về phương pháp giáo dục sớm, kinh nghiệm nuôi dạy trẻ và mẹo vặt học tập tại
          nhà.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-800 mb-8">
            Tất Cả Bài Viết
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/blogs" />
        </div>

        {/* Tags Sidebar */}
        {tagsWithCounts.length > 0 && (
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                <h3 className="text-lg font-bold font-[family-name:var(--font-baloo-2)] text-slate-800 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-orange-500" />
                  Chủ đề nổi bật
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tagsWithCounts.map(({ tag, count }) => (
                    <Link
                      key={tag}
                      href={`/blogs/tag/${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 shadow-sm"
                    >
                      {tag}
                      <span className="text-xs text-slate-400 font-bold">({count})</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

