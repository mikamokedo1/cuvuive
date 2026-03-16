import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/libs/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Clock, Calendar, User, Tag } from "lucide-react";
import "@/styles/blog.css"; // Make sure to import the new blog styles

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Không tìm thấy bài viết",
      description: "Bài viết không tồn tại trên hệ thống.",
    };
  }

  const siteUrl = "https://cuthongminh.com";

  return {
    title: `${post.title} | Cú Thông Minh Blog`,
    description: post.description,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `${siteUrl}/blogs/${post.slug}`,
      images: post.image
        ? [
            {
              url: post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image ? [`https://assets.cuthongminh.com${post.image}`] : [],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Cú Thông Minh",
      logo: {
        "@type": "ImageObject",
        url: "https://cuthongminh.com/icons/favicon-32x32.png",
      },
    },
  };

  const formattedDate = new Date(post.date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
        name: post.title,
        item: `https://cuthongminh.com/blogs/${post.slug}`,
      },
    ],
  };

  return (
    <article className="container mx-auto px-6 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Article Header */}
      <header className="mb-12 text-center">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 bg-orange-100 text-orange-600 rounded-full"
              >
                <Tag className="w-3.5 h-3.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6 tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium font-[family-name:var(--font-nunito-sans)]">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <User className="w-4 h-4 text-orange-500" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Calendar className="w-4 h-4 text-orange-500" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>{post.readingTime} phút đọc</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {post.image && (
        <div className="relative aspect-[21/9] w-full mb-12 rounded-3xl overflow-hidden bg-slate-100 shadow-md">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      )}

      {/* MDX Content area */}
      <div className="prose prose-lg prose-slate max-w-none hover:prose-a:text-orange-600 blog-content">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
