import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";
import { GrowthCalculator } from "./GrowthCalculator";
import { WHOTable } from "./WHOTable";
import { HeaderHomeWithSearch } from "@/components/layout/HeaderHomeWithSearch";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Tra Cứu Chiều Cao Cân Nặng Trẻ Em Theo Chuẩn WHO 2026 | Cú Thông Minh",
  description:
    "Bảng chiều cao cân nặng trẻ em từ sơ sinh đến 8 tuổi theo chuẩn WHO. Nhập tuổi, cân nặng, chiều cao — xem ngay bé phát triển bình thường không. Biểu đồ percentile trực quan, miễn phí 100%.",
  keywords: [
    "chiều cao cân nặng trẻ em",
    "bảng chiều cao cân nặng trẻ em theo WHO",
    "bé 2 tuổi nặng bao nhiêu",
    "bé 3 tuổi cao bao nhiêu",
    "cân nặng trẻ sơ sinh theo tháng",
    "bảng cân nặng trẻ em theo tháng tuổi",
    "chiều cao trung bình trẻ em Việt Nam",
    "cách tính BMI cho trẻ em",
    "biểu đồ tăng trưởng trẻ em",
    "WHO growth standards",
  ],
  alternates: {
    canonical: "/cong-cu/chieu-cao-can-nang",
  },
  openGraph: {
    title: "Tra Cứu Chiều Cao Cân Nặng Trẻ Em Theo Chuẩn WHO",
    description:
      "Công cụ miễn phí tra cứu chiều cao cân nặng trẻ em 0-8 tuổi. Biểu đồ percentile WHO trực quan, BMI theo tuổi. Xem ngay bé phát triển bình thường không!",
    url: "https://cuthongminh.com/cong-cu/chieu-cao-can-nang",
    type: "website",
    images: [
      {
        url: "https://cuthongminh.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Tra cứu chiều cao cân nặng trẻ em - Cú Thông Minh",
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    q: "Bé 1 tuổi nặng bao nhiêu kg là bình thường?",
    a: "Theo chuẩn WHO, bé trai 12 tháng tuổi nặng trung bình 9.6 kg (khoảng 7.7-12.0 kg), bé gái nặng trung bình 8.9 kg (khoảng 7.0-11.5 kg). Nếu bé nằm trong khoảng percentile 3-97 thì đều bình thường.",
  },
  {
    q: "Bé 2 tuổi cao bao nhiêu cm?",
    a: "Bé trai 24 tháng tuổi cao trung bình 87.8 cm (khoảng 81.7-93.9 cm). Bé gái cao trung bình 86.4 cm (khoảng 80.0-92.9 cm). Chiều cao phụ thuộc nhiều vào di truyền, dinh dưỡng và giấc ngủ.",
  },
  {
    q: "BMI trẻ em tính như thế nào?",
    a: "BMI = cân nặng (kg) / chiều cao (m)². Tuy nhiên, với trẻ em dưới 2 tuổi không nên dùng BMI. Từ 2 tuổi trở lên, BMI cần so sánh theo biểu đồ percentile vì giá trị BMI bình thường thay đổi theo tuổi và giới tính.",
  },
  {
    q: "Khi nào cần đưa bé đi khám bác sĩ?",
    a: "Nên đưa bé đi khám khi: cân nặng hoặc chiều cao dưới percentile 3 hoặc trên 97, bé giảm cân liên tục trong 2-3 tháng, hoặc bé đột ngột chậm tăng trưởng so với tháng trước. Bác sĩ nhi khoa sẽ đánh giá toàn diện.",
  },
  {
    q: "Dữ liệu WHO có áp dụng cho trẻ em Việt Nam không?",
    a: "Có. WHO Growth Standards được xây dựng từ nghiên cứu trẻ em khỏe mạnh ở 6 quốc gia (Brazil, Ghana, Ấn Độ, Na Uy, Oman, Mỹ) và áp dụng toàn cầu. Bộ Y tế Việt Nam cũng sử dụng bảng WHO làm chuẩn tham chiếu.",
  },
  {
    q: "Cách đo chiều cao và cân nặng chính xác tại nhà?",
    a: "Với bé dưới 2 tuổi: đo chiều dài nằm bằng thước dây trên mặt phẳng. Từ 2 tuổi: đo chiều cao đứng, chân trần, lưng thẳng áp tường. Cân nặng: đo buổi sáng, sau khi đi vệ sinh, mặc quần áo mỏng. Dùng cân điện tử cho kết quả chính xác nhất.",
  },
];

export default function GrowthStandardsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Tra Cứu Chiều Cao Cân Nặng Trẻ Em Theo Chuẩn WHO",
    description:
      "Công cụ miễn phí tra cứu chiều cao cân nặng trẻ em từ sơ sinh đến 8 tuổi theo tiêu chuẩn WHO. Biểu đồ tăng trưởng percentile, BMI theo tuổi.",
    url: "https://cuthongminh.com/cong-cu/chieu-cao-can-nang",
    inLanguage: "vi",
    lastReviewed: "2026-06-03",
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "Parent",
    },
    about: {
      "@type": "MedicalCondition",
      name: "Child Growth Assessment",
      alternateName: "Đánh giá tăng trưởng trẻ em",
    },
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://cuthongminh.com" },
      { "@type": "ListItem", position: 2, name: "Công cụ", item: "https://cuthongminh.com/cong-cu" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Chiều cao cân nặng trẻ em",
        item: "https://cuthongminh.com/cong-cu/chieu-cao-can-nang",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-nunito-sans)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />

      <HeaderHomeWithSearch />

      <main className="pt-[72px]">
        <div className="container mx-auto px-6 max-w-4xl py-8 md:py-12">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Công cụ" },
              { label: "Chiều cao cân nặng trẻ em" },
            ]}
          />

          {/* Hero */}
          <div className="text-center mt-8 mb-10">
            <h1 className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-4 tracking-tight">
              Tra Cứu{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Chiều Cao Cân Nặng
              </span>{" "}
              Trẻ Em
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Kiểm tra bé phát triển bình thường không theo{" "}
              <strong className="text-slate-700">chuẩn WHO</strong>. Nhập thông tin bé — xem kết quả ngay lập tức.
              Miễn phí 100%.
            </p>
          </div>

          {/* Calculator */}
          <GrowthCalculator />

          {/* SEO Content Sections */}
          <div className="mt-16 space-y-16">
            {/* WHO Table */}
            <section id="bang-chieu-cao-can-nang">
              <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6">
                Bảng Chiều Cao Cân Nặng Chuẩn WHO Cho Bé 0-8 Tuổi
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Dưới đây là bảng tham chiếu chiều cao và cân nặng theo chuẩn Tổ chức Y tế Thế giới (WHO) cho trẻ em
                từ sơ sinh đến 8 tuổi. Bảng thể hiện 5 mức percentile: 3%, 15%, 50% (trung bình), 85% và 97%.
                Trẻ phát triển bình thường khi nằm trong khoảng percentile 15-85.
              </p>
              <WHOTable />
            </section>

            {/* How to Measure */}
            <section id="cach-do">
              <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6">
                Cách Đo Chiều Cao Cân Nặng Chính Xác Tại Nhà
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">📏 Đo chiều cao</h3>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li className="flex gap-2"><span className="text-orange-500 font-bold">•</span> <strong>Bé dưới 2 tuổi:</strong> Đo chiều dài nằm trên mặt phẳng cứng, dùng thước dây</li>
                    <li className="flex gap-2"><span className="text-orange-500 font-bold">•</span> <strong>Bé từ 2 tuổi:</strong> Đo đứng thẳng, chân trần, lưng áp tường</li>
                    <li className="flex gap-2"><span className="text-orange-500 font-bold">•</span> Mắt nhìn thẳng, hai tay buông tự nhiên</li>
                    <li className="flex gap-2"><span className="text-orange-500 font-bold">•</span> Đo vào buổi sáng (chiều cao cao nhất trong ngày)</li>
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">⚖️ Đo cân nặng</h3>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li className="flex gap-2"><span className="text-orange-500 font-bold">•</span> Cân vào buổi sáng, sau khi đi vệ sinh</li>
                    <li className="flex gap-2"><span className="text-orange-500 font-bold">•</span> Mặc quần áo mỏng hoặc chỉ mặc tã</li>
                    <li className="flex gap-2"><span className="text-orange-500 font-bold">•</span> Dùng cân điện tử có độ chính xác 0.1 kg</li>
                    <li className="flex gap-2"><span className="text-orange-500 font-bold">•</span> Đặt cân trên mặt sàn cứng, bằng phẳng</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* When to see doctor */}
            <section id="khi-nao-can-kham">
              <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6">
                Khi Nào Cần Đưa Bé Đi Khám Bác Sĩ?
              </h2>
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li className="flex gap-2"><span className="text-red-500 font-bold text-lg">⚠️</span> Cân nặng hoặc chiều cao dưới percentile 3 hoặc trên 97</li>
                  <li className="flex gap-2"><span className="text-red-500 font-bold text-lg">⚠️</span> Bé giảm cân liên tục trong 2-3 tháng liên tiếp</li>
                  <li className="flex gap-2"><span className="text-red-500 font-bold text-lg">⚠️</span> Đường tăng trưởng đột ngột đi ngang hoặc đi xuống</li>
                  <li className="flex gap-2"><span className="text-red-500 font-bold text-lg">⚠️</span> BMI vượt percentile 97 (thừa cân béo phì)</li>
                  <li className="flex gap-2"><span className="text-red-500 font-bold text-lg">⚠️</span> Bé ăn kém, biếng ăn kéo dài ảnh hưởng tăng trưởng</li>
                </ul>
                <p className="text-xs text-slate-500 mt-4">
                  Lưu ý: Công cụ này chỉ mang tính tham khảo. Luôn tham vấn bác sĩ nhi khoa để đánh giá toàn diện sức khỏe của bé.
                </p>
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
                      <span className="text-orange-500 shrink-0 transition-transform group-open:rotate-45 text-xl">+</span>
                    </summary>
                    <p className="px-5 pb-5 text-slate-600 leading-relaxed text-sm">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Internal links */}
            <section className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-3xl border border-orange-100 p-8 text-center">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-3">
                🦉 Bé phát triển toàn diện cùng Cú Thông Minh
              </h2>
              <p className="text-slate-500 mb-6 max-w-lg mx-auto">
                Ngoài thể chất, sự phát triển trí tuệ cũng rất quan trọng! Cho bé khám phá 100+ trò chơi giáo dục tương tác.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/games"
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors shadow-md"
                >
                  Khám phá trò chơi giáo dục
                </Link>
                <Link
                  href="/blogs"
                  className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-full border border-slate-200 transition-colors"
                >
                  Đọc blog nuôi dạy con
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
