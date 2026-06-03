import type { Metadata } from "next";
import Link from "next/link";
import { Ruler, Type, ArrowRight, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";
import { HeaderHomeWithSearch } from "@/components/layout/HeaderHomeWithSearch";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Công Cụ Miễn Phí Cho Phụ Huynh | Cú Thông Minh",
  description:
    "Bộ công cụ miễn phí dành cho phụ huynh: tra cứu chiều cao cân nặng trẻ em theo WHO, tìm tên tiếng Anh cho bé, và nhiều tiện ích hữu ích khác. 100% miễn phí.",
  keywords: [
    "công cụ cho phụ huynh",
    "chiều cao cân nặng trẻ em",
    "tên tiếng Anh cho bé",
    "công cụ miễn phí cho bé",
    "tiện ích nuôi dạy con",
  ],
  alternates: {
    canonical: "/cong-cu",
  },
  openGraph: {
    title: "Công Cụ Miễn Phí Cho Phụ Huynh — Cú Thông Minh",
    description:
      "Bộ công cụ miễn phí: tra cứu chiều cao cân nặng, tìm tên tiếng Anh cho bé, và nhiều hơn nữa.",
    url: "https://cuthongminh.com/cong-cu",
    type: "website",
  },
};

interface Tool {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
  tag: string;
  tagColor: string;
}

const TOOLS: Tool[] = [
  {
    title: "Tra Cứu Chiều Cao Cân Nặng Trẻ Em",
    description:
      "Kiểm tra bé phát triển bình thường không theo chuẩn WHO. Biểu đồ percentile trực quan, BMI theo tuổi. Dữ liệu 0-8 tuổi.",
    href: "/cong-cu/chieu-cao-can-nang",
    icon: <Ruler className="w-8 h-8" />,
    gradient: "from-emerald-400 to-teal-500",
    tag: "Sức khỏe",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Tìm Tên Tiếng Anh Cho Bé",
    description:
      "Nhập tên tiếng Việt — nhận gợi ý tên tiếng Anh phù hợp nghĩa. 70+ tên đẹp kèm phiên âm, nguồn gốc. Lưu yêu thích.",
    href: "/cong-cu/ten-tieng-anh-cho-be",
    icon: <Type className="w-8 h-8" />,
    gradient: "from-blue-400 to-indigo-500",
    tag: "Ngôn ngữ",
    tagColor: "bg-blue-100 text-blue-700",
  },
];

export default function ToolsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://cuthongminh.com" },
      { "@type": "ListItem", position: 2, name: "Công cụ", item: "https://cuthongminh.com/cong-cu" },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Công Cụ Miễn Phí Cho Phụ Huynh",
    description: "Bộ công cụ miễn phí dành cho phụ huynh nuôi dạy con từ 0-8 tuổi.",
    url: "https://cuthongminh.com/cong-cu",
    publisher: {
      "@type": "Organization",
      name: "Cú Thông Minh",
      url: "https://cuthongminh.com",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-nunito-sans)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(collectionSchema) }} />

      <HeaderHomeWithSearch />

      <main className="pt-[72px]">
        <div className="container mx-auto px-6 max-w-5xl py-8 md:py-12">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Công cụ" },
            ]}
          />

          {/* Hero */}
          <div className="text-center mt-8 mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6">
              <Sparkles className="w-4 h-4" /> Miễn phí 100%
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-4 tracking-tight">
              Công Cụ{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Miễn Phí
              </span>{" "}
              Cho Phụ Huynh
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Bộ tiện ích hữu ích giúp ba mẹ chăm sóc và nuôi dạy bé tốt hơn mỗi ngày.
              Không cần đăng ký, không giới hạn sử dụng.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Icon header */}
                <div className={`bg-gradient-to-br ${tool.gradient} p-8 flex items-center justify-center text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
                  <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full" />
                  <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${tool.tagColor}`}>
                      {tool.tag}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 font-[family-name:var(--font-baloo-2)] group-hover:text-orange-600 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-500 group-hover:gap-3 transition-all">
                    Sử dụng ngay <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}

            {/* Coming Soon card */}
            <div className="md:col-span-2 bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-lg font-bold text-slate-700 mb-2 font-[family-name:var(--font-baloo-2)]">
                Sắp có thêm công cụ mới!
              </h3>
              <p className="text-sm text-slate-400 max-w-md">
                Lịch tiêm chủng, bảng theo dõi thói quen, quiz trí thông minh, và nhiều hơn nữa.
                Theo dõi Cú Thông Minh để không bỏ lỡ!
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-3xl border border-orange-100 p-8 text-center">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-3">
              🦉 Khám phá thêm Cú Thông Minh
            </h2>
            <p className="text-slate-500 mb-6 max-w-lg mx-auto">
              Ngoài công cụ miễn phí, Cú Thông Minh còn có 100+ trò chơi giáo dục tương tác cho bé 3-8 tuổi
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/games"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors shadow-md"
              >
                🎮 Khám phá trò chơi
              </Link>
              <Link
                href="/blogs"
                className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-full border border-slate-200 transition-colors"
              >
                📖 Blog nuôi dạy con
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
