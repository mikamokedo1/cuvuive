import Image from "next/image";
import { getPlans } from "@/libs/actions/plans";
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
const SeedImg = "https://assets.cuthongminh.com/assets/upgrade/seed.webp";
const BuffImg = "https://assets.cuthongminh.com/assets/upgrade/buff.webp";
const LeafImg = "https://assets.cuthongminh.com/assets/upgrade/leaf.webp";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nâng Cấp Tài Khoản Nền Tảng Học Tập | Cú Thông Minh",
  description:
    "Bảng giá và danh sách các gói nâng cấp tài khoản thành viên VIP trên Cú Thông Minh. Chọn gói phù hợp giúp bé truy cập kho học liệu đồ sộ.",
  alternates: {
    canonical: "https://cuthongminh.com/upgrade",
  },
  openGraph: {
    title: "Nâng Cấp Tài Khoản | Cú Thông Minh",
    description:
      "Nâng cấp tài khoản Cú Thông Minh để mở khóa toàn bộ bài học, trò chơi giáo dục và tính năng theo dõi tiến độ cho bé.",
    url: "https://cuthongminh.com/upgrade",
    type: "website",
  },
};

// Define a type for the Plan structure from DB
interface Plan {
  id: string;
  name: string;
  code: string;
  price: number;
  durationMonths: number;
  description: string | null;
}

// Helper to calculate discount
function calculateDiscount(basePrice: number, currentPrice: number, months: number): number | null {
  if (months <= 1) return null;
  const monthlyPrice = currentPrice / months;
  const discount = Math.round(((basePrice - monthlyPrice) / basePrice) * 100);
  return discount > 0 ? discount : null;
}

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
    question: "Hết hạn Premium thì sao?",
    answer:
      "Khi hết hạn, tài khoản sẽ trở về chế độ miễn phí. Bé vẫn giữ toàn bộ tiến độ và có thể chơi lại các bài học miễn phí. Bạn có thể gia hạn bất cứ lúc nào để tiếp tục truy cập đầy đủ.",
  },
];

// ============================================
// COMPONENT
// ============================================

export default async function UpgradePage() {
  let plans: Plan[] = [];
  try {
    plans = await getPlans();
  } catch (error) {
    console.error("Failed to fetch plans:", error);
  }

  // Find base price (price of 1 month plan) for discount calculation
  const basePlan = plans.find((p) => p.durationMonths === 1);
  const baseMonthlyPrice = basePlan ? basePlan.price : 0;

  return (
    <>
      <div className="min-h-screen bg-sky-100 relative overflow-hidden font-nunito flex flex-col">
        {/* Background Clouds/Decoration */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-10 left-10 w-32 h-20 bg-white rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-48 h-24 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-1/3 w-60 h-32 bg-white rounded-full blur-2xl"></div>
        </div>

        {/* JSON-LD Schema */}
        {plans.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                plans.map((pkg) => {
                  const imageMap: Record<string, string> = {
                    seed: "https://assets.cuthongminh.com/assets/upgrade/seed.webp",
                    bud: "https://assets.cuthongminh.com/assets/upgrade/buff.webp",
                    leaf: "https://assets.cuthongminh.com/assets/upgrade/leaf.webp",
                  };
                  return {
                    "@context": "https://schema.org",
                    "@type": "Product",
                    name: `Gói Nâng Cấp ${pkg.name} - Cú Thông Minh`,
                    description:
                      pkg.description ||
                      `Thẻ thành viên gói ${pkg.name} thời hạn ${pkg.durationMonths === 12 ? "1 năm" : pkg.durationMonths + " tháng"} trên hệ thống Cú Thông Minh.`,
                    image: imageMap[pkg.code] || "https://assets.cuthongminh.com/games/common/owl-say-hi.webp",
                    offers: {
                      "@type": "Offer",
                      price: pkg.price,
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
                  };
                }),
              ),
            }}
          />
        )}

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
          {/* SECTION 3: PRICING CARDS                     */}
          {/* ============================================ */}
          <section className="w-full max-w-5xl mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#8B4513] mb-8">
              Chọn gói phù hợp cho bé
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {plans.map((pkg) => {
                // Map code to visual assets
                let icon = SeedImg;
                let color = "green";

                if (pkg.code === "bud") {
                  icon = BuffImg;
                  color = "blue";
                } else if (pkg.code === "leaf") {
                  icon = LeafImg;
                  color = "yellow";
                }

                const discount = calculateDiscount(baseMonthlyPrice, pkg.price, pkg.durationMonths);
                const isBestValue = pkg.code === "leaf";

                // Define styles based on color theme
                const colorStylesMap: Record<
                  string,
                  {
                    bg: string;
                    border: string;
                    title: string;
                    btn: "green" | "blue" | "orange";
                    glow: string;
                    darkBorder: string;
                  }
                > = {
                  green: {
                    bg: "bg-gradient-to-b from-[#E8F5E9] to-[#C8E6C9]",
                    border: "border-[#4CAF50]",
                    title: "text-[#2E7D32]",
                    btn: "green",
                    glow: "shadow-[0_0_30px_rgba(76,175,80,0.3)]",
                    darkBorder: "border-[#388E3C]",
                  },
                  blue: {
                    bg: "bg-gradient-to-b from-[#E3F2FD] to-[#BBDEFB]",
                    border: "border-[#2196F3]",
                    title: "text-[#1565C0]",
                    btn: "blue",
                    glow: "shadow-[0_0_30px_rgba(33,150,243,0.3)]",
                    darkBorder: "border-[#1976D2]",
                  },
                  yellow: {
                    bg: "bg-gradient-to-b from-[#FFFDE7] to-[#FFF9C4]",
                    border: "border-[#FFC107]",
                    title: "text-[#F57F17]",
                    btn: "orange",
                    glow: "shadow-[0_0_30px_rgba(255,193,7,0.3)]",
                    darkBorder: "border-[#FFA000]",
                  },
                };
                const colorStyles = colorStylesMap[color] || colorStylesMap.green;

                return (
                  <div
                    key={pkg.id}
                    className={`
                    relative flex flex-col items-center p-6 rounded-[32px] border-4 
                    ${colorStyles.bg} ${colorStyles.border} 
                    hover:-translate-y-2 transition-transform duration-300
                    shadow-xl ${colorStyles.glow}
                  `}
                  >
                    {/* Best value tag */}
                    {isBestValue && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black px-5 py-1.5 rounded-full shadow-lg z-10 text-sm border-2 border-white whitespace-nowrap">
                        ⭐ Tiết kiệm nhất
                      </div>
                    )}

                    {color === "yellow" && (
                      <>
                        <div className="absolute top-4 right-4 text-yellow-400 text-xl animate-pulse">✨</div>
                        <div className="absolute top-10 left-4 text-yellow-400 text-lg animate-pulse delay-75">✨</div>
                      </>
                    )}

                    {discount && !isBestValue && (
                      <div className="absolute -top-4 -right-2 bg-red-500 text-white font-black px-3 py-1 rounded-full shadow-md z-10 transform rotate-6 border-2 border-white animate-bounce-subtle">
                        -{discount}%
                      </div>
                    )}

                    {/* Title */}
                    <h3 className={`text-3xl font-extrabold mb-2 ${colorStyles.title} ${isBestValue ? "mt-2" : ""}`}>
                      {pkg.name}
                    </h3>

                    {/* Description */}
                    {pkg.description && (
                      <p className="text-center text-gray-600 font-semibold text-sm mb-4 px-2 min-h-[40px]">
                        {pkg.description}
                      </p>
                    )}

                    <div className="w-32 h-32 mb-6 flex items-center justify-center drop-shadow-md">
                      <Image src={icon} alt={pkg.name} width={128} height={128} />
                    </div>

                    {/* Pricing Info */}
                    <div className="w-full bg-white/60 rounded-xl p-3 mb-4 text-center backdrop-blur-sm">
                      <span className="text-gray-500 font-bold block text-sm mb-1">
                        {pkg.durationMonths === 12 ? "1 năm" : `${pkg.durationMonths} tháng`}
                      </span>
                      <div className="flex items-center justify-center gap-1">
                        <span
                          className={`text-2xl font-black ${colorStyles.title.replace("text-", "text-opacity-80 ")}`}
                        >
                          {(pkg.price / 1000).toLocaleString("vi-VN")}
                        </span>
                        <span className="text-gray-600 font-bold text-sm">nghìn VND</span>
                      </div>

                      <span className="text-xs text-green-600 font-bold mt-1 block">
                        {discount ? `Tiết kiệm ${discount}% so với gói tháng` : "Chỉ với 2k mỗi ngày"}
                      </span>
                    </div>

                    {/* Action Button */}
                    <UpgradeActionButton
                      planCode={pkg.code}
                      priceFormatted={pkg.price.toLocaleString("vi-VN")}
                      colorDef={colorStyles.btn}
                    />
                  </div>
                );
              })}
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
