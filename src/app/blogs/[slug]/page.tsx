import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/libs/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Clock, Calendar, Tag } from "lucide-react";
import "@/styles/blog.css"; // Make sure to import the new blog styles

function slugifyVi(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const rehypeVietnameseSlug = () => {
  return (tree: any) => {
    const traverse = (node: any) => {
      if (node.type === "element" && /^h[1-6]$/.test(node.tagName)) {
        if (!node.properties) node.properties = {};
        if (!node.properties.id) {
          const getText = (n: any): string => {
            if (n.type === "text") return n.value || "";
            if (n.children) return n.children.map(getText).join("");
            return "";
          };
          node.properties.id = slugifyVi(getText(node));
        }
      }
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(traverse);
      }
    };
    traverse(tree);
  };
};

import { safeJsonLd } from "@/libs/utils/safe-jsonld";
import Link from "next/link";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { TOPIC_CLUSTERS, GENERAL_PARENTING_SLUGS } from "@/libs/seo/topic-clusters";
import { GROUPS } from "@/libs/constants/groups";
import AIFact from "@/components/blog/AIFact";

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
    title: `${post.title} | Cú Thông Minh`,
    description: post.description,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
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

  const allPosts = await getAllPosts();
  let relatedPosts: any[] = [];

  // 1. Find which cluster (if any) the current post belongs to
  let currentClusterSlugs: string[] = [];
  let currentClusterKey: string | null = null;

  if (GENERAL_PARENTING_SLUGS.includes(post.slug)) {
    currentClusterSlugs = GENERAL_PARENTING_SLUGS;
  } else {
    for (const [key, cluster] of Object.entries(TOPIC_CLUSTERS)) {
      if (cluster.blogSlugs.includes(post.slug)) {
        currentClusterSlugs = cluster.blogSlugs;
        currentClusterKey = key;
        break;
      }
    }
  }

  const currentGroup = currentClusterKey ? GROUPS.find((g) => g.id === currentClusterKey) : null;

  // 2. Ring algorithm: get the next 3 posts in the cluster
  if (currentClusterSlugs.length > 1) {
    const currentIndex = currentClusterSlugs.indexOf(post.slug);
    const numPosts = currentClusterSlugs.length;

    for (let i = 1; i <= 3; i++) {
      // Wrap around to start if necessary
      const nextIndex = (currentIndex + i) % numPosts;
      const nextSlug = currentClusterSlugs[nextIndex];

      // Don't link to self (happens if cluster has < 4 items)
      if (nextSlug !== post.slug) {
        const nextPost = allPosts.find((p) => p.slug === nextSlug);
        if (nextPost && !relatedPosts.some((rp) => rp.slug === nextSlug)) {
          relatedPosts.push(nextPost);
        }
      }
    }
  }

  // 3. Fallback: If we still don't have enough posts (e.g., small cluster or unmapped post)
  // Use tag-based matching, then newest posts
  if (relatedPosts.length < 3) {
    const tagMatchedPosts = allPosts
      .filter((candidate) => candidate.slug !== post.slug && !relatedPosts.some((rp) => rp.slug === candidate.slug))
      .map((candidate) => {
        const sharedTags =
          candidate.tags?.filter((tag) => post.tags?.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())) ??
          [];
        return { post: candidate, sharedTagsCount: sharedTags.length };
      })
      .filter((candidate) => candidate.sharedTagsCount > 0)
      .sort((a, b) => b.sharedTagsCount - a.sharedTagsCount)
      .map((c) => c.post);

    relatedPosts = [...relatedPosts, ...tagMatchedPosts];
  }

  if (relatedPosts.length < 3) {
    const newestPosts = allPosts
      .filter((candidate) => candidate.slug !== post.slug && !relatedPosts.some((rp) => rp.slug === candidate.slug))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    relatedPosts = [...relatedPosts, ...newestPosts];
  }

  relatedPosts = relatedPosts.slice(0, 3);

  const relatedGames = Object.entries(GAME_SEO)
    .filter(([, seo]) => seo.relatedBlogs.some((blog) => blog.slug === post.slug))
    .slice(0, 3)
    .map(([gameId, seo]) => ({
      gameId,
      title: seo.title.split(" - ")[0],
      description: seo.description,
      image: seo.ogImage,
    }));

  // Calculate word count for schema
  const wordCount = post.content.split(/\s+/).length;
  const articleSection = post.tags && post.tags.length > 0 ? post.tags[0] : "Giáo dục";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image ? [post.image.startsWith("http") ? post.image : `https://cuthongminh.com${post.image}`] : [],
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.dateModified || post.date).toISOString(),
    wordCount,
    articleSection,
    inLanguage: "vi",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cuthongminh.com/blogs/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://cuthongminh.com/about-us",
      description: "Chuyên gia giáo dục mầm non tại Cú Thông Minh",
    },
    publisher: {
      "@type": "Organization",
      name: "Cú Thông Minh",
      logo: {
        "@type": "ImageObject",
        url: "https://cuthongminh.com/icons/favicon-32x32.png",
      },
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article header", ".blog-content p:first-of-type"],
    },
  };

  const formattedDate = new Date(post.date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Trang chủ",
      item: "https://cuthongminh.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://cuthongminh.com/blogs",
    },
  ];

  if (post.tags && post.tags.length > 0) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: post.tags[0],
      item: `https://cuthongminh.com/blogs/tag/${encodeURIComponent(post.tags[0])}`,
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 4,
      name: post.title,
      item: `https://cuthongminh.com/blogs/${post.slug}`,
    });
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: post.title,
      item: `https://cuthongminh.com/blogs/${post.slug}`,
    });
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <article className="container mx-auto px-6 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />

      {/* Visual Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 pt-6">
        <ol className="flex items-center space-x-2 text-sm text-slate-500 font-medium font-[family-name:var(--font-nunito-sans)] flex-wrap">
          <li>
            <Link href="/" className="hover:text-orange-500 transition-colors">
              Trang chủ
            </Link>
          </li>
          <li>
            <span className="text-slate-300">/</span>
          </li>
          <li>
            <Link href="/blogs" className="hover:text-orange-500 transition-colors">
              Blog
            </Link>
          </li>
          {post.tags && post.tags.length > 0 && (
            <>
              <li>
                <span className="text-slate-300">/</span>
              </li>
              <li>
                <Link
                  href={`/blogs/tag/${encodeURIComponent(post.tags[0])}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  {post.tags[0]}
                </Link>
              </li>
            </>
          )}
        </ol>
      </nav>

      {/* Article Header */}
      <header className="mb-12 text-center">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blogs/tag/${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors"
              >
                <Tag className="w-3.5 h-3.5" />
                {tag}
              </Link>
            ))}

            {currentGroup && (
              <Link
                href={`/${currentGroup.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors"
              >
                <Tag className="w-3.5 h-3.5" />
                Chủ đề: {currentGroup.title}
              </Link>
            )}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6 tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-col items-center gap-4 mt-6">
          {/* Author Byline — E-E-A-T */}
          <div className="flex items-center gap-4 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-orange-100 flex-shrink-0 border-2 border-orange-200">
              <Image
                src="/icons/android-chrome-512x512.png"
                alt={post.author}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <Link
                href="/about-us"
                className="font-bold text-slate-900 hover:text-orange-500 transition-colors text-sm"
              >
                {post.author}
              </Link>
              <p className="text-xs text-slate-500">Chuyên gia giáo dục mầm non • Cú Thông Minh</p>
            </div>
          </div>

          {/* Date & Reading Time */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 font-medium font-[family-name:var(--font-nunito-sans)]">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <Calendar className="w-4 h-4 text-orange-500" />
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>{post.readingTime} phút đọc</span>
            </div>
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
        <MDXRemote
          source={post.content}
          components={{ AIFact }}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeVietnameseSlug] } }}
        />
      </div>

      {relatedGames.length > 0 && (
        <section className="mt-16 pt-10 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 font-[family-name:var(--font-baloo-2)]">
            Trò chơi phù hợp với bài viết này
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedGames.map((game) => (
              <Link
                key={game.gameId}
                href={`/games/${game.gameId}`}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[16/9] bg-slate-100">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{game.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-3">{game.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-10 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 font-[family-name:var(--font-baloo-2)]">
            Bài viết liên quan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blogs/${relatedPost.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition-all"
              >
                {relatedPost.image && (
                  <div className="relative aspect-[16/9] bg-slate-100">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-3">{relatedPost.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
