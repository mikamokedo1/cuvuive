import Link from "next/link";
import { ArrowRight, Brain, Sparkles, Trophy, Shield, Heart, Gamepad2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { GROUPS } from "@/libs/constants/groups";
import LogoLong from "@/assets/logo-long.webp";
import LogoShort from "@/assets/logo.png";
import { TestimonialSlider } from "@/components/common/TestimonialSlider";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cú Thông Minh",
    url: "https://cuthongminh.com",
    description:
      "Ứng dụng giáo dục tương tác giúp bé vừa học vừa chơi, phát triển tư duy toán học và ngôn ngữ một cách tự nhiên.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "VND",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-nunito-sans)] overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10 pt-6">
        <Link href="/">
          <Image className="md:block hidden" src={LogoLong} alt="Logo" width={256} height={56} priority />
          <Image className="md:hidden" src={LogoShort} alt="Logo" width={56} height={56} priority />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/games"
            className="px-6 py-2.5 bg-[#FF9C01] hover:bg-orange-500 text-white font-bold rounded-full shadow-[0_4px_14px_0_rgba(255,156,1,0.39)] hover:shadow-[0_6px_20px_rgba(255,156,1,0.23)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Bắt đầu khám phá
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <header className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob transform-gpu will-change-transform"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 transform-gpu will-change-transform"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 transform-gpu will-change-transform"></div>

          <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-100 text-[#FF9C01] font-bold text-sm mb-10 shadow-sm border border-orange-200/50 hover:bg-orange-200 transition-colors cursor-default">
              <Sparkles className="w-4 h-4" />
              <span>Nền tảng học mà chơi số 1 cho bé</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900 leading-[1.1] mb-8 max-w-5xl mx-auto tracking-tight">
              Cùng bé yêu khám phá <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9C01] to-red-400">
                thế giới tri thức vui nhộn
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Hàng trăm trò chơi tương tác lý thú giúp trẻ em từ 3-8 tuổi phát triển tư duy toán học, nhận thức không
              gian và làm quen ngôn ngữ một cách tự nhiên.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                href="/auth/sign-up"
                className="w-full sm:w-auto px-8 py-4 bg-[#FF9C01] hover:bg-orange-500 text-white font-bold rounded-full group flex items-center justify-center gap-3 text-lg shadow-[0_8px_30px_rgb(255,156,1,0.3)] hover:shadow-[0_8px_30px_rgb(255,156,1,0.4)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
              >
                Trải nghiệm ngay
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#games"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-full border border-slate-200 hover:border-orange-300 hover:bg-orange-50 border-b-4 hover:border-b-orange-400 flex items-center justify-center gap-3 text-lg transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Gamepad2 className="w-5 h-5 text-orange-400" />
                Khám phá Kho Game
              </Link>
            </div>
          </div>
        </header>

        {/* Features Showcase */}
        <section
          id="features"
          className="py-24 bg-white relative z-20 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)] rounded-t-[3rem]"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6 tracking-tight">
                Lợi ích khi là <span className="text-[#FF9C01]">Cú Thông Minh</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Ứng dụng được thiết kế kỹ lưỡng dựa trên phương pháp giáo dục sớm, phù hợp với tâm lý trẻ nhỏ.
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
                  Rèn luyện khả năng quan sát, tư duy chiến lược và xử lý vấn đề qua từng thử thách lôi cuốn.
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
                  Hình ảnh sắc nét, âm thanh sống động và nhân vật ngộ nghĩnh truyền cảm hứng học tập mỗi ngày.
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
                  Tuyệt đối không có quảng cáo, hỗ trợ tính năng theo dõi tiến độ dành riêng cho ba mẹ.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Games Preview Section */}
        <section
          id="games"
          className="py-24 relative overflow-hidden bg-slate-900 rounded-[3rem] mx-2 lg:mx-8 my-8 shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
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

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
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
                  <div
                    key={group.id}
                    className={`aspect-square sm:aspect-auto sm:h-64 rounded-3xl bg-gradient-to-br ${bgGradient} p-6 flex flex-col items-center justify-center text-white hover:scale-[1.03] transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-2xl relative overflow-hidden group`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4 transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-md">
                      <Image src={group.icon} alt={group.title} fill className="object-contain" />
                    </div>
                    <span className="font-bold text-xl sm:text-2xl font-[family-name:var(--font-baloo-2)] text-center drop-shadow-md leading-tight mb-2">
                      {group.title}
                    </span>
                  </div>
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

        {/* Testimonial / Social Proof (Slider) */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6 tracking-tight">
                Phụ huynh nói gì về <span className="text-[#FF9C01]">Cú Thông Minh</span>?
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Hàng ngàn gia đình đã tin công ứng dụng để làm bạn đồng hành cùng bé mỗi ngày.
              </p>
            </div>

            <TestimonialSlider />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#FF9C01] to-orange-500">
          <div className="absolute inset-0 bg-[url('/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="container mx-auto px-6 relative z-10 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-extrabold font-[family-name:var(--font-baloo-2)] mb-8 tracking-tight drop-shadow-md">
              Khơi dậy tiềm năng cùng bé
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 font-medium drop-shadow-sm">
              Tham gia cộng đồng phụ huynh tin dùng Cú Thông Minh để mang đến tương lai tươi sáng cho con bạn.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/sign-up"
                className="w-full sm:w-auto px-10 py-5 bg-white text-[#FF9C01] font-bold rounded-full text-lg md:text-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
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
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8 items-center justify-between font-medium">
          <Image src={LogoLong} alt="Logo" width={256} height={56} />

          <div className="text-slate-500 text-center md:text-left text-sm">
            &copy; {new Date().getFullYear()} Cú Thông Minh. Bản quyền thuộc về Cú Thông Minh Educational.
          </div>

          <div className="flex gap-6 text-slate-500 text-sm">
            <Link href="/privacy" className="hover:text-[#FF9C01] font-semibold transition-colors block py-2">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="hover:text-[#FF9C01] font-semibold transition-colors block py-2">
              Điều khoản
            </Link>
            <Link href="/feedback" className="hover:text-[#FF9C01] font-semibold transition-colors block py-2">
              Hỗ trợ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
