import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeaderboardView } from "@/features/leaderboard/LeaderboardView";
import { getLeaderboardAction, getMyRankAction } from "@/libs/actions/leaderboard";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";

export const metadata: Metadata = {
  title: "Bảng Xếp Hạng Cú Thông Minh — Top Bé Giỏi Nhất",
  description:
    "Xem bảng xếp hạng các bé học giỏi nhất trên Cú Thông Minh. Hoàn thành bài học, giữ streak và leo hạng cùng bạn bè!",
  alternates: {
    canonical: "https://cuthongminh.com/leaderboard",
  },
  openGraph: {
    title: "Bảng Xếp Hạng — Cú Thông Minh",
    description: "Top 20 bé giỏi nhất trên Cú Thông Minh. Hoàn thành bài học để leo hạng!",
    url: "https://cuthongminh.com/leaderboard",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const [entries, myRank] = await Promise.all([getLeaderboardAction(), getMyRankAction()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Bảng Xếp Hạng Cú Thông Minh",
    description:
      "Bảng xếp hạng các bé học giỏi nhất trên nền tảng giáo dục Cú Thông Minh. Xếp hạng dựa trên Điểm Thông Minh tổng hợp từ bài học hoàn thành, thời gian học và chuỗi ngày học liên tiếp.",
    url: "https://cuthongminh.com/leaderboard",
    isPartOf: {
      "@type": "WebSite",
      name: "Cú Thông Minh",
      url: "https://cuthongminh.com",
    },
    breadcrumb: {
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
          name: "Bảng Xếp Hạng",
          item: "https://cuthongminh.com/leaderboard",
        },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <div className="min-h-screen bg-[#F0F7FF] py-6 px-4">
        <Header />

        <div className="container mx-auto max-w-3xl pt-4">
          {/* Page Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-bold text-sm mb-4">
              🏆 Bảng Vinh Danh
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-[family-name:var(--font-baloo-2)] mb-3 tracking-tight">
              Bảng Xếp Hạng{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Cú Thông Minh
              </span>
            </h1>
            <p className="text-slate-500 font-medium max-w-lg mx-auto">
              Hoàn thành bài học, giữ streak và leo hạng cùng bạn bè nhé
            </p>

            {/* Score formula explanation */}
            <div className="mt-6 inline-flex items-center gap-3 bg-white rounded-xl px-5 py-3 border border-slate-100 shadow-sm text-sm text-slate-500">
              <span className="font-semibold text-slate-700">Điểm Thông Minh</span>
              <span>=</span>
              <span>Bài học × 100</span>
              <span>+</span>
              <span>Phút học × 10</span>
              <span>+</span>
              <span>Streak × 50</span>
            </div>
          </div>

          {/* Leaderboard Content */}
          <LeaderboardView entries={entries} myRank={myRank} />
        </div>
      </div>
      <Footer />
    </>
  );
}
