import { AGE_GROUPS } from "@/libs/constants/ages";
import { COURSES } from "@/libs/constants/courses";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { HeaderHome } from "@/components/layout/HeaderHome";
import { Footer } from "@/components/layout/Footer";
import { Star, Play, Trophy, Sparkles } from "lucide-react";
import { SpeakableSchema } from "@/components/common/SpeakableSchema";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";
import { getAllPosts } from "@/libs/blog";
import { GENERAL_PARENTING_SLUGS } from "@/libs/seo/topic-clusters";

interface PageProps {
  params: Promise<{ age: string }>;
}

export async function generateStaticParams() {
  return AGE_GROUPS.map((group) => ({
    age: group.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { age } = await params;
  const group = AGE_GROUPS.find((g) => g.slug === age);

  if (!group) return {};

  const title = `${group.title} | Cú Thông Minh`;
  const canonicalUrl = `/do-tuoi/${age}`;

  return {
    title,
    description: group.description,
    keywords: group.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: group.description,
      images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: title }],
      url: `https://cuthongminh.com${canonicalUrl}`,
    },
  };
}

export default async function AgeGroupLandingPage({ params }: PageProps) {
  const { age } = await params;
  const group = AGE_GROUPS.find((g) => g.slug === age);

  if (!group) {
    notFound();
  }

  // Lọc game thuộc độ tuổi này
  const groupGames = COURSES.filter((course) => group.gameIds.includes(course.id));

  // Lọc bài blog phù hợp độ tuổi (tag-matched + general parenting posts)
  const allPosts = await getAllPosts();
  const tagMatchedSlugs = new Set(
    allPosts
      .filter(
        (post) => post.tags && post.tags.some((t) => group.blogTags.some((bt) => bt.toLowerCase() === t.toLowerCase())),
      )
      .map((post) => post.slug),
  );

  // Merge tag-matched posts with general parenting posts (deduplicated)
  const generalPosts = allPosts.filter((post) => GENERAL_PARENTING_SLUGS.includes(post.slug));
  generalPosts.forEach((post) => tagMatchedSlugs.add(post.slug));

  const clusterPosts = allPosts.filter((post) => tagMatchedSlugs.has(post.slug));

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
        name: "Theo độ tuổi",
        item: "https://cuthongminh.com/do-tuoi",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: group.shortTitle,
        item: `https://cuthongminh.com/do-tuoi/${age}`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: group.title,
    description: group.description,
    numberOfItems: groupGames.length,
    itemListElement: groupGames.map((game, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://cuthongminh.com/games/${game.id}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] font-[family-name:var(--font-nunito-sans)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListJsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <HeaderHome />

        <main className="mt-16">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-8 md:p-16 text-white mb-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="w-40 h-40 md:w-56 md:h-56 relative shrink-0 bg-white/20 backdrop-blur-md rounded-[2rem] p-6 shadow-xl animate-float">
                <Image
                  src="https://assets.cuthongminh.com/assets/own-learning.webp"
                  alt="Cú Thông Minh"
                  fill
                  className="object-contain p-4 drop-shadow-md"
                  priority
                />
              </div>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-bold text-sm mb-6 backdrop-blur-sm border border-white/30 shadow-inner">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  Được thiết kế chuyên biệt
                </div>
                <h1 className="text-4xl md:text-6xl font-black font-[family-name:var(--font-baloo-2)] mb-6 drop-shadow-md leading-tight">
                  {group.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed font-medium">
                  {group.heroDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Games Grid */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-800 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-orange-500" />
                Bộ sưu tập trò chơi
              </h2>
              <span className="hidden md:block px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-bold text-sm border border-orange-200">
                {groupGames.length} Trò chơi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  className="group bg-white rounded-[2.5rem] p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200 flex flex-col items-center text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-50 rounded-br-[4rem] group-hover:bg-indigo-100 transition-colors -z-10"></div>

                  <div className="w-32 h-32 relative mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={game.icon as string}
                      alt={game.title}
                      fill
                      className="object-contain filter drop-shadow-md"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-baloo-2)] group-hover:text-indigo-600 transition-colors">
                    {game.title}
                  </h3>

                  <p className="text-slate-600 mb-6 line-clamp-2 font-medium">{game.description}</p>

                  <div className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-slate-50 group-hover:bg-indigo-500 group-hover:text-white rounded-2xl font-bold transition-all duration-300">
                    <Play className="w-4 h-4 fill-current" />
                    Chơi khám phá
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Blog Section */}
          {clusterPosts.length > 0 && (
            <section className="mb-20 bg-white rounded-[3rem] p-8 md:p-12 shadow-lg border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 -z-10">
                <Sparkles className="w-64 h-64 text-orange-500" />
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-800 mb-3">
                    Đồng hành cùng phụ huynh
                  </h2>
                  <p className="text-slate-600 max-w-2xl text-lg">
                    Các bài viết chuyên sâu về tâm lý, sinh lý và phương pháp dạy trẻ {group.shortTitle.toLowerCase()}{" "}
                    hữu ích nhất.
                  </p>
                </div>
                <Link
                  href="/blogs"
                  className="px-6 py-3 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold transition-colors whitespace-nowrap"
                >
                  Xem thêm bài viết
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clusterPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blogs/${post.slug}`}
                    className="group rounded-[2rem] border border-slate-100 bg-slate-50 p-6 hover:bg-white hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-indigo-600 text-xs font-bold border border-indigo-100 shadow-sm">
                        Chuyên mục tư vấn
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{post.readingTime} phút đọc</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-baloo-2)] group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 line-clamp-2 md:line-clamp-3 leading-relaxed">{post.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section className="bg-slate-900 rounded-[3rem] p-12 text-center text-white mb-20 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl"></div>

            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] mb-6 relative z-10">
              Đăng ký để lưu lại tiến độ của bé
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto mb-10 relative z-10 font-medium">
              Tạo tài khoản miễn phí để hệ thống gợi ý bài học phù hợp và theo dõi sự phát triển{" "}
              {group.shortTitle.toLowerCase()} mỗi ngày.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link
                href="/auth/sign-up"
                className="w-full sm:w-auto px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full text-lg shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
              >
                Tạo tài khoản miễn phí
              </Link>
            </div>
          </section>
        </main>
      </div>

      <SpeakableSchema url={`https://cuthongminh.com/do-tuoi/${age}`} cssSelectors={["h1", "main > div p"]} />

      <Footer />
    </div>
  );
}
