import Link from "next/link";
import {
  ArrowRight,
  Brain,
  BookOpen,
  Trophy,
  Shield,
  Heart,
  Gamepad2,
  CheckCircle2,
  Users,
  Star,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { GROUPS, GROUP_DESCRIPTIONS } from "@/libs/constants/groups";
import { Footer } from "@/components/layout/Footer";
import { HeaderHomeWithSearch } from "@/components/layout/HeaderHomeWithSearch";
import { FAQSchema, type FAQItem } from "@/components/common/FAQSchema";
import { SpeakableSchema } from "@/components/common/SpeakableSchema";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";

const FloatingCTA = dynamic(() => import("@/components/common/FloatingCTA").then((mod) => mod.FloatingCTA));

const ExitIntentPopup = dynamic(() => import("@/components/common/ExitIntentPopup").then((mod) => mod.ExitIntentPopup));

const HOME_FAQ_ITEMS: FAQItem[] = [
  {
    question: "Cú Thông Minh là gì?",
    answer:
      "Cú Thông Minh là ứng dụng giáo dục tương tác dành cho trẻ em từ 3-8 tuổi, giúp bé vừa học vừa chơi qua hàng trăm trò chơi trí tuệ về toán học, ngôn ngữ, khoa học và kỹ năng sống.",
  },
  {
    question: "Cú Thông Minh phù hợp cho bé mấy tuổi?",
    answer:
      "Ứng dụng được thiết kế cho bé từ 3 đến 8 tuổi, với nội dung phân loại theo độ khó phù hợp từng lứa tuổi. Bé 3-4 tuổi có thể bắt đầu với các bài học nhận biết màu sắc, hình dạng; bé 5-8 tuổi có thể thử thách với toán học, chữ cái và tư duy logic.",
  },
  {
    question: "Ứng dụng Cú Thông Minh có miễn phí không?",
    answer:
      "Cú Thông Minh cung cấp nhiều trò chơi miễn phí để trải nghiệm. Để mở khóa toàn bộ nội dung premium với hơn 20+ thể loại trò chơi, phụ huynh có thể nâng cấp lên gói trả phí với mức giá hợp lý.",
  },
  {
    question: "Cú Thông Minh có an toàn cho trẻ nhỏ không?",
    answer:
      "Tuyệt đối an toàn. Cú Thông Minh cam kết không có quảng cáo, không có nội dung độc hại, không thu thập dữ liệu cá nhân của trẻ. Phụ huynh có thể theo dõi tiến độ học tập và quản lý thời gian sử dụng của bé.",
  },
  {
    question: "Bé có thể học được gì trên Cú Thông Minh?",
    answer:
      "Bé có thể học toán (đếm số, phép cộng trừ, so sánh số lượng), chữ cái tiếng Việt, nhận biết động vật, màu sắc, hình dạng, phương tiện giao thông, cờ các nước, và rèn luyện tư duy logic qua các trò chơi tìm quy luật, tìm điểm khác biệt, mê cung.",
  },
  {
    question: "Cú Thông Minh hoạt động trên thiết bị nào?",
    answer:
      "Cú Thông Minh là ứng dụng web (PWA) hoạt động trên mọi thiết bị có trình duyệt: điện thoại, máy tính bảng, và máy tính để bàn. Không cần tải về từ App Store hay Google Play, chỉ cần truy cập cuthongminh.com.",
  },
];

const TestimonialSlider = dynamic(
  () => import("@/components/common/TestimonialSlider").then((mod) => mod.TestimonialSlider),
  {
    loading: () => (
      <div className="bg-orange-50 rounded-[3rem] p-8 lg:p-16 border border-orange-100 text-center animate-pulse">
        <div className="h-8 bg-orange-100 rounded-xl w-3/4 mx-auto mb-8" />
        <div className="h-6 bg-orange-100 rounded-xl w-1/2 mx-auto mb-4" />
        <div className="h-4 bg-orange-100 rounded-xl w-1/3 mx-auto" />
      </div>
    ),
  },
);

import LatestBlogs from "@/components/blog/LatestBlogs";

import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cú Thông Minh",
    url: "https://cuthongminh.com",
    description:
      "Ứng dụng giáo dục tương tác giúp bé vừa học vừa chơi, phát triển tư duy toán học và ngôn ngữ một cách tự nhiên qua hàng trăm trò chơi trực quan.",
    applicationCategory: "EducationalApplication",
    genre: "Educational",
    browserRequirements: "Requires JavaScript",
    softwareVersion: "1.2.0",
    operatingSystem: "All",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://cuthongminh.com",
      dateModified: "2026-05-29T12:00:00+07:00",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "VND",
    },
    publisher: {
      "@type": "Organization",
      name: "Cú Thông Minh",
      logo: "https://cuthongminh.com/icons/favicon-32x32.png",
    },
    screenshot: "https://cuthongminh.com/og-image.webp",
  };

  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-nunito-sans)] overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      {/* Navigation */}
      <HeaderHomeWithSearch />

      <main className="pt-[72px]">
        {/* Hero Section */}
        <header className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
          {/* Background decorations - Hidden on mobile for GPU performance */}
          <div className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob transform-gpu will-change-transform"></div>
          <div className="hidden md:block absolute top-40 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 transform-gpu will-change-transform"></div>
          <div className="hidden md:block absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 transform-gpu will-change-transform"></div>

          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-10 shadow-sm border border-orange-200/50 hover:bg-orange-200 transition-colors cursor-default">
              <BookOpen className="w-4 h-4" />
              <span>Nền tảng học mà chơi số 1 cho bé</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900 leading-[1.1] mb-8 max-w-5xl mx-auto tracking-tight">
              Trò Chơi Giáo Dục <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Tương Tác Cho Bé 3-8 Tuổi
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Cú Thông Minh là nền tảng học tập dành cho trẻ mẫu giáo giúp trẻ học chữ cái, số đếm, màu sắc và hình học
              thông qua các trò chơi tương tác. Hàng trăm trò chơi tương tác lý thú giúp trẻ em từ 3-8 tuổi phát triển
              tư duy toán học, nhận thức không gian và làm quen ngôn ngữ một cách tự nhiên.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                href="/games"
                className="w-full sm:w-auto px-8 py-4 bg-[#FF9C01] hover:bg-orange-500 text-slate-900 font-bold rounded-full group flex items-center justify-center gap-3 text-lg shadow-[0_8px_30px_rgb(255,156,1,0.3)] hover:shadow-[0_8px_30px_rgb(255,156,1,0.4)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
              >
                Trải nghiệm ngay
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#games"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-full border border-slate-200 hover:border-orange-300 hover:bg-orange-50 border-b-4 hover:border-b-orange-400 flex items-center justify-center gap-3 text-lg transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Gamepad2 className="w-5 h-5 text-orange-400" />
                Khám phá Kho bài học
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-sm font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Miễn phí trải nghiệm
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-500" /> An toàn cho bé
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-500" /> Không cần tải app
              </span>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="container mx-auto px-6 relative z-10 mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="text-center p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-100 shadow-sm">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Gamepad2 className="w-5 h-5 text-orange-500" />
                  <span className="text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900">
                    20+
                  </span>
                </div>
                <p className="text-xs md:text-sm font-semibold text-slate-500">Thể loại trò chơi</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-100 shadow-sm">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900">
                    1,000+
                  </span>
                </div>
                <p className="text-xs md:text-sm font-semibold text-slate-500">Phụ huynh tin dùng</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-100 shadow-sm">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900">
                    4.9/5
                  </span>
                </div>
                <p className="text-xs md:text-sm font-semibold text-slate-500">Đánh giá</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-100 shadow-sm">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900">
                    100%
                  </span>
                </div>
                <p className="text-xs md:text-sm font-semibold text-slate-500">An toàn, không QC</p>
              </div>
            </div>
          </div>
          {/* Sentinel for FloatingCTA IntersectionObserver */}
          <div id="hero-sentinel" className="absolute bottom-0 h-1 w-full" aria-hidden="true" />
        </header>

        {/* Features Showcase — rendered immediately (near-fold, no ScrollReveal delay) */}
        <section
          id="features"
          className="py-24 bg-white relative z-20 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)] rounded-t-[3rem]"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2
                id="loi-ich"
                className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6 tracking-tight"
              >
                Lợi ích khi là <span className="text-orange-500">Cú Thông Minh</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Ứng dụng được thiết kế kỹ lưỡng dựa trên <strong>phương pháp giáo dục sớm</strong>, phù hợp với tâm lý
                trẻ nhỏ.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="group bg-slate-50 rounded-[2.5rem] p-10 hover:bg-orange-50 hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-orange-200 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent opacity-50 rounded-bl-[100%] transition-transform group-hover:scale-110"></div>
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-200 group-hover:shadow-md transition-all duration-300 -rotate-3 text-blue-500 relative z-10">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-baloo-2)] relative z-10">
                  Phát triển toàn diện
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium relative z-10">
                  Rèn luyện khả năng quan sát, tư duy chiến lược và xử lý vấn đề qua từng thử thách lôi cuốn. Bé được{" "}
                  <strong>học toán đếm số</strong>, phép cộng trừ, nhận biết hình dạng,{" "}
                  <strong>chữ cái tiếng Việt</strong> và <strong>tư duy logic</strong>— tất cả qua phương pháp giáo dục
                  sớm Montessori, giúp <strong>trẻ mầm non 3-8 tuổi</strong> phát triển trí tuệ theo đúng lộ trình chuẩn
                  bị vào lớp 1.
                </p>
              </div>

              <div className="group bg-slate-50 rounded-[2.5rem] p-10 hover:bg-orange-50 hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-orange-200 hover:-translate-y-2 relative overflow-hidden transform md:-translate-y-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-100 to-transparent opacity-50 rounded-bl-[100%] transition-transform group-hover:scale-110"></div>
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-pink-200 group-hover:shadow-md transition-all duration-300 rotate-3 text-pink-500 relative z-10">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-baloo-2)] relative z-10">
                  Tương tác thú vị
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium relative z-10">
                  Hình ảnh sắc nét, âm thanh sống động và nhân vật ngộ nghĩnh truyền cảm hứng học tập mỗi ngày. Mỗi{" "}
                  <strong>trò chơi giáo dục</strong> được thiết kế dựa trên nghiên cứu tâm lý trẻ em, kết hợp hoạt hình
                  tương tác và phản hồi tích cực để bé chủ động khám phá kiến thức về toán học, ngôn ngữ, khoa học và{" "}
                  <strong>kỹ năng sống</strong>.
                </p>
              </div>

              <div className="group bg-slate-50 rounded-[2.5rem] p-10 hover:bg-orange-50 hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-orange-200 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100 to-transparent opacity-50 rounded-bl-[100%] transition-transform group-hover:scale-110"></div>
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-green-200 group-hover:shadow-md transition-all duration-300 rotate-6 text-green-500 relative z-10">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-baloo-2)] relative z-10">
                  Môi trường An toàn
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium relative z-10">
                  Tuyệt đối không có quảng cáo, không nội dung độc hại. Hệ thống theo dõi tiến độ học tập cho phép ba mẹ
                  nắm bắt quá trình phát triển của bé mỗi ngày. Dữ liệu cá nhân được bảo mật hoàn toàn, tuân thủ quy
                  định bảo vệ trẻ em trên không gian mạng.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Games Preview Section */}
        <ScrollReveal delay={100}>
          <section
            id="games"
            className="py-24 relative overflow-hidden bg-slate-900 rounded-[3rem] mx-2 lg:mx-8 my-8 shadow-2xl"
          >
            {/* Background patterns - simplified for mobile performance */}
            <div className="absolute inset-0 bg-[url('/patterns/stardust.png')] opacity-10 md:opacity-20 md:mix-blend-overlay"></div>
            <div className="hidden md:block absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="container mx-auto px-6 relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 font-bold mb-6 backdrop-blur-md">
                <Trophy className="w-4 h-4 text-yellow-400" />
                Kho tàng tri thức
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-baloo-2)] text-white mb-6">
                Thế giới giải trí bất tận
              </h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
                Hơn 20+ thể loại trò chơi từ thế giới muôn loài, đồ vật, học chữ cái đến rèn luyện khả năng tính toán.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
                {GROUPS.map((group, i) => {
                  const bgGradient = [
                    "from-blue-400 to-blue-600 shadow-blue-500/30",
                    "from-emerald-400 to-emerald-600 shadow-emerald-500/30",
                    "from-pink-400 to-pink-600 shadow-pink-500/30",
                    "from-amber-400 to-amber-600 shadow-amber-500/30",
                    "from-indigo-400 to-indigo-600 shadow-indigo-500/30",
                    "from-purple-400 to-purple-600 shadow-purple-500/30",
                    "from-red-400 to-red-600 shadow-red-500/30",
                    "from-teal-400 to-teal-600 shadow-teal-500/30",
                  ][i % 8];

                  return (
                    <Link
                      key={group.id}
                      href={`/${group.slug}`}
                      className={`h-auto sm:min-h-[16rem] rounded-3xl bg-gradient-to-br ${bgGradient} p-6 flex flex-col items-center justify-center text-white hover:scale-[1.03] transition-transform duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group`}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-md">
                        <Image
                          src={group.icon}
                          alt={group.title}
                          fill
                          sizes="(max-width: 640px) 64px, 80px"
                          className="object-contain"
                        />
                      </div>
                      <span className="font-bold text-xl sm:text-2xl font-[family-name:var(--font-baloo-2)] text-center drop-shadow-md leading-tight mb-2">
                        {group.title}
                      </span>
                      {GROUP_DESCRIPTIONS[group.id] && (
                        <p className="hidden md:block text-sm text-white/95 text-center line-clamp-3 font-medium mt-1 leading-relaxed drop-shadow-sm">
                          {GROUP_DESCRIPTIONS[group.id]}
                        </p>
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-16">
                <Link
                  href="/games"
                  className="inline-flex items-center justify-center px-8 lg:px-12 py-4 bg-white hover:bg-slate-100 text-slate-900 font-extrabold rounded-full gap-3 transition-colors duration-300 text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
                >
                  Học thử ngay
                  <ArrowRight className="w-5 h-5 text-orange-500" />
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Latest Blogs Section */}
        <ScrollReveal delay={100}>
          <LatestBlogs />
        </ScrollReveal>

        {/* Educational Methodology Section */}
        <ScrollReveal delay={100}>
          <section className="py-24 bg-slate-50 relative border-y border-slate-100">
            <div className="container mx-auto px-6 max-w-5xl">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold mb-6">
                  <Star className="w-4 h-4" /> Phương pháp học tập
                </div>
                <h2
                  id="phuong-phap"
                  className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6 tracking-tight"
                >
                  Phương pháp <span className="text-orange-500">Giáo dục sớm</span> tại Cú Thông Minh
                </h2>
              </div>
              <div className="flex flex-col gap-8 md:gap-12">
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8 md:gap-12 hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-baloo-2)]">
                      Lấy cảm hứng từ Montessori & Play-based Learning
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed mb-4">
                      Tại Cú Thông Minh, chúng tôi áp dụng triết lý "Vừa học vừa chơi" (Play-based learning) kết hợp
                      cùng tinh hoa của phương pháp giáo dục sớm Montessori. Chúng tôi tin rằng trẻ em ở độ tuổi mầm non
                      học hỏi tốt nhất khi được tự do khám phá trong một môi trường an toàn, vui vẻ và đầy màu sắc.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      Lộ trình học tập được thiết kế cá nhân hóa cho từng bé từ 3 đến 8 tuổi. Bắt đầu từ những khái niệm
                      cơ bản về màu sắc, hình chữ cái, bé sẽ dần làm quen với các khái niệm phức tạp hơn như toán học tư
                      duy, quy luật logic và khoa học tự nhiên. Mọi bài học đều kích thích đa giác quan qua hình ảnh sắc
                      nét và âm thanh sống động. Ba mẹ có thể khám phá thêm{" "}
                      <Link href="/about-us" className="text-orange-500 font-bold hover:underline">
                        về chúng tôi và đội ngũ giáo viên sáng lập
                      </Link>
                      .
                    </p>
                  </div>
                  <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 bg-orange-50 rounded-full flex items-center justify-center relative overflow-hidden group">
                    <Brain className="w-20 h-20 md:w-24 md:h-24 text-orange-500 group-hover:scale-110 transition-transform duration-500 drop-shadow-md" />
                  </div>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-baloo-2)]">
                      Môi trường học tập chủ động và an toàn
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed mb-4">
                      Chúng tôi hiểu nỗi lo của phụ huynh về thời gian sử dụng thiết bị điện tử. Vì vậy, Cú Thông Minh
                      được thiết kế giúp bé tương tác chủ động thay vì xem thụ động. Các trò chơi đòi hỏi bé phải suy
                      nghĩ, kéo thả, ghép nối và đưa ra quyết định liên tục.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      Đặc biệt, hệ thống hoạt động hoàn toàn không chứa quảng cáo, đảm bảo 100% môi trường giáo dục trực
                      tuyến trong sạch. Phụ huynh cũng được cung cấp công cụ giới hạn thời gian học tập và cấu hình độ
                      khó chuyên sâu để đồng hành sát sao cùng tiến trình phát triển trí tuệ của con mình mỗi ngày.
                    </p>
                  </div>
                  <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 bg-green-50 rounded-full flex items-center justify-center relative overflow-hidden group">
                    <ShieldCheck className="w-20 h-20 md:w-24 md:h-24 text-green-500 group-hover:scale-110 transition-transform duration-500 drop-shadow-md" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Testimonial / Social Proof (Slider) */}
        <ScrollReveal delay={100}>
          <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6 max-w-5xl">
              <div className="text-center mb-16">
                <h2
                  id="phu-huynh"
                  className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6 tracking-tight"
                >
                  Phụ huynh nói gì về <span className="text-orange-500">Cú Thông Minh</span>?
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                  Hàng ngàn gia đình đã tin công ứng dụng để làm bạn đồng hành cùng bé mỗi ngày.
                </p>
              </div>

              <TestimonialSlider />
            </div>
          </section>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal delay={100}>
          <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#FF9C01] to-orange-500">
            <div className="absolute inset-0 bg-[url('/patterns/cubes.png')] opacity-5 md:opacity-10 md:mix-blend-overlay"></div>
            <div className="container mx-auto px-6 relative z-10 text-center text-white">
              <h2
                id="bat-dau"
                className="text-4xl md:text-6xl font-extrabold font-[family-name:var(--font-baloo-2)] mb-8 tracking-tight drop-shadow-md"
              >
                Khơi dậy tiềm năng cùng bé
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 font-medium drop-shadow-sm">
                Tham gia cộng đồng phụ huynh tin dùng Cú Thông Minh để mang đến tương lai tươi sáng cho con bạn.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/auth/sign-up"
                  className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-bold rounded-full text-lg md:text-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Đăng ký tài khoản miễn phí
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-bold text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Chương trình đã được kiểm duyệt
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Không lo gián đoạn bởi quảng cáo
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Sử dụng đa nền tảng
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      {/* FAQ Section — AEO optimized */}
      <ScrollReveal delay={100}>
        <FAQSchema
          items={HOME_FAQ_ITEMS}
          title="Câu hỏi thường gặp"
          subtitle="Những thắc mắc phổ biến của phụ huynh về Cú Thông Minh"
        />
      </ScrollReveal>

      {/* Speakable Schema for AI voice reading */}
      <SpeakableSchema url="https://cuthongminh.com" cssSelectors={["h1", "main > header p", "#faq"]} />

      {/* Footer */}
      <Footer />

      {/* CRO Components */}
      <FloatingCTA />
      <ExitIntentPopup />
    </div>
  );
}
