import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/libs/blog";
import { Clock, Tag } from "lucide-react";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

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
      url: `https://cuthongminh.com/blogs/${post.slug}`,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author,
      },
    })),
  };

  return (
    <div className="container mx-auto px-6 max-w-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
          <article
            key={post.slug}
            className="group flex flex-col h-full bg-slate-50 rounded-3xl overflow-hidden hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-orange-200"
          >
            <Link href={`/blogs/${post.slug}`} className="flex-1 flex flex-col">
              {post.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 font-medium">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md border border-slate-200">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime} phút đọc
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors font-[family-name:var(--font-baloo-2)] leading-tight">
                  {post.title}
                </h2>

                <p className="text-slate-600 mb-6 leading-relaxed flex-1 line-clamp-3">{post.description}</p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-200/60">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
