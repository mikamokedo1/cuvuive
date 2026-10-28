import type { Metadata } from "next";
import Link from "next/link";
import { ROADMAPS } from "@/libs/constants/roadmaps";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { HeaderHomeWithSearch } from "@/components/layout/HeaderHomeWithSearch";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import { RoadmapIndexList } from "./RoadmapIndexList";

export const metadata: Metadata = {
  title: "Lộ Trình Học Tập Theo Độ Tuổi (3-8 Tuổi)",
  description:
    "Khám phá 3 lộ trình học tập được thiết kế riêng cho từng nhóm tuổi: Bé Khám Phá (3-4 tuổi), Tiền Lớp 1 (5-6 tuổi), Tiểu Học Vui (7-8 tuổi). Giúp bé phát triển toàn diện qua trò chơi giáo dục tương tác.",
  keywords: [
    "lộ trình học tập cho bé",
    "lộ trình bé khám phá 3 4 tuổi",
    "lộ trình tiền lớp 1 5 6 tuổi",
    "lộ trình tiểu học vui 7 12 tuổi",
    "chương trình học mầm non theo tuổi",
    "học theo độ tuổi",
    "chuẩn bị vào lớp 1",
    "tiền lớp 1",
    "tiền tiểu học",
    "bài học tiền lớp 1",
    "bài học tiền tiểu học",
    "trò chơi giáo dục theo tuổi",
    "cú thông minh",
  ],
  alternates: {
    canonical: "/lo-trinh",
  },
  openGraph: {
    title: "Lộ Trình Học Tập Theo Độ Tuổi - Cú Thông Minh",
    description:
      "3 lộ trình học tập cho bé 3-8 tuổi. Mỗi lộ trình được thiết kế phù hợp với giai đoạn phát triển của trẻ.",
  },
};

export default function LoTrinhIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Lộ Trình Học Tập Theo Độ Tuổi - Cú Thông Minh",
    description: "3 lộ trình học tập cho bé 3-8 tuổi, thiết kế phù hợp giai đoạn phát triển của trẻ.",
    url: "https://cuthongminh.com/lo-trinh",
    mainEntity: ROADMAPS.map((r) => ({
      "@type": "Course",
      name: `Lộ Trình ${r.title}`,
      description: r.description,
      url: `https://cuthongminh.com/lo-trinh/${r.slug}`,
      educationalLevel: r.educationalLevel,
      audience: {
        "@type": "EducationalAudience",
        suggestedMinAge: r.ageRange[0],
        suggestedMaxAge: r.ageRange[1],
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <HeaderHomeWithSearch />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 font-[family-name:var(--font-nunito-sans)]">
        {/* Breadcrumbs */}
        <div className="pt-24 px-4 max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Lộ Trình Học Tập", href: "/lo-trinh" },
            ]}
          />
        </div>

        {/* Hero */}
        <header className="pt-4 sm:pt-8 pb-12 px-4 text-center relative overflow-hidden">
          {/* Background blobs */}
          <div className="hidden md:block absolute top-20 left-10 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob transform-gpu" />
          <div className="hidden md:block absolute top-32 right-16 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 transform-gpu" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6 border border-orange-200/50">
              Thiết kế theo từng độ tuổi
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900 leading-tight mb-6">
              Lộ Trình Học Tập{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Cho Bé</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Mỗi bé là một hành trình riêng. Chọn lộ trình phù hợp với độ tuổi để bé phát triển toàn diện qua{" "}
              <strong>trò chơi giáo dục tương tác</strong>.
            </p>
          </div>
        </header>

        {/* Roadmap Cards */}
        <section className="px-4 pb-20 max-w-5xl mx-auto">
          <RoadmapIndexList />
        </section>

        {/* Bottom info */}
        <section className="px-4 pb-16 max-w-3xl mx-auto text-center">
          <div className="bg-orange-50 rounded-[2rem] p-8 border border-orange-100">
            <h3 className="text-xl font-extrabold text-slate-800 font-[family-name:var(--font-baloo-2)] mb-3">
              Không biết chọn lộ trình nào?
            </h3>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Chọn theo tuổi của bé là chuẩn nhất! Nếu bé giỏi hơn tuổi, ba mẹ có thể cho bé thử lộ trình cao hơn.
            </p>
            <Link
              href="/games"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Hoặc khám phá tất cả trò chơi
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
