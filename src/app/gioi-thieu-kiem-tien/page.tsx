import Image from "next/image";
import Link from "next/link";
import { ActionButton } from "@/components/common/ActionButton";
import { HeaderHome } from "@/components/layout/HeaderHome";
import { Share2, Users, Gift, Wallet, ArrowRight, CheckCircle2, Shield, Clock, HelpCircle } from "lucide-react";
import { FAQAccordionItem } from "@/components/common/FAQSchema";
import { Footer } from "@/components/layout/Footer";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";

const faqs = [
  {
    question: "Ai có thể tham gia chương trình giới thiệu?",
    answer: "Bất kỳ ai có tài khoản Premium trên Cú Thông Minh đều có thể tạo link giới thiệu và bắt đầu kiếm tiền."
  },
  {
    question: "Tôi nhận hoa hồng khi nào?",
    answer: "Hoa hồng được ghi nhận ngay khi người bạn giới thiệu thanh toán thành công gói Premium đầu tiên. Bạn có thể xem số tiền trên dashboard."
  },
  {
    question: "Hoa hồng được tính trên đơn hàng nào?",
    answer: "Bạn nhận 10% trên đơn hàng Premium đầu tiên của mỗi người bạn giới thiệu. Ví dụ: bạn bè mua gói 299,000 ₫, bạn nhận 29,900 ₫."
  },
  {
    question: "Tôi cần bao nhiêu để rút tiền?",
    answer: "Bạn cần tích lũy tối thiểu 100,000 ₫ (100 nghìn VND) trong số dư hoa hồng để yêu cầu rút tiền."
  },
  {
    question: "Rút tiền bao lâu thì nhận được?",
    answer: "Sau khi gửi yêu cầu rút tiền, đội ngũ Cú Thông Minh sẽ xử lý và chuyển khoản trong vòng 1-3 ngày làm việc."
  },
  {
    question: "Có giới hạn số người tôi giới thiệu không?",
    answer: "Không! Bạn có thể giới thiệu bao nhiêu người cũng được, không giới hạn số lượng hay tổng hoa hồng."
  },
  {
    question: "Người bạn bè có nhận được gì không?",
    answer: "Người được giới thiệu sẽ trải nghiệm nền tảng học tập tuyệt vời trên Cú Thông Minh. Hiện tại chưa có ưu đãi đặc biệt cho người được giới thiệu."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const owlHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";

/* ============================================
   Main Page
   ============================================ */
export default function ReferralIntroPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-sky-50 relative overflow-hidden">
        {/* Background Decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-24 bg-white/50 rounded-full blur-2xl" />
        <div className="absolute top-40 right-10 w-56 h-28 bg-emerald-100/40 rounded-full blur-2xl" />
        <div className="absolute bottom-40 left-1/4 w-64 h-32 bg-teal-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-48 h-24 bg-sky-100/40 rounded-full blur-2xl" />
      </div>

      <HeaderHome />

      <div className="relative z-10">
        {/* ===== HERO SECTION ===== */}
        <section className="container mx-auto px-4 pt-16 pb-12 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Owl Mascot */}
            <div className="mb-6 inline-block">
              <Image
                src={owlHi}
                alt="Cú Thông Minh Mascot"
                width={140}
                height={140}
                className="drop-shadow-lg animate-bounce-subtle mx-auto"
                priority
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-4 font-[family-name:var(--font-baloo-2)] leading-tight">
              Kiếm tiền cùng{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
                Cú Thông Minh
              </span>
            </h1>

            <p className="text-gray-500 font-medium text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
              Giới thiệu bạn bè và nhận ngay <span className="text-emerald-600 font-extrabold text-2xl">10%</span> hoa
              hồng trên đơn hàng đầu tiên của họ!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/earn">
                <ActionButton variant="glossy" color="green" className="px-10 py-4 text-lg">
                  <Gift className="w-5 h-5 mr-2" />
                  Tham gia ngay
                  <ArrowRight className="w-5 h-5 ml-2" />
                </ActionButton>
              </Link>
              <Link href="/upgrade">
                <ActionButton variant="glossy" color="orange" className="px-8 py-4 text-base">
                  Nâng cấp Premium
                </ActionButton>
              </Link>
            </div>

            <p className="text-xs text-gray-400 mt-4 font-medium">Yêu cầu tài khoản Premium để tạo link giới thiệu</p>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-[family-name:var(--font-baloo-2)] mb-3">
              Cách thức hoạt động
            </h2>
            <p className="text-gray-500 font-medium max-w-md mx-auto">Chỉ cần 3 bước đơn giản để bắt đầu kiếm tiền</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100 hover:-translate-y-2 transition-transform duration-300 text-center relative group">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                1
              </div>
              <div className="mt-4 mb-4">
                <Image
                  src="/images/referral/share-link.png"
                  alt="Chia sẻ link giới thiệu"
                  width={180}
                  height={180}
                  className="mx-auto drop-shadow-md"
                />
              </div>
              <h3 className="text-xl font-extrabold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5 text-emerald-500" />
                Chia sẻ link
              </h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Đăng nhập vào trang <span className="text-emerald-600 font-bold">Kiếm tiền</span>, copy link giới thiệu
                cá nhân và gửi cho bạn bè qua Zalo, Facebook, hoặc bất kỳ kênh nào.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100 hover:-translate-y-2 transition-transform duration-300 text-center relative group">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                2
              </div>
              <div className="mt-4 mb-4">
                <Image
                  src="/images/referral/friend-signup.png"
                  alt="Bạn bè đăng ký tài khoản"
                  width={180}
                  height={180}
                  className="mx-auto drop-shadow-md"
                />
              </div>
              <h3 className="text-xl font-extrabold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Bạn bè đăng ký
              </h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Bạn bè nhấp vào link, tạo tài khoản trên Cú Thông Minh. Hệ thống tự động ghi nhận bạn là người giới
                thiệu.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-100 hover:-translate-y-2 transition-transform duration-300 text-center relative group">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                3
              </div>
              <div className="mt-4 mb-4">
                <Image
                  src="/images/referral/earn-money.png"
                  alt="Nhận hoa hồng"
                  width={180}
                  height={180}
                  className="mx-auto drop-shadow-md"
                />
              </div>
              <h3 className="text-xl font-extrabold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <Gift className="w-5 h-5 text-amber-500" />
                Nhận hoa hồng
              </h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Khi bạn bè nâng cấp Premium, bạn nhận ngay{" "}
                <span className="text-emerald-600 font-bold">10% giá trị đơn hàng</span>. Số tiền được cộng vào tài
                khoản tự động.
              </p>
            </div>
          </div>
        </section>

        {/* ===== COMMISSION EXAMPLE ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 md:p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white font-[family-name:var(--font-baloo-2)]">
                💰 Ví dụ tính hoa hồng
              </h2>
              <p className="text-emerald-100 font-medium mt-1">
                Bạn nhận 10% trên đơn hàng đầu tiên của người được giới thiệu
              </p>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Example 1 */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-100">
                  <p className="text-sm font-bold text-gray-400 mb-1">Gói Lớp Mầm (1 tháng)</p>
                  <p className="text-lg font-bold text-gray-600 mb-3">
                    Đơn hàng: <span className="text-gray-800">49,000 ₫</span>
                  </p>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-xs text-gray-400 font-bold mb-1">BẠN NHẬN</p>
                    <p className="text-3xl font-extrabold text-emerald-600">4,900 ₫</p>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-100">
                  <p className="text-sm font-bold text-gray-400 mb-1">Gói Lớp Chồi (6 tháng)</p>
                  <p className="text-lg font-bold text-gray-600 mb-3">
                    Đơn hàng: <span className="text-gray-800">199,000 ₫</span>
                  </p>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-xs text-gray-400 font-bold mb-1">BẠN NHẬN</p>
                    <p className="text-3xl font-extrabold text-blue-600">19,900 ₫</p>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 text-center border border-amber-100 relative">
                  <div className="absolute -top-3 right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                    HOT
                  </div>
                  <p className="text-sm font-bold text-gray-400 mb-1">Gói Lớp Lá (12 tháng)</p>
                  <p className="text-lg font-bold text-gray-600 mb-3">
                    Đơn hàng: <span className="text-gray-800">299,000 ₫</span>
                  </p>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-xs text-gray-400 font-bold mb-1">BẠN NHẬN</p>
                    <p className="text-3xl font-extrabold text-amber-600">29,900 ₫</p>
                  </div>
                </div>
              </div>

              {/* Scaling example */}
              <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                <h3 className="font-extrabold text-gray-800 text-lg mb-4 text-center">
                  📊 Giới thiệu càng nhiều, kiếm càng nhiều
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-extrabold text-emerald-600">5</p>
                    <p className="text-xs text-gray-400 font-bold">bạn bè</p>
                    <p className="text-sm font-bold text-gray-600 mt-1">~100K - 150K ₫</p>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-emerald-600">10</p>
                    <p className="text-xs text-gray-400 font-bold">bạn bè</p>
                    <p className="text-sm font-bold text-gray-600 mt-1">~200K - 300K ₫</p>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-emerald-600">50</p>
                    <p className="text-xs text-gray-400 font-bold">bạn bè</p>
                    <p className="text-sm font-bold text-gray-600 mt-1">~1M - 1.5M ₫</p>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-amber-600">100</p>
                    <p className="text-xs text-gray-400 font-bold">bạn bè</p>
                    <p className="text-sm font-bold text-gray-600 mt-1">~2M - 3M ₫</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BENEFITS ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-[family-name:var(--font-baloo-2)] mb-3">
              Tại sao nên tham gia?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mb-4">
                <Wallet className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="font-extrabold text-gray-800 mb-2">Thu nhập thụ động</h3>
              <p className="text-gray-500 font-medium text-sm">
                Chỉ cần chia sẻ một lần, nhận tiền mỗi khi bạn bè mua gói Premium.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-extrabold text-gray-800 mb-2">Rút tiền nhanh</h3>
              <p className="text-gray-500 font-medium text-sm">
                Khi đạt đủ 100,000 ₫, bạn có thể yêu cầu rút tiền qua chuyển khoản ngân hàng.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-extrabold text-gray-800 mb-2">Minh bạch 100%</h3>
              <p className="text-gray-500 font-medium text-sm">
                Theo dõi số người giới thiệu, trạng thái, hoa hồng và lịch sử rút tiền ngay trên dashboard.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-extrabold text-gray-800 mb-2">Không giới hạn</h3>
              <p className="text-gray-500 font-medium text-sm">
                Giới thiệu bao nhiêu bạn bè cũng được — không giới hạn số lượng hay số tiền kiếm được.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WITHDRAWAL INFO ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 font-[family-name:var(--font-baloo-2)] mb-6 text-center">
              🏦 Cách rút tiền
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-emerald-600 font-extrabold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Tích lũy đủ 100,000 ₫</h3>
                  <p className="text-gray-500 text-sm font-medium">
                    Số dư khả dụng của bạn phải đạt ít nhất 100,000 ₫ từ hoa hồng giới thiệu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-blue-600 font-extrabold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Nhập thông tin ngân hàng</h3>
                  <p className="text-gray-500 text-sm font-medium">
                    Nhấn &quot;Rút tiền&quot; trên dashboard, điền tên ngân hàng, số tài khoản và tên chủ tài khoản.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-amber-600 font-extrabold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Nhận tiền trong 1-3 ngày làm việc</h3>
                  <p className="text-gray-500 text-sm font-medium">
                    Đội ngũ Cú Thông Minh sẽ xử lý yêu cầu và chuyển khoản đến tài khoản ngân hàng của bạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-[family-name:var(--font-baloo-2)] mb-3 flex items-center justify-center gap-2">
                <HelpCircle className="w-8 h-8 text-emerald-500" />
                Câu hỏi thường gặp
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 flex flex-col gap-4">
              {faqs.map((item, index) => (
                <FAQAccordionItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="container mx-auto px-4 py-16 pb-20">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl shadow-2xl p-10 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white font-[family-name:var(--font-baloo-2)] mb-3">
                Bắt đầu kiếm tiền ngay! 🚀
              </h2>
              <p className="text-emerald-100 font-medium mb-8 max-w-md mx-auto">
                Tạo link giới thiệu, chia sẻ cho bạn bè và nhận hoa hồng không giới hạn.
              </p>

              <Link href="/earn">
                <ActionButton variant="glossy" color="orange" className="px-12 py-4 text-lg shadow-xl">
                  <Gift className="w-5 h-5 mr-2" />
                  Đi tới trang Kiếm tiền
                  <ArrowRight className="w-5 h-5 ml-2" />
                </ActionButton>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
    </>
  );
}
