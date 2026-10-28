import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";
import { ENGLISH_NAMES, GENDER_LABELS, TIER_LABELS } from "@/libs/data/english-names";
import { NameFinder } from "./NameFinder";
import { HeaderHomeWithSearch } from "@/components/layout/HeaderHomeWithSearch";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Tên Tiếng Anh Cho Bé — 70+ Tên Hay & Ý Nghĩa Theo Tên Việt",
  description:
    "Tìm tên tiếng Anh hay cho bé trai, bé gái theo ý nghĩa tên tiếng Việt. 70+ tên đẹp kèm phiên âm, nghĩa, nguồn gốc. Nhập tên Việt → gợi ý tên Anh phù hợp. Miễn phí 100%.",
  keywords: [
    "tên tiếng Anh cho bé",
    "tên tiếng Anh cho bé trai",
    "tên tiếng Anh cho bé gái",
    "đặt tên tiếng Anh hay",
    "tên tiếng Anh theo tên Việt",
    "tên tiếng Anh ý nghĩa",
    "English name for Vietnamese baby",
    "tên Anh hay cho con",
    "tên tiếng Anh dễ gọi",
    "tên tiếng Anh phổ biến",
  ],
  alternates: {
    canonical: "/cong-cu/ten-tieng-anh-cho-be",
  },
  openGraph: {
    title: "Tên Tiếng Anh Cho Bé — Gợi Ý Theo Tên Việt",
    description:
      "Nhập tên tiếng Việt của bé → nhận gợi ý tên tiếng Anh phù hợp nghĩa. 70+ tên đẹp kèm phiên âm, nguồn gốc. Miễn phí!",
    url: "https://cuthongminh.com/cong-cu/ten-tieng-anh-cho-be",
    type: "website",
    images: [
      {
        url: "https://cuthongminh.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Tên tiếng Anh cho bé - Cú Thông Minh",
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    q: "Nên đặt tên tiếng Anh cho bé từ mấy tuổi?",
    a: "Bạn có thể đặt tên tiếng Anh cho bé ngay từ khi sinh ra. Nhiều phụ huynh chọn tên Anh cùng lúc với tên Việt để sử dụng trong trường quốc tế, giao tiếp với người nước ngoài, hoặc đơn giản vì thích. Tên Anh không cần phải đăng ký chính thức — nó là tên gọi thân mật.",
  },
  {
    q: "Làm sao chọn tên tiếng Anh hợp với tên tiếng Việt?",
    a: "Có 3 cách phổ biến: (1) Chọn tên có cùng ý nghĩa — VD: Minh → Lucas (ánh sáng), (2) Chọn tên phát âm gần giống — VD: Hân → Hannah, Mỹ → Mia, (3) Chọn tên bắt đầu cùng chữ cái — VD: Thanh → Theo, Lan → Luna. Công cụ của chúng tôi gợi ý theo cả 3 cách.",
  },
  {
    q: "Tên tiếng Anh nào phổ biến nhất cho bé trai 2024-2026?",
    a: "Top 10 tên tiếng Anh phổ biến nhất cho bé trai: Liam, Noah, Oliver, James, Ethan, Lucas, Mason, Leo, Henry, Alexander. Trong đó Leo và Kai đang ngày càng phổ biến nhờ ngắn gọn, dễ phát âm quốc tế.",
  },
  {
    q: "Tên tiếng Anh nào đẹp nhất cho bé gái?",
    a: "Top 10 tên đẹp: Olivia, Emma, Sophia, Luna, Mia, Ava, Chloe, Lily, Aurora, Mila. Các tên mang nghĩa thiên nhiên (Luna — mặt trăng, Aurora — bình minh, Lily — hoa huệ) đang rất được yêu thích.",
  },
  {
    q: "Tên unisex là gì? Có nên đặt tên unisex cho bé?",
    a: "Tên unisex (trung tính) là tên phù hợp cho cả bé trai lẫn bé gái, ví dụ: Alex, Sam, Charlie, Sky, Jordan. Đặt tên unisex là xu hướng hiện đại, giúp bé không bị giới hạn bởi khuôn mẫu giới tính. Tuy nhiên, hãy cân nhắc ngữ cảnh văn hóa gia đình.",
  },
];

export default function EnglishNameToolPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Tên Tiếng Anh Cho Bé — Gợi Ý Theo Tên Việt",
    description:
      "Công cụ miễn phí tìm tên tiếng Anh hay cho bé trai, bé gái theo ý nghĩa tên tiếng Việt. 70+ tên đẹp kèm phiên âm, nguồn gốc.",
    url: "https://cuthongminh.com/cong-cu/ten-tieng-anh-cho-be",
    inLanguage: "vi",
    publisher: {
      "@type": "Organization",
      name: "Cú Thông Minh",
      url: "https://cuthongminh.com",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Cú Thông Minh",
      url: "https://cuthongminh.com",
    },
  };

  // Group names for static SEO tables
  const boyNames = ENGLISH_NAMES.filter((n) => n.gender === "boy");
  const girlNames = ENGLISH_NAMES.filter((n) => n.gender === "girl");

  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-nunito-sans)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(pageSchema) }} />

      <HeaderHomeWithSearch />

      <main className="pt-[72px]">
        <div className="container mx-auto px-6 max-w-4xl py-8 md:py-12">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Công cụ", href: "/cong-cu" },
              { label: "Tên tiếng Anh cho bé", href: "/cong-cu/ten-tieng-anh-cho-be" },
            ]}
          />

          {/* Hero */}
          <div className="text-center mt-8 mb-10">
            <h1 className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-4 tracking-tight">
              Tìm <span className="text-orange-500">Tên Tiếng Anh</span> Cho Bé
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Nhập tên tiếng Việt của bé — nhận gợi ý tên tiếng Anh{" "}
              <strong className="text-slate-700">cùng ý nghĩa</strong>. 70+ tên đẹp kèm phiên âm, nguồn gốc. Miễn phí
              100%.
            </p>
          </div>

          {/* Name Finder */}
          <NameFinder />

          {/* SEO Content Sections */}
          <div className="mt-16 space-y-16">
            {/* Full Name Tables for SEO */}
            <section id="danh-sach-ten">
              <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6">
                Danh Sách Tên Tiếng Anh Hay Cho Bé
              </h2>

              <div className="space-y-8">
                {/* Boys */}
                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-4 font-[family-name:var(--font-baloo-2)]">
                    👦 Tên tiếng Anh cho bé trai
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-50">
                          <th className="px-4 py-3 text-left font-bold text-slate-700">Tên</th>
                          <th className="px-3 py-3 text-left font-bold text-slate-700">Phiên âm</th>
                          <th className="px-3 py-3 text-left font-bold text-slate-700">Ý nghĩa</th>
                          <th className="px-3 py-3 text-left font-bold text-slate-700">Tên Việt tương ứng</th>
                          <th className="px-3 py-3 text-left font-bold text-slate-700">Nguồn gốc</th>
                        </tr>
                      </thead>
                      <tbody>
                        {boyNames.map((n) => (
                          <tr key={n.name} className="border-t border-slate-100 hover:bg-slate-50">
                            <td className="px-4 py-2 font-bold text-slate-900">{n.name}</td>
                            <td className="px-3 py-2 text-slate-500">/{n.phonetic}/</td>
                            <td className="px-3 py-2 text-slate-600">{n.meaning}</td>
                            <td className="px-3 py-2 text-orange-600 font-medium">{n.vietnameseMatch.join(", ")}</td>
                            <td className="px-3 py-2 text-slate-400">{n.origin}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Girls */}
                <div>
                  <h3 className="text-xl font-bold text-pink-600 mb-4 font-[family-name:var(--font-baloo-2)]">
                    👧 Tên tiếng Anh cho bé gái
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-pink-50">
                          <th className="px-4 py-3 text-left font-bold text-slate-700">Tên</th>
                          <th className="px-3 py-3 text-left font-bold text-slate-700">Phiên âm</th>
                          <th className="px-3 py-3 text-left font-bold text-slate-700">Ý nghĩa</th>
                          <th className="px-3 py-3 text-left font-bold text-slate-700">Tên Việt tương ứng</th>
                          <th className="px-3 py-3 text-left font-bold text-slate-700">Nguồn gốc</th>
                        </tr>
                      </thead>
                      <tbody>
                        {girlNames.map((n) => (
                          <tr key={n.name} className="border-t border-slate-100 hover:bg-slate-50">
                            <td className="px-4 py-2 font-bold text-slate-900">{n.name}</td>
                            <td className="px-3 py-2 text-slate-500">/{n.phonetic}/</td>
                            <td className="px-3 py-2 text-slate-600">{n.meaning}</td>
                            <td className="px-3 py-2 text-orange-600 font-medium">{n.vietnameseMatch.join(", ")}</td>
                            <td className="px-3 py-2 text-slate-400">{n.origin}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* How to choose */}
            <section id="cach-chon-ten">
              <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6">
                Cách Chọn Tên Tiếng Anh Phù Hợp Với Tên Việt
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="text-3xl mb-3">💡</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Cùng ý nghĩa</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Chọn tên Anh có nghĩa tương đương tên Việt. Ví dụ: bé tên <strong>Minh</strong> (sáng) →{" "}
                    <strong>Lucas</strong> (ánh sáng), bé tên <strong>Hải</strong> → <strong>Dylan</strong> (con trai
                    của biển).
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="text-3xl mb-3">🔤</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Phát âm gần giống</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Chọn tên Anh nghe gần giống tên Việt. Ví dụ: <strong>Hân</strong> → <strong>Hannah</strong>,
                    <strong> Mi</strong> → <strong>Mia</strong>, <strong>Ly</strong> → <strong>Lily</strong>.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Cùng chữ cái đầu</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Dễ nhớ khi tên Anh và tên Việt bắt đầu cùng chữ. Ví dụ: <strong>Thanh</strong> →{" "}
                    <strong>Theo</strong>,<strong> Long</strong> → <strong>Leo</strong>, <strong>An</strong> →{" "}
                    <strong>Ava</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="cau-hoi-thuong-gap">
              <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6">
                Câu Hỏi Thường Gặp
              </h2>
              <div className="space-y-4">
                {FAQ_ITEMS.map((item, i) => (
                  <details key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm group">
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-bold text-slate-900 hover:text-orange-600 transition-colors">
                      {item.q}
                      <span className="text-orange-500 shrink-0 transition-transform group-open:rotate-45 text-xl">
                        +
                      </span>
                    </summary>
                    <p className="px-5 pb-5 text-slate-600 leading-relaxed text-sm">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related tools */}
            <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl border border-blue-100 p-8 text-center">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-3">
                🦉 Khám phá thêm công cụ miễn phí
              </h2>
              <p className="text-slate-500 mb-6 max-w-lg mx-auto">
                Cú Thông Minh cung cấp nhiều công cụ hữu ích cho phụ huynh
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/cong-cu/chieu-cao-can-nang"
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors shadow-md"
                >
                  📊 Tra cứu chiều cao cân nặng
                </Link>
                <Link
                  href="/games"
                  className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-full border border-slate-200 transition-colors"
                >
                  🎮 Trò chơi giáo dục
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
