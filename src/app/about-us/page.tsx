import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HeaderHome } from "@/components/layout/HeaderHome";
import { Footer } from "@/components/layout/Footer";
import { Brain, Heart, BookOpenText, Users, Gamepad2, Rocket, ShieldCheck, MessageSquareHeart } from "lucide-react";
const LogoLong = "https://assets.cuthongminh.com/assets/logo.webp";
import { FAQSchema, type FAQItem } from "@/components/common/FAQSchema";
import { SpeakableSchema } from "@/components/common/SpeakableSchema";

const ABOUT_FAQ_ITEMS: FAQItem[] = [
  {
    question: "Ai đứng sau Cú Thông Minh?",
    answer:
      "Cú Thông Minh được phát triển bởi đội ngũ gồm các giáo viên tâm huyết, các chuyên gia giáo dục sớm và kỹ sư công nghệ, đặt sứ mệnh biến công nghệ thành công cụ giáo dục tích cực cho trẻ nhỏ.",
  },
  {
    question: "Nội dung trên Cú Thông Minh được kiểm duyệt như thế nào?",
    answer:
      "Tất cả bài học và trò chơi đều được thiết kế bởi đội ngũ giáo viên, sau đó được xem xét về tính phù hợp với lứa tuổi, độ chính xác kiến thức và tính sư phạm trước khi được đưa lên nền tảng.",
  },
  {
    question: "Cú Thông Minh có thu thập dữ liệu cá nhân của bé không?",
    answer:
      "Không. Cú Thông Minh cam kết bảo vệ quyền riêng tư của trẻ em. Chúng tôi không thu thập dữ liệu cá nhân của bé, không có quảng cáo và không chia sẻ dữ liệu với bên thứ ba.",
  },
  {
    question: "Làm sao để phụ huynh theo dõi tiến độ của bé?",
    answer:
      "Phụ huynh có thể xem tiến độ học tập, số bài học đã hoàn thành và thời gian sử dụng của bé ngay trên ứng dụng. Hệ thống cũng hỗ trợ tính năng giới hạn thời gian chơi để ba mẹ kiểm soát.",
  },
];

export const metadata: Metadata = {
  title: "Về Chúng Tôi | Cú Thông Minh - Hành trình khơi nguồn tri thức",
  description:
    "Khám phá câu chuyện đằng sau Cú Thông Minh - Nơi những người thầy, bậc phụ huynh và trẻ nhỏ cùng nhau tạo nên thế giới học tập đầy màu sắc và an toàn.",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "Về Chúng Tôi | Cú Thông Minh",
    description:
      "Khám phá câu chuyện đằng sau Cú Thông Minh - Nơi những người thầy, bậc phụ huynh và trẻ nhỏ cùng nhau tạo nên thế giới học tập đầy màu sắc và an toàn.",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Cú Thông Minh - Về chúng tôi" }],
  },
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-nunito-sans)]">
      <HeaderHome />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-orange-50 to-white">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6 border border-orange-200">
                  <BookOpenText className="w-4 h-4" />
                  <span>Câu chuyện của chúng tôi</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900 leading-tight mb-8">
                  Hành trình biến màn hình thành <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                    nguồn tri thức vô tận
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Giữa thế giới kỹ thuật số đầy rẫy những cám dỗ, Cú Thông Minh ra đời với một sứ mệnh duy nhất: Biến
                  những giây phút trải nghiệm công nghệ của trẻ em trở nên có ý nghĩa, bổ ích và đầy cảm hứng.
                </p>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="relative aspect-square max-w-[500px] mx-auto group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-red-400 rounded-[3rem] rotate-3 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 group-hover:scale-[1.02]">
                    <Image
                      src="/images/about-hero.webp"
                      alt="Cú Thông Minh Team - Teachers, Parents and Kids"
                      width={500}
                      height={500}
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-12 mb-20 animate-on-scroll">
                <div className="md:w-1/2">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 text-red-500">
                    <Gamepad2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6">
                    Thực trạng đáng báo động
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    Ngày nay, trẻ em dành quá nhiều thời gian cho các thiết bị điện tử. Nhưng thay vì học hỏi, các em
                    thường bị cuốn vào vòng xoáy của các video giải trí vô bổ và mạng xã hội đầy cạm bẫy.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Phụ huynh dù luôn muốn điều tốt nhất cho con, nhưng guồng quay bận rộn của công việc và cuộc sống
                    khiến việc kiểm soát nội dung số trở thành một thách thức vô cùng lớn.
                  </p>
                </div>
                <div className="md:w-1/2 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative">
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 shadow-sm animate-bounce">
                    <Rocket className="w-10 h-10" />
                  </div>
                  <blockquote className="text-xl italic font-medium text-slate-700 leading-relaxed">
                    &quot;Chúng tôi tin rằng công nghệ không phải là kẻ thù của giáo dục, nếu chúng ta biết cách khai
                    thác nó để tạo ra những giá trị tích cực.&quot;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                    <div>
                      <p className="font-bold text-slate-900">Đội ngũ sáng lập</p>
                      <p className="text-sm text-slate-500">Cú Thông Minh</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why the name "Cú Thông Minh"? */}
        <section className="py-24 bg-orange-50/50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="relative aspect-square w-full max-w-[400px] mx-auto bg-white rounded-[3rem] shadow-xl p-12 flex items-center justify-center overflow-hidden border border-orange-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-transparent"></div>
                  <div className="relative transform hover:scale-110 transition-transform duration-500">
                    <Image
                      src={LogoLong}
                      alt="Cú Thông Minh Logo"
                      width={200}
                      height={200}
                      className="w-48 h-48 drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2">
                <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-8 leading-tight">
                  Tại sao lại là <br className="hidden md:block" />
                  <span className="text-orange-500">Cú Thông Minh?</span>
                </h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>
                    Trong nhiều nền văn hóa, <span className="font-bold text-slate-800 italic">Con Cú</span> luôn là
                    biểu tượng của sự thông thái, kiên nhẫn và đôi mắt nhìn thấu đêm đen. Đối với trẻ nhỏ, trí tò mò
                    chính là &quot;đôi mắt&quot; đó.
                  </p>
                  <p>
                    Cái tên <span className="font-bold text-orange-600">&quot;Cú Thông Minh&quot;</span> mang theo ba
                    lời hứa của chúng tôi dành cho trẻ em:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-orange-400 shrink-0"></div>
                      <p>
                        <span className="font-bold text-slate-800">Tầm nhìn sáng suốt:</span> Giúp trẻ biết cách chọn
                        lọc và tiếp cận tri thức một cách thông minh giữa biển thông tin vô tận.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-orange-400 shrink-0"></div>
                      <p>
                        <span className="font-bold text-slate-800">Đồng hành kiên nhẫn:</span> Như loài cú âm thầm lặng
                        lẽ, chúng tôi đồng hành cùng bé trong từng bước tiến nhỏ nhất.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-orange-400 shrink-0"></div>
                      <p>
                        <span className="font-bold text-slate-800">Cảm hứng học tập:</span> Hình ảnh chú Cú thân thiện
                        sẽ là &quot;người bạn đồng hành&quot; khơi gợi niềm vui trong mỗi bài học.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-24 bg-slate-900 text-white rounded-[3rem] mx-4 lg:mx-8 mb-24 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/patterns/stardust.png')] opacity-10"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] mb-16">
              Sức mạnh của sự cộng tác
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/15 transition-all">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 mx-auto text-blue-400">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-baloo-2)] mb-4">Các Nhà Giáo</h3>
                <p className="text-slate-300 leading-relaxed">
                  Mọi bài học, mọi trò chơi đều được thiết kế bởi đội ngũ cộng tác viên là những giáo viên tâm huyết, am
                  hiểu tâm lý giáo dục sớm.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/15 transition-all md:-translate-y-8">
                <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-8 mx-auto text-orange-400">
                  <MessageSquareHeart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-baloo-2)] mb-4">Các Phụ Huynh</h3>
                <p className="text-slate-300 leading-relaxed">
                  Chúng tôi lắng nghe từng góp ý của ba mẹ để hoàn thiện trải nghiệm, đảm bảo tính ứng dụng và độ an
                  toàn tuyệt đối cho bé.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/15 transition-all">
                <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-8 mx-auto text-pink-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-baloo-2)] mb-4">Các Bé Yêu</h3>
                <p className="text-slate-300 leading-relaxed">
                  Phản hồi từ nụ cười và sự hào hứng của trẻ là thước đo chính xác nhất cho thành công của từng bài học
                  trên Cú Thông Minh.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Details */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 bg-orange-50 rounded-[2rem] border border-orange-100 hover:shadow-lg transition-all group">
                    <Brain className="w-10 h-10 text-orange-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Tư duy logic</h4>
                    <p className="text-slate-600 text-sm">Phát triển khả năng giải quyết vấn đề tự nhiên.</p>
                  </div>
                  <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100 hover:shadow-lg transition-all group mt-8">
                    <ShieldCheck className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">An toàn 100%</h4>
                    <p className="text-slate-600 text-sm">Không quảng cáo, không nội dung độc hại.</p>
                  </div>
                  <div className="p-8 bg-pink-50 rounded-[2rem] border border-pink-100 hover:shadow-lg transition-all group">
                    <Users className="w-10 h-10 text-pink-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Cánh tay đắc lực</h4>
                    <p className="text-slate-600 text-sm">Hỗ trợ ba mẹ theo dõi tiến độ của con.</p>
                  </div>
                  <div className="p-8 bg-green-50 rounded-[2rem] border border-green-100 hover:shadow-lg transition-all group mt-8">
                    <Rocket className="w-10 h-10 text-green-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Cập nhật liên tục</h4>
                    <p className="text-slate-600 text-sm">Nội dung bài học đổi mới mỗi tuần.</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-8">
                  Hơn cả một ứng dụng, <br />
                  đó là tâm huyết vì trẻ em.
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Cú Thông Minh không đặt nặng áp lực điểm số. Chúng tôi tập trung vào việc khơi dậy sự tò mò và ham học
                  hỏi bản năng của mỗi đứa trẻ.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  Để mỗi khi bé chạm vào màn hình, đó là một lần bé được khám phá thế giới xung quanh, học cách đếm số,
                  nhận biết hình khối, hay lắng nghe những câu chuyện về thiên nhiên đầy thú vị.
                </p>
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center justify-center px-10 py-5 bg-[#FF9C01] hover:bg-orange-500 text-slate-900 font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  Đồng hành cùng chúng tôi ngay
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section — AEO */}
        <FAQSchema
          items={ABOUT_FAQ_ITEMS}
          title="Câu hỏi về chúng tôi"
          subtitle="Những điều phụ huynh thường hỏi về Cú Thông Minh"
        />

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-orange-50">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto bg-white p-12 lg:p-20 rounded-[4rem] shadow-2xl border border-orange-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6 relative z-10">
                Cùng nhau, chúng ta xây dựng tương lai tươi sáng
              </h2>
              <p className="text-lg text-slate-600 mb-10 relative z-10 font-medium">
                Cảm ơn bạn đã tin tưởng và đồng hành cùng Cú Thông Minh trong hành trình ý nghĩa này. Tương lai của
                những mầm non đất nước bắt đầu từ sự quan tâm của bạn hôm nay.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all text-lg"
                >
                  Quay về trang chủ
                </Link>
                <Link
                  href="/games"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-orange-500 font-bold rounded-full border-2 border-orange-200 hover:border-orange-500 transition-all text-lg"
                >
                  Khám phá bài học
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Speakable Schema for AI voice reading */}
      <SpeakableSchema url="https://cuthongminh.com/about-us" cssSelectors={["h1", "section > div > div > p", "#faq"]} />

      <Footer />
    </div>
  );
}
