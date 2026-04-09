import { GROUPS } from "@/libs/constants/groups";
import { COURSES } from "@/libs/constants/courses";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { HeaderHome } from "@/components/layout/HeaderHome";
import { Footer } from "@/components/layout/Footer";
import { Star, Play, Trophy } from "lucide-react";
import { FAQSchema, type FAQItem } from "@/components/common/FAQSchema";
import { SpeakableSchema } from "@/components/common/SpeakableSchema";
import { GameGroupType } from "@/libs/constants/groups";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";
import { TOPIC_CLUSTERS } from "@/libs/seo/topic-clusters";
import { getAllPosts } from "@/libs/blog";

// FAQ data per group for AEO
const GROUP_FAQ: Record<GameGroupType, FAQItem[]> = {
  math: [
    {
      question: "Trò chơi Toán Học trên Cú Thông Minh phù hợp cho bé mấy tuổi?",
      answer:
        "Các trò chơi Toán Học được thiết kế cho bé từ 3-8 tuổi, bao gồm học đếm số 1-20, so sánh số lượng, phép cộng trừ đơn giản và nhận biết hình dạng. Nội dung được phân loại theo độ khó phù hợp từng lứa tuổi.",
    },
    {
      question: "Bé có thể học được gì qua trò chơi Toán Học?",
      answer:
        "Bé sẽ học đếm số, nhận biết chữ số, so sánh nhiều hơn - ít hơn, phép cộng trừ cơ bản, nhận biết hình dạng (tròn, vuông, tam giác), và rèn luyện tư duy logic qua các bài tập tương tác.",
    },
  ],
  logic: [
    {
      question: "Trò chơi Tư Duy giúp bé phát triển kỹ năng gì?",
      answer:
        "Trò chơi Tư Duy giúp bé rèn luyện khả năng quan sát, tìm quy luật, phân tích so sánh, tìm điểm khác biệt và giải mê cung. Đây là những kỹ năng nền tảng cho tư duy logic và giải quyết vấn đề.",
    },
    {
      question: "Có những loại trò chơi tư duy nào trên Cú Thông Minh?",
      answer:
        "Cú Thông Minh cung cấp các trò chơi tìm quy luật (pattern), tìm điểm khác biệt, tìm hình khác loại (odd one out), mê cung (maze runner), và nối hình (line connect). Mỗi trò chơi đều có nhiều cấp độ từ dễ đến khó.",
    },
  ],
  language: [
    {
      question: "Bé học Tiếng Việt trên Cú Thông Minh như thế nào?",
      answer:
        "Bé sẽ học bảng chữ cái tiếng Việt, tập viết chữ, học dấu thanh (sắc, huyền, hỏi, ngã, nặng), và ghép vần thông qua các bài học tương tác với hình ảnh và âm thanh sống động.",
    },
    {
      question: "Trò chơi Ngôn Ngữ có phù hợp cho bé chưa biết chữ không?",
      answer:
        "Tuyệt đối phù hợp! Các bài học bắt đầu từ nhận biết chữ cái cơ bản, có âm thanh phát âm chuẩn và hình ảnh minh họa trực quan, giúp bé làm quen với chữ cái trước khi bước vào lớp 1.",
    },
  ],
  science: [
    {
      question: "Bé học Khoa Học những gì trên Cú Thông Minh?",
      answer:
        "Bé sẽ khám phá thế giới động vật (động vật nuôi, hoang dã, biển), các loài hoa và cây, trái cây, thời tiết và khí hậu, khủng long, và nhiều chủ đề khoa học thú vị khác qua hình ảnh và âm thanh sống động.",
    },
    {
      question: "Trò chơi Khoa Học có giúp bé chuẩn bị cho chương trình học không?",
      answer:
        "Có! Nội dung Khoa Học trên Cú Thông Minh bám sát chương trình giáo dục mầm non, giúp bé xây dựng kiến thức nền tảng về thế giới tự nhiên trước khi bước vào cấp tiểu học.",
    },
  ],
  "life-skill": [
    {
      question: "Kỹ Năng Sống trên Cú Thông Minh dạy bé những gì?",
      answer:
        "Bé sẽ học nhận biết phương tiện giao thông, nghề nghiệp, vệ sinh cá nhân, cảm xúc, và các kỹ năng sống thiết yếu khác. Mỗi chủ đề đều có bài học tương tác và trò chơi giúp bé ghi nhớ tốt hơn.",
    },
    {
      question: "Trò chơi Kỹ Năng Sống có phù hợp cho bé 3 tuổi không?",
      answer:
        "Hoàn toàn phù hợp! Các bài học Kỹ Năng Sống sử dụng hình ảnh sinh động, âm thanh vui nhộn và cách tương tác đơn giản, phù hợp cho bé từ 3 tuổi trở lên.",
    },
  ],
  geography: [
    {
      question: "Bé học Địa Lý Tự Nhiên những gì trên Cú Thông Minh?",
      answer:
        "Bé sẽ học nhận biết quốc kỳ các nước, các địa danh nổi tiếng thế giới, trang phục truyền thống các quốc gia, và các địa hình tự nhiên. Kiến thức được truyền tải qua hình ảnh thực tế và trò chơi ghép hình thú vị.",
    },
    {
      question: "Trò chơi Địa Lý có giúp bé mở rộng hiểu biết về thế giới không?",
      answer:
        "Chắc chắn rồi! Bé sẽ được khám phá thế giới qua việc nhận biết quốc kỳ, địa danh và văn hóa các quốc gia, giúp bé phát triển kiến thức và sự tò mò về thế giới xung quanh.",
    },
  ],
  music: [
    {
      question: "Bé học Âm Nhạc trên Cú Thông Minh như thế nào?",
      answer:
        "Bé sẽ được làm quen với các loại nhạc cụ (dây, gõ, hơi), nghe âm thanh thực tế của từng nhạc cụ, và thử chơi đàn piano mini trên ứng dụng. Âm nhạc giúp bé phát triển thính giác và cảm nhận nghệ thuật.",
    },
    {
      question: "Trò chơi Âm Nhạc có cần bé biết nhạc lý không?",
      answer:
        "Hoàn toàn không! Các bài học Âm Nhạc được thiết kế cho bé chưa có kiến thức nhạc lý, bắt đầu từ việc nhận biết nhạc cụ qua hình ảnh và âm thanh, đến chơi đàn piano đơn giản theo màu sắc.",
    },
  ],
  art: [
    {
      question: "Bé học Mỹ Thuật trên Cú Thông Minh như thế nào?",
      answer:
        "Bé sẽ được học nhận biết màu sắc, pha màu, tô màu tranh sáng tạo và vẽ tự do. Các trò chơi Mỹ Thuật giúp bé phát triển khả năng sáng tạo, nhận biết thẩm mỹ và kỹ năng vận động tinh.",
    },
    {
      question: "Trò chơi Mỹ Thuật có phù hợp cho bé chưa biết vẽ không?",
      answer:
        "Rất phù hợp! Các bài học bắt đầu từ nhận biết màu sắc cơ bản, sau đó nâng dần lên tô màu theo mẫu và vẽ sáng tạo. Bé không cần biết vẽ trước, ứng dụng sẽ hướng dẫn từng bước.",
    },
  ],
  history: [],
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GROUPS.map((group) => ({
    slug: group.slug,
  }));
}

// SEO keywords per group for better long-tail targeting
const GROUP_KEYWORDS: Record<GameGroupType, string[]> = {
  math: [
    "trò chơi toán học cho bé mầm non", "bé học toán online", "phép cộng trừ cho trẻ",
    "toán tư duy cho bé 5 tuổi", "dạy bé đếm số tại nhà", "game toán cho trẻ 3-8 tuổi",
    "bài tập toán mẫu giáo", "học cộng trừ nhân chia đơn giản",
  ],
  logic: [
    "trò chơi tư duy logic cho bé", "game phát triển trí tuệ trẻ em", "tìm quy luật cho bé",
    "trò chơi mê cung online cho trẻ", "bài tập tư duy cho trẻ mầm non",
    "rèn luyện tư duy logic trẻ 3-6 tuổi", "trò chơi tìm điểm khác biệt", "puzzle cho bé online",
  ],
  language: [
    "học tiếng việt cho bé online", "bé học chữ cái tiếng việt", "tập đọc cho bé 4 tuổi",
    "học bảng chữ cái cho trẻ mầm non", "bé học ghép vần", "dạy bé tập viết chữ",
    "học dấu thanh tiếng việt", "giáo dục ngôn ngữ cho trẻ",
  ],
  science: [
    "bé học khoa học vui", "trò chơi khám phá động vật cho bé", "bé học nhận biết trái cây",
    "khủng long cho trẻ em", "thế giới động vật cho bé mầm non",
    "dạy bé nhận biết hoa và cây", "khoa học tự nhiên cho trẻ 3-6 tuổi", "bé học bộ phận cơ thể",
  ],
  "life-skill": [
    "kỹ năng sống cho bé mầm non", "dạy bé vệ sinh cá nhân", "an toàn giao thông cho trẻ",
    "bé học nghề nghiệp", "nhận biết cảm xúc cho trẻ", "dạy bé nhận biết đồ vật nguy hiểm",
    "kỹ năng tự phục vụ cho bé", "giáo dục kỹ năng sống trẻ em",
  ],
  geography: [
    "bé học địa lý vui", "nhận biết cờ các nước cho bé", "địa danh nổi tiếng thế giới cho trẻ",
    "trang phục truyền thống các nước", "khám phá địa hình tự nhiên",
    "dạy bé về các quốc gia", "địa lý cho trẻ mầm non", "trò chơi địa lý online cho bé",
  ],
  music: [
    "bé học âm nhạc online", "đàn piano cho trẻ em", "nhận biết nhạc cụ cho bé",
    "học nốt nhạc cho bé", "bài hát thiếu nhi", "giáo dục âm nhạc cho trẻ mầm non",
    "game chơi đàn piano online cho bé", "âm nhạc cho trẻ 3-6 tuổi",
  ],
  art: [
    "bé học mỹ thuật online", "tô màu online cho bé miễn phí", "học pha màu cho trẻ",
    "trò chơi vẽ tranh cho bé", "dạy bé nhận biết màu sắc", "sáng tạo nghệ thuật cho trẻ",
    "game tô màu cho trẻ mầm non", "mỹ thuật cho bé 3-6 tuổi",
  ],
  history: [],
};

// SEO-optimized descriptions per group
const GROUP_DESCRIPTIONS: Record<GameGroupType, string> = {
  math: "Trò chơi Toán Học tương tác giúp bé 3-8 tuổi học đếm số, phép cộng trừ nhân chia, so sánh số lượng. Phương pháp học mà chơi hiệu quả trên Cú Thông Minh.",
  logic: "Rèn luyện tư duy logic cho bé qua trò chơi tìm quy luật, mê cung, nối điểm, tìm điểm khác biệt. Phát triển trí tuệ toàn diện cho trẻ 3-8 tuổi.",
  language: "Bé học tiếng Việt online: bảng chữ cái, dấu thanh, ghép vần qua trò chơi tương tác sinh động. Nền tảng ngôn ngữ vững chắc cho trẻ mầm non.",
  science: "Khám phá thế giới khoa học cùng bé: động vật, trái cây, khủng long, thời tiết, cơ thể người. Trò chơi giáo dục tương tác cho trẻ 3-8 tuổi.",
  "life-skill": "Dạy bé kỹ năng sống thiết yếu: an toàn giao thông, vệ sinh cá nhân, nghề nghiệp, quản lý cảm xúc qua trò chơi tương tác vui nhộn trên Cú Thông Minh.",
  geography: "Bé khám phá thế giới: quốc kỳ các nước, địa danh nổi tiếng, trang phục truyền thống, địa hình tự nhiên qua trò chơi giáo dục tương tác.",
  music: "Bé học âm nhạc vui: nhạc cụ, nốt nhạc, chơi đàn piano qua trò chơi tương tác. Phát triển thính giác và cảm thụ nghệ thuật cho trẻ mầm non.",
  art: "Bé học mỹ thuật sáng tạo: nhận biết màu sắc, pha màu, tô tranh, vẽ tự do. Phát triển thẩm mỹ và khả năng sáng tạo cho trẻ 3-8 tuổi.",
  history: "",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const group = GROUPS.find((g) => g.slug === slug);

  if (!group) return {};

  const title = `Trò Chơi ${group.title} Cho Bé 3-8 Tuổi | Cú Thông Minh`;
  const description = GROUP_DESCRIPTIONS[group.id] || `Khám phá các trò chơi ${group.title} hấp dẫn giúp bé phát triển tư duy, sáng tạo và kỹ năng toàn diện tại Cú Thông Minh.`;
  const keywords = GROUP_KEYWORDS[group.id] || [];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function GroupLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const group = GROUPS.find((g) => g.slug === slug);

  if (!group) {
    notFound();
  }

  const groupGames = COURSES.filter((course) => course.type === group.id);
  const faqItems = GROUP_FAQ[group.id] || [];
  const allPosts = await getAllPosts();
  const topicCluster = TOPIC_CLUSTERS[group.id];
  const clusterPosts = allPosts.filter((post) => topicCluster.blogSlugs.includes(post.slug)).slice(0, 6);

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
        name: group.title,
        item: `https://cuthongminh.com/${slug}`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Trò chơi ${group.title} cho bé`,
    description: `Khám phá ${groupGames.length} trò chơi ${group.title} hấp dẫn dành cho bé từ 3-8 tuổi trên Cú Thông Minh.`,
    numberOfItems: groupGames.length,
    itemListElement: groupGames.map((game, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: game.title,
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
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-orange-400 to-red-500 p-8 md:p-16 text-white mb-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="w-40 h-40 md:w-56 md:h-56 relative shrink-0 bg-white/20 backdrop-blur-md rounded-[2rem] p-4 shadow-xl animate-float">
                <Image src={group.icon} alt={group.title} fill className="object-contain p-4" priority />
              </div>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-bold text-sm mb-6 backdrop-blur-sm border border-white/30">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  Chủ đề phổ biến
                </div>
                <h1 className="text-4xl md:text-6xl font-black font-[family-name:var(--font-baloo-2)] mb-6 drop-shadow-md">
                  {group.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed font-medium">
                  Với những trò chơi {group.title.toLowerCase()} được thiết kế sinh động, bé sẽ được vừa học vừa chơi
                  một cách hứng thú nhất.
                </p>
              </div>
            </div>
          </div>

          {/* Games Grid */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-800 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-orange-500" />
                Kho trò chơi {group.title}
              </h2>
              <span className="hidden md:block px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-bold text-sm">
                {groupGames.length} Trò chơi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  className="group bg-white rounded-[2.5rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 flex flex-col items-center text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-24 h-24 bg-orange-50 rounded-br-[4rem] group-hover:bg-orange-100 transition-colors -z-10"></div>

                  <div className="w-32 h-32 relative mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <Image src={game.icon} alt={game.title} fill className="object-contain filter drop-shadow-md" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-baloo-2)] group-hover:text-orange-500 transition-colors">
                    {game.title}
                  </h3>

                  <p className="text-slate-600 mb-6 line-clamp-2 font-medium">{game.description}</p>

                  <div className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-slate-50 group-hover:bg-orange-500 group-hover:text-white rounded-2xl font-bold transition-all duration-300">
                    <Play className="w-4 h-4 fill-current" />
                    Chơi ngay
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {clusterPosts.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-800 mb-3">
                    {topicCluster.heading}
                  </h2>
                  <p className="text-slate-600 max-w-3xl">{topicCluster.description}</p>
                </div>
                <Link
                  href="/blogs"
                  className="hidden md:inline-flex px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                >
                  Xem blog
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clusterPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blogs/${post.slug}`}
                    className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
                        Blog cùng chủ đề
                      </span>
                      <span className="text-xs text-slate-400">{post.readingTime} phút đọc</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-baloo-2)] group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 line-clamp-3">{post.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section className="bg-slate-900 rounded-[3rem] p-12 text-center text-white mb-20 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] mb-6 relative z-10">
              Bắt đầu hành trình cùng Cú Thông Minh
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto mb-10 relative z-10 font-medium">
              Đăng ký tài khoản ngay hôm nay để mở khóa hơn 200+ bài học và theo dõi tiến độ của bé.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link
                href="/auth/sign-up"
                className="w-full sm:w-auto px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full text-lg shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
              >
                Đăng ký miễn phí
              </Link>
              <Link
                href="/games"
                className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full text-lg backdrop-blur-md border border-white/20 transition-all duration-300"
              >
                Khám phá bài học
              </Link>
            </div>
          </section>
        </main>
      </div>

      {/* FAQ Section — AEO optimized */}
      {faqItems.length > 0 && (
        <FAQSchema
          items={faqItems}
          title={`Câu hỏi về trò chơi ${group.title}`}
          subtitle={`Những thắc mắc phổ biến về trò chơi ${group.title} trên Cú Thông Minh`}
        />
      )}

      {/* Speakable Schema for AI voice reading */}
      <SpeakableSchema url={`https://cuthongminh.com/${slug}`} cssSelectors={["h1", "main > div p", "#faq"]} />

      <Footer />
    </div>
  );
}
