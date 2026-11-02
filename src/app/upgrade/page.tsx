import Image from "next/image";
import { PREMIUM_LIST_PRICE, PREMIUM_PLAN_CODE, PREMIUM_PRICE } from "@/libs/constants/pricing";
import Header from "@/components/layout/Header";
import { UpgradeActionButton } from "./_components/UpgradeActionButton";
import { Footer } from "@/components/layout/Footer";
import {
  Crown,
  CheckCircle2,
  XCircle,
  Shield,
  Smartphone,
  Users,
  RefreshCw,
  Star,
  ChevronDown,
  Sparkles,
  BookOpen,
  BarChart3,
  MessageCircle,
  Trophy,
  Palette,
} from "lucide-react";

const owlHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";
const PremiumImg = "https://assets.cuthongminh.com/assets/upgrade/leaf.webp";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nâng Cấp Tài Khoản Nền Tảng Học Tập | Cú Thông Minh",
  description:
    "Nâng cấp Premium trọn đời trên Cú Thông Minh: trả một lần, mở khóa toàn bộ kho học liệu cho bé.",
  alternates: {
    canonical: "https://cuthongminh.com/upgrade",
  },
  openGraph: {
    title: "Nâng Cấp Tài Khoản | Cú Thông Minh",
    description:
      "Nâng cấp Premium trọn đời để mở khóa toàn bộ bài học, trò chơi giáo dục và tính năng theo dõi tiến độ cho bé.",
    url: "https://cuthongminh.com/upgrade",
    type: "website",
  },
};

// ============================================
// DATA
// ============================================

const COMPARISON_FEATURES = [
  { label: "Số trò chơi truy cập", free: "Giới hạn", premium: "Toàn bộ 48+ game", icon: Sparkles },
  { label: "Bài học mỗi trò chơi", free: "Nhóm đầu tiên", premium: "Tất cả bài học", icon: BookOpen },
  { label: "Theo dõi tiến độ học tập", free: "Cơ bản", premium: "Biểu đồ chi tiết + Radar kỹ năng", icon: BarChart3 },
  { label: "AI Cú nói chuyện với bé", free: false, premium: true, icon: MessageCircle },
  { label: "Bảng xếp hạng", free: false, premium: true, icon: Trophy },
  { label: "Lộ trình Tiền Lớp 1", free: false, premium: true, icon: Crown },
  { label: "Trò chơi sáng tạo (Vẽ, Piano)", free: false, premium: true, icon: Palette },
  { label: "Không quảng cáo", free: true, premium: true, icon: Shield },
];

const TESTIMONIALS = [
  {
    text: "Nhờ có Cú Thông Minh, hai bé nhà mình hào hứng học toán hơn hẳn. Mỗi tối đều nhắc mẹ cho chơi 'trò con cú'. Hình ảnh đẹp, dễ thương lắm!",
    author: "Mẹ Thúy Hạnh",
    role: "Phụ huynh bé 4 & 6 tuổi",
  },
  {
    text: "Mình rất yên tâm khi bé chơi trên Cú Thông Minh vì không có quảng cáo độc hại. Bé nhận mặt chữ rất nhanh nhờ học bằng hình ảnh trực quan.",
    author: "Bố Hoàng Nam",
    role: "Phụ huynh bé 5 tuổi",
  },
  {
    text: "Các trò chơi tìm điểm khác biệt giúp con rèn luyện sự tập trung rất tốt. Giao diện thân thiện và màu sắc tươi sáng phù hợp cho trẻ nhỏ.",
    author: "Cô Mai Anh",
    role: "Giáo viên mầm non",
  },
];

const FAQ_ITEMS = [
  {
    question: "Premium khác gì tài khoản miễn phí?",
    answer:
      "Tài khoản miễn phí cho phép bé trải nghiệm một số bài học đầu tiên của mỗi trò chơi. Khi nâng cấp Premium, bé sẽ được mở khóa toàn bộ 48+ trò chơi, tất cả bài học, cùng các tính năng đặc biệt như AI Cú nói chuyện, biểu đồ theo dõi tiến độ chi tiết, bảng xếp hạng và lộ trình Tiền Lớp 1.",
  },
  {
    question: "Thanh toán bằng hình thức nào?",
    answer:
      "Cú Thông Minh hỗ trợ thanh toán qua chuyển khoản ngân hàng (tất cả ngân hàng nội địa). Đơn hàng sẽ được xác nhận tự động trong vài phút sau khi chuyển khoản thành công.",
  },
  {
    question: "Có thể dùng trên bao nhiêu thiết bị?",
    answer:
      "Không giới hạn! Cú Thông Minh là ứng dụng web, bạn chỉ cần đăng nhập tài khoản trên bất kỳ thiết bị nào có trình duyệt — điện thoại, máy tính bảng hay máy tính đều được.",
  },
  {
    question: "Nâng cấp Premium có mất dữ liệu học tập không?",
    answer:
      "Không! Toàn bộ tiến độ học tập, điểm số và huy hiệu của bé sẽ được giữ nguyên. Bé sẽ tiếp tục từ nơi đã dừng lại và có thêm quyền truy cập vào nội dung mới.",
  },
  {
    question: "Premium có phải gia hạn không?",
    answer: "Không. Bạn chỉ trả một lần và dùng trọn đời, không cần gia hạn.",
  },
];

// ============================================
// COMPONENT
// ============================================

export default function UpgradePage() {
  return (
    <>
      <div className="min-h-screen bg-sky-100 relative overflow-hidden font-nunito flex flex-col">
        {/* Background Clouds/Decoration */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-10 left-10 w-32 h-20 bg-white rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-48 h-24 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-1/3 w-60 h-32 bg-white rounded-full blur-2xl"></div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Premium Trọn Đời - Cú Thông Minh",
              description: "Trả một lần, dùng trọn đời trên Cú Thông Minh.",
              image: PremiumImg,
              offers: {
                "@type": "Offer",
                price: PREMIUM_PRICE,
                priceCurrency: "VND",
                availability: "https://schema.org/InStock",
                url: "https://cuthongminh.com/upgrade",
                priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                  .toISOString()
                  .split("T")[0],
                shippingDetails: {
                  "@type": "OfferShippingDetails",
                  shippingRate: {
                    "@type": "MonetaryAmount",
                    value: "0",
                    currency: "VND",
                  },
                  shippingDestination: {
                    "@type": "DefinedRegion",
                    addressCountry: "VN",
                  },
                  deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: {
                      "@type": "QuantitativeValue",
                      minValue: "0",
                      maxValue: "0",
                      unitCode: "d",
                    },
                    transitTime: {
                      "@type": "QuantitativeValue",
                      minValue: "0",
                      maxValue: "0",
                      unitCode: "d",
                    },
                  },
                },
                hasMerchantReturnPolicy: {
                  "@type": "MerchantReturnPolicy",
                  applicableCountry: "VN",
                  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                  merchantReturnDays: "7",
                  returnMethod: "https://schema.org/ReturnByMail",
                  returnFees: "https://schema.org/FreeReturn",
                  returnPolicySeasonalOverride: [],
                },
              },
              brand: {
                "@type": "Brand",
                name: "Cú Thông Minh",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "156",
                bestRating: "5",
                worstRating: "1",
              },
              review: {
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5",
                },
                author: {
                  "@type": "Person",
                  name: "Phụ huynh bé Minh",
                },
                reviewBody:
                  "Bé nhà mình rất thích học trên Cú Thông Minh, đặc biệt là các trò chơi toán học. Giao diện dễ sử dụng và nội dung phong phú.",
                datePublished: "2025-03-15",
              },
            }),
          }}
        />

        <Header />

        <div className="relative z-10 container mx-auto px-4 pb-12 flex flex-col items-center">
          {/* ============================================ */}
          {/* SECTION 1: HERO VALUE PROPOSITION            */}
          {/* ============================================ */}
          <section className="flex flex-col items-center mb-12 text-center mt-12 max-w-3xl">
            <div className="relative mb-6">
              <Image
                src={owlHi}
                alt="Owl Mascot"
                width={120}
                height={120}
                className="drop-shadow-lg animate-bounce-custom"
              />
              <div className="absolute -top-4 -right-2 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#8B4513] drop-shadow-sm mb-4 leading-tight">
              Mở Khóa Toàn Bộ
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Kho Bài Học Cho Bé
              </span>
            </h1>
          </section>

          {/* ============================================ */}
          {/* SECTION 3: PRICING                           */}
          {/* ============================================ */}
          <section className="w-full max-w-md mb-16">
            <div className="relative flex flex-col items-center p-6 rounded-[32px] border-4 bg-gradient-to-b from-[#FFFDE7] to-[#FFF9C4] border-[#FFC107] shadow-xl shadow-[0_0_30px_rgba(255,193,7,0.3)]">
              <h2 className="text-3xl font-extrabold mb-2 text-[#F57F17]">Premium Trọn Đời</h2>

              <div className="w-32 h-32 mb-6 flex items-center justify-center drop-shadow-md">
                <Image src={PremiumImg} alt="Premium Trọn Đời" width={128} height={128} />
              </div>

              <div className="w-full bg-white/60 rounded-xl p-3 mb-4 text-center backdrop-blur-sm">
                <s className="text-gray-500 font-bold block text-lg">{PREMIUM_LIST_PRICE.toLocaleString("vi-VN")}đ</s>
                <span className="text-4xl font-black text-[#F57F17]">{PREMIUM_PRICE.toLocaleString("vi-VN")}đ</span>
              </div>

              <UpgradeActionButton
                planCode={PREMIUM_PLAN_CODE}
                priceFormatted={PREMIUM_PRICE.toLocaleString("vi-VN")}
                colorDef="orange"
              />
            </div>
          </section>

          {/* ============================================ */}
          {/* SECTION 4: TESTIMONIALS                      */}
          {/* ============================================ */}
          <section className="w-full max-w-5xl mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#8B4513] mb-8">
              Phụ huynh nói gì về <span className="text-orange-500">Cú Thông Minh</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-slate-600 font-medium leading-relaxed mb-5 text-sm md:text-base italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="border-t border-slate-100 pt-4">
                    <p className="font-extrabold text-slate-800">{t.author}</p>
                    <p className="text-orange-500 font-semibold text-sm">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================ */}
          {/* SECTION 5: TRUST BADGES                      */}
          {/* ============================================ */}
          <section className="w-full max-w-3xl mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Shield, label: "An toàn, không QC", color: "text-green-500", bg: "bg-green-50" },
                { icon: RefreshCw, label: "Hỗ trợ đổi trả", color: "text-blue-500", bg: "bg-blue-50" },
                { icon: Smartphone, label: "Mọi thiết bị", color: "text-purple-500", bg: "bg-purple-50" },
                { icon: Users, label: "1,000+ phụ huynh", color: "text-orange-500", bg: "bg-orange-50" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${badge.bg} border border-white shadow-sm`}
                >
                  <badge.icon className={`w-7 h-7 ${badge.color}`} />
                  <span className="text-sm font-bold text-slate-600 text-center">{badge.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================ */}
          {/* SECTION 6: FAQ                               */}
          {/* ============================================ */}
          <section className="w-full max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#8B4513] mb-8">Câu hỏi thường gặp</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <summary className="flex items-center justify-between gap-3 p-5 cursor-pointer list-none font-bold text-slate-700 text-base md:text-lg select-none [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="font-[family-name:var(--font-be-vietnam-pro)] px-5 pb-5 text-slate-400 leading-relaxed text-sm md:text-base border-t border-slate-50 pt-4">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
