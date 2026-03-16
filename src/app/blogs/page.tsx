import Link from "next/link";
import { getPaginatedPosts } from "@/libs/blog";
import Pagination from "@/components/common/Pagination";
import BlogCard from "@/components/blog/BlogCard";

export default async function BlogIndexPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const limit = 6;
  const { posts, total } = await getPaginatedPosts(currentPage, limit);
  const totalPages = Math.ceil(total / limit);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Cú Thông Minh Blog",
    description: "Góc chia sẻ kiến thức, phương pháp giáo dục sớm và kinh nghiệm nuôi dạy trẻ.",
    url: "https://cuthongminh.com/blogs",
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
      url: `https://assets.cuthongminh.com/blogs/${post.slug}`,
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
    <div className="container mx-auto px-6 max-w-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-4 tracking-tight">
          Góc Chia Sẻ Dành Cho Phụ Huynh
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
          Khám phá những bài viết hữu ích về phương pháp giáo dục sớm, kinh nghiệm nuôi dạy trẻ và mẹo vặt học tập tại
          nhà.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/blogs" />
    </div>
  );
}
