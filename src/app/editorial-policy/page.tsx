import Link from "next/link";
import type { Metadata } from "next";
import { HeaderHomeWithSearch } from "@/components/layout/HeaderHomeWithSearch";
import { Footer } from "@/components/layout/Footer";
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  BookOpen,
  GraduationCap,
  Users,
  Heart,
  MessageSquare,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { FAQSchema, type FAQItem } from "@/components/common/FAQSchema";
import { SpeakableSchema } from "@/components/common/SpeakableSchema";

const EDITORIAL_FAQ_ITEMS: FAQItem[] = [
  {
    question: "Các bài học và trò chơi được xây dựng dựa trên tiêu chuẩn nào?",
    answer:
      "Tất cả học liệu trên Cú Thông Minh được phát triển bám sát khung năng lực phát triển trẻ em của Bộ Giáo dục và Đào tạo (GD&ĐT) Việt Nam cho lứa tuổi mầm non, đồng thời chắt lọc tinh hoa từ các triết lý giáo dục tiến bộ trên thế giới như Montessori và Play-based Learning.",
  },
  {
    question: "Đội ngũ chuyên gia biên tập của Cú Thông Minh gồm những ai?",
    answer:
      "Đội ngũ của chúng tôi bao gồm các giáo viên mầm non tốt nghiệp các trường Đại học Sư phạm, các thạc sĩ chuyên ngành Giáo dục học, và các kỹ sư công nghệ am hiểu tâm lý trẻ thơ. Chúng tôi cũng tham khảo ý kiến chuyên sâu từ các bác sĩ nhi khoa để bảo đảm tính an toàn cho bé.",
  },
  {
    question: "Làm cách nào để phản hồi nếu tôi phát hiện sai sót trên bài học?",
    answer:
      "Cú Thông Minh luôn cầu thị và trân trọng mọi ý kiến đóng góp từ các bậc phụ huynh. Nếu phát hiện bất kỳ lỗi chính tả, sai lệch toán học hoặc vấn đề kỹ thuật nào, ba mẹ có thể gửi phản hồi nhanh chóng qua trang phản hồi (/feedback) hoặc email hỗ trợ của chúng tôi.",
  },
  {
    question: "Chính sách cập nhật bài học mới được thực hiện như thế nào?",
    answer:
      "Nội dung học tập được kiểm duyệt, cải tiến và cập nhật định kỳ mỗi tuần nhằm đảm bảo sự phong phú và phù hợp với xu thế giáo dục hiện đại. Các bài học cũ cũng thường xuyên được rà soát để đảm bảo độ tương thích công nghệ tốt nhất.",
  },
];

export const metadata: Metadata = {
  title: "Chính Sách Biên Tập & Giáo Dục | Cú Thông Minh",
  description:
    "Tìm hiểu về chính sách biên tập, quy trình thẩm định học liệu nghiêm ngặt bởi giáo viên sư phạm và triết lý Montessori đằng sau mỗi trò chơi của Cú Thông Minh.",
  alternates: {
    canonical: "/editorial-policy",
  },
  openGraph: {
    title: "Chính Sách Biên Tập & Giáo Dục | Cú Thông Minh",
    description:
      "Tìm hiểu về chính sách biên tập, quy trình thẩm định học liệu nghiêm ngặt bởi giáo viên sư phạm và triết lý Montessori đằng sau mỗi trò chơi của Cú Thông Minh.",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Cú Thông Minh - Chính sách biên tập" }],
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-nunito-sans)]">
      <HeaderHomeWithSearch />

      <main className="pt-[72px]">
        {/* Decorative Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-orange-50/50 to-white">
          <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-orange-100/40 rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-50/30 rounded-full blur-3xl translate-y-1/3"></div>

          <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-100 text-orange-600 font-extrabold text-sm mb-6 border border-orange-200/50">
              <Award className="w-4 h-4" />
              <span>Cam kết về chất lượng giáo dục</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold font-[family-name:var(--font-baloo-2)] text-slate-900 leading-tight mb-8 tracking-tight">
              Chính Sách Biên Tập <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                & Tiêu Chuẩn Sư Phạm
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Tại Cú Thông Minh, chúng tôi hiểu rằng mỗi trò chơi, mỗi hình ảnh và âm thanh tác động sâu sắc đến tư duy
              non nớt của trẻ nhỏ. Chính vì thế, chúng tôi thiết lập một quy trình biên tập nghiêm ngặt dựa trên tri thức
              khoa học sư phạm hiện đại.
            </p>
          </div>
        </section>

        {/* Editorial Values Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-baloo-2)]">
                  Chính xác học thuật
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Tất cả các kiến thức về toán học sơ đẳng, nhận biết chữ cái tiếng Việt, màu sắc, động vật, hay khoa học
                  đều được biên soạn chính xác theo đúng ngữ pháp sư phạm mầm non chuẩn quốc gia.
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-baloo-2)]">
                  Môi trường an toàn
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Đảm bảo 100% không chứa quảng cáo hoặc liên kết ngoài có hại. Nội dung trò chơi tuyệt đối thân thiện,
                  không mang tính kích động hoặc gây xao nhãng tinh thần khám phá tự nhiên của trẻ.
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 text-pink-600 group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-baloo-2)]">
                  Tâm lý nhi khoa
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Thiết kế đồ họa ngộ nghĩnh, nhịp điệu tương tác vừa phải kết hợp phản hồi tích cực giúp kích thích ham
                  muốn học tập mà không gây nên hội chứng nghiện màn hình ở trẻ mầm non.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Review Process (Timeline) */}
        <section className="py-24 bg-slate-50 rounded-[3rem] mx-2 lg:mx-8 my-8 relative overflow-hidden border border-slate-100">
          <div className="absolute inset-0 bg-[url('/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay"></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6">
                Quy trình kiểm duyệt 4 bước nghiêm ngặt
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Từng trò chơi và học liệu xuất hiện trên Cú Thông Minh đều phải đi qua hành trình kiểm duyệt khắt khe:
              </p>
            </div>

            <div className="relative border-l-2 border-orange-200 ml-4 md:ml-12 space-y-12">
              {/* Step 1 */}
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-3.5 md:-left-4.5 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-4 border-orange-400 flex items-center justify-center text-orange-500 font-extrabold text-sm md:text-base group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  1
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-baloo-2)]">
                  Phát thảo kịch bản bởi Chuyên gia Sư phạm
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Kịch bản trò chơi giáo dục ban đầu được biên soạn bởi các giáo viên hoặc chuyên gia giáo dục sớm. Nội
                  dung dựa trên lộ trình Montessori và Play-based Learning, thiết kế phù hợp với đặc điểm tâm sinh lý
                  từng cột mốc tuổi (3, 4, 5, và 6-8 tuổi).
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-3.5 md:-left-4.5 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-4 border-orange-400 flex items-center justify-center text-orange-500 font-extrabold text-sm md:text-base group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  2
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-baloo-2)]">
                  Kiểm định sư phạm thực tế (Teacher Sandbox)
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Bản mẫu sơ khởi được cài đặt trong môi trường thử nghiệm khép kín (sandbox). Nhóm giáo viên thực tế sẽ
                  chơi thử nghiệm, đánh giá độ rõ ràng của giọng đọc tiếng Việt, tính logic của các phép toán sơ đẳng và
                  độ dễ tương tác đối với những ngón tay nhỏ của trẻ.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-3.5 md:-left-4.5 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-4 border-orange-400 flex items-center justify-center text-orange-500 font-extrabold text-sm md:text-base group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  3
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-baloo-2)]">
                  Kiểm duyệt an toàn nội dung & Sức khỏe nhi khoa
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Hội đồng kiểm duyệt kỹ thuật rà soát toàn bộ hệ thống để bảo đảm tốc độ phản hồi nhanh, giao diện tối
                  giản giúp trẻ tập trung, không kích động, không có quảng cáo, và bảo mật tuyệt đối 100% dữ liệu định
                  danh cá nhân theo tiêu chuẩn COPPA.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-3.5 md:-left-4.5 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-4 border-orange-400 flex items-center justify-center text-orange-500 font-extrabold text-sm md:text-base group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  4
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-baloo-2)]">
                  Phát hành & Lắng nghe phản hồi từ Phụ Huynh
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Sau khi vượt qua tất cả các bộ lọc kiểm soát, bài học được cập nhật chính thức trên trang web. Chúng
                  tôi liên tục theo dõi hệ thống thu thập góp ý của phụ huynh để nhanh chóng tối ưu hóa, đính chính kịp
                  thời nếu có sai sót.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Correction Policy & Pedagogical Guidelines */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 font-extrabold text-xs rounded-full uppercase tracking-wider">
                  Đính chính & Cầu thị
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 leading-tight">
                  Chính sách đính chính thông tin minh bạch
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Cú Thông Minh nỗ lực cao nhất để mang lại nội dung không tì vết. Tuy nhiên, nếu phát hiện bất kỳ sai
                  sót chính tả, lỗi phát âm vùng miền, hoặc lỗi số học nào, chúng tôi cam kết sẽ sửa đổi trong vòng 48
                  giờ làm việc kể từ lúc xác nhận phản hồi của ba mẹ.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Ý kiến của ba mẹ luôn là động lực to lớn nhất để đội ngũ giáo viên sáng lập của Cú Thông Minh nâng cấp
                  nền tảng ngày một vững chắc.
                </p>
                <Link
                  href="/feedback"
                  className="inline-flex items-center gap-2 text-orange-500 font-bold text-lg hover:text-orange-600 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" /> Gửi phản hồi học liệu ngay
                </Link>
              </div>

              <div className="lg:w-1/2 p-8 md:p-12 rounded-[2.5rem] bg-orange-50/50 border border-orange-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/30 rounded-bl-[100%]"></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 font-[family-name:var(--font-baloo-2)] flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                  Triết lý Montessori & MoET
                </h3>
                <ul className="space-y-4 text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                    <span>Lấy bé làm trung tâm, giáo dục thông qua sự hào hứng khám phá chủ động.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                    <span>Nội dung chia nhỏ theo cấp độ khó tự nhiên, không gây quá tải não bộ.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                    <span>Nhận diện ngôn ngữ & tiếng Việt tự nhiên, chuẩn hóa theo sách giáo khoa lớp 1.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                    <span>Kiến thức toán học sơ cấp liên hệ mật thiết với cuộc sống hàng ngày.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section — AEO */}
        <FAQSchema
          items={EDITORIAL_FAQ_ITEMS}
          title="Giải đáp về chính sách"
          subtitle="Những câu hỏi phổ biến từ phụ huynh về cách chúng tôi kiểm duyệt học liệu"
        />

        {/* CTA section */}
        <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[3rem] mx-2 lg:mx-8 mb-16 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/patterns/stardust.png')] opacity-10"></div>
          <div className="container mx-auto px-6 text-center relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] mb-6">
              Cùng nhau xây dựng nền tảng vững vàng cho trẻ
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
              Sứ mệnh của chúng tôi là phụng sự tương lai tươi sáng của thế hệ mầm non Việt Nam. Hãy bắt đầu cùng chúng
              tôi ngay hôm nay.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/sign-up"
                className="w-full sm:w-auto px-8 py-4 bg-[#FF9C01] hover:bg-orange-500 text-slate-900 font-bold rounded-full text-lg shadow-lg hover:shadow-2xl transition-all"
              >
                Trải nghiệm miễn phí
              </Link>
              <Link
                href="/about-us"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full text-lg transition-all"
              >
                Về câu chuyện sáng lập
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Speakable Schema for AI voice readers */}
      <SpeakableSchema url="https://cuthongminh.com/editorial-policy" cssSelectors={["h1", "section p", "#faq"]} />

      <Footer />
    </div>
  );
}
