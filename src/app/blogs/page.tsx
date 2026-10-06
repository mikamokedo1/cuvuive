import Link from "next/link";
import { getAllPosts, getPaginatedPosts } from "@/libs/blog";
import type { Metadata } from "next";
import Pagination from "@/components/common/Pagination";
import BlogCard from "@/components/blog/BlogCard";
import { SpeakableSchema } from "@/components/common/SpeakableSchema";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";
import { normalizeTagPathSegment } from "@/libs/utils/tag-slug";
import { Tag, TrendingUp, BookOpen } from "lucide-react";
import { GENERAL_PARENTING_SLUGS } from "@/libs/seo/topic-clusters";
import { GROUPS } from "@/libs/constants/groups";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ZChatParentBanner } from "@/components/common/ZChatParentBanner";

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

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ page?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const title = currentPage > 1 ? `Blog Kiến Thức & Nuôi Dạy Trẻ - Trang ${currentPage} | Cú Thông Minh` : "Blog Kiến Thức & Nuôi Dạy Trẻ | Cú Thông Minh";
  const description = "Chia sẻ kiến thức giáo dục sớm, phương pháp dạy con khoa học và mẹo vặt học tập tại nhà cho trẻ 3-8 tuổi. Cập nhật hàng tuần bởi Cú Thông Minh.";
  const canonical = currentPage > 1 ? `/blogs?page=${currentPage}` : "/blogs";
  
  return {
    title,
    description,
    keywords: [
      "giáo dục sớm cho trẻ",
      "phương pháp dạy con",
      "nuôi dạy trẻ mầm non",
      "mẹo dạy bé học tại nhà",
      "kiến thức phụ huynh",
      "phát triển trí tuệ trẻ em",
      "dạy bé học toán chữ cái",
      "hoạt động cho bé mầm non",
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: `https://cuthongminh.com${canonical}`,
    },
  };
}

export default async function BlogIndexPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const limit = 12;
  const [{ posts, total }, tagsWithCounts, allPosts] = await Promise.all([
    getPaginatedPosts(currentPage, limit),
    getTagsWithCounts(),
    getAllPosts(),
  ]);
  const totalPages = Math.ceil(total / limit);

  const featuredPosts = allPosts
    .filter(post => GENERAL_PARENTING_SLUGS.includes(post.slug))
    .slice(0, 3);

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
        url: "https://cuthongminh.com/about-us",
        jobTitle: "Chuyên gia giáo dục sớm",
        worksFor: {
          "@type": "Organization",
          name: "Cú Thông Minh",
          url: "https://cuthongminh.com",
        },
      },
    })),
  };

  return (
    <div className="container mx-auto px-6 max-w-6xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />

      {/* Breadcrumbs — visual + JSON-LD */}
      <Breadcrumbs items={[
        { label: "Trang chủ", href: "/" },
        { label: "Blog", href: "/blogs" },
      ]} />

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
              <BlogCard key={post.slug} post={post} headingLevel="h3" />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/blogs" />
        </div>

        {/* Tags Sidebar */}
        {tagsWithCounts.length > 0 && (
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24">
              {/* ZChat cho phụ huynh — sản phẩm cùng đội ngũ */}
              <ZChatParentBanner placement="danh-sach-blog" variant="box" className="mb-6" />
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                <h3 className="text-lg font-bold font-[family-name:var(--font-baloo-2)] text-slate-800 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-orange-500" />
                  Chủ đề nổi bật
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tagsWithCounts.map(({ tag, count }) => (
                    <Link
                      key={tag}
                      href={`/blogs/tag/${normalizeTagPathSegment(tag)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 shadow-sm"
                    >
                      {tag}
                      <span className="text-xs text-slate-400 font-bold">({count})</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              {featuredPosts.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-6 mt-6 shadow-sm">
                  <h3 className="text-lg font-bold font-[family-name:var(--font-baloo-2)] text-slate-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-red-500" />
                    Bài viết chọn lọc
                  </h3>
                  <div className="flex flex-col gap-4">
                    {featuredPosts.map((featured) => (
                      <Link
                        key={featured.slug}
                        href={`/blogs/${featured.slug}`}
                        className="group flex flex-col gap-1 border-b border-slate-50 pb-4 last:border-0 last:pb-0"
                      >
                        <h4 className="font-bold text-slate-700 text-sm group-hover:text-orange-500 transition-colors line-clamp-2">
                          {featured.title}
                        </h4>
                        <span className="text-xs text-slate-400 font-medium">Khuyên đọc</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {/* Category Pages — internal linking hub */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 mt-6">
                <h3 className="text-lg font-bold font-[family-name:var(--font-baloo-2)] text-slate-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  Khám phá theo môn học
                </h3>
                <div className="flex flex-col gap-2">
                  {GROUPS.filter((g) => g.id !== "history").map((group) => (
                    <Link
                      key={group.id}
                      href={`/${group.slug}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                    >
                      <span className="text-base">📚</span>
                      {group.title}
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
