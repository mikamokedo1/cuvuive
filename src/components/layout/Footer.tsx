import Image from "next/image";
import Link from "next/link";
const LogoLong = "https://assets.cuthongminh.com/assets/logo-long.webp";
import { Facebook, Video, Youtube, Mail, Phone, ShieldCheck, Ban, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white py-16 border-t border-slate-100 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start justify-between mb-12">
          <div className="flex flex-col gap-6 max-w-xs text-center md:text-left">
            <div className="flex flex-col gap-4">
              <Image
                src={LogoLong}
                alt="Cú Thông Minh - Trang chủ"
                width={220}
                height={48}
                className="mx-auto md:mx-0"
              />
              <p className="text-slate-500 text-sm leading-relaxed">
                Nền tảng học mà chơi số 1 cho bé, giúp con phát triển tư duy toàn diện qua những bài học sáng tạo.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="font-bold text-slate-900 mb-1">Kết nối</div>
              <div className="flex gap-4 mb-2 justify-center md:justify-start">
                <Link
                  href="https://www.facebook.com/CuthongminhOffical"
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#FF9C01] hover:text-white transition-all shadow-sm"
                  aria-label="Facebook"
                >
                  <span className="sr-only">Facebook Cú Thông Minh</span>
                  <Facebook size={20} />
                </Link>
                <Link
                  href="https://www.tiktok.com/@cuthongminh"
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#FF9C01] hover:text-white transition-all shadow-sm"
                  aria-label="TikTok"
                >
                  <span className="sr-only">TikTok Cú Thông Minh</span>
                  <Video size={20} />
                </Link>
                <Link
                  href="https://www.youtube.com/@cuthongminh-r1k"
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#FF9C01] hover:text-white transition-all shadow-sm"
                  aria-label="YouTube"
                >
                  <span className="sr-only">YouTube Cú Thông Minh</span>
                  <Youtube size={20} />
                </Link>
              </div>

              {/* Contact Info — E-E-A-T */}
              <div className="flex flex-col gap-3 items-center md:items-start">
                <a
                  href="mailto:support@cuthongminh.com"
                  className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-[#FF9C01] transition-colors"
                >
                  <Mail size={16} className="text-[#FF9C01] shrink-0" />
                  support@cuthongminh.com
                </a>
                <a
                  href="tel:+84888222293"
                  className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-[#FF9C01] transition-colors"
                >
                  <Phone size={16} className="text-[#FF9C01] shrink-0" />
                  0888 222 293
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 w-full md:w-auto">
            <nav aria-label="Khám phá">
              <div className="font-bold text-slate-900 mb-2">Khám phá</div>
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                <li>
                  <Link href="/about-us" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                    Giới thiệu về Cú Thông Minh
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                    Blog giáo dục mầm non
                  </Link>
                </li>
                <li>
                  <Link href="/games" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                    Kho trò chơi giáo dục
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                    🏆 Bảng xếp hạng
                  </Link>
                </li>
                <li>
                  <Link
                    href="/upgrade"
                    className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors font-medium"
                  >
                    Nâng cấp Premium
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gioi-thieu-kiem-tien"
                    className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors"
                  >
                    Giới thiệu bạn bè — Nhận hoa hồng
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Công cụ">
              <Link
                href="/cong-cu"
                className="font-bold text-slate-900 mb-2 block hover:text-[#FF9C01] transition-colors"
              >
                Công cụ
              </Link>
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                <li>
                  <Link
                    href="/cong-cu/chieu-cao-can-nang"
                    className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors"
                  >
                    Tra cứu chiều cao cân nặng trẻ em
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cong-cu/ten-tieng-anh-cho-be"
                    className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors"
                  >
                    Tìm tên tiếng Anh cho bé
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Theo độ tuổi">
              <div className="font-bold text-slate-900 mb-2">Theo độ tuổi</div>
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                <li className="pt-2 border-t border-slate-100">
                  <Link
                    href="/lo-trinh/be-kham-pha"
                    className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors"
                  >
                    Lộ trình Bé Khám Phá (3–4 tuổi)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lo-trinh/tien-lop-1"
                    className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors"
                  >
                    Lộ trình Tiền Lớp 1 (5–6 tuổi)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lo-trinh/tieu-hoc-vui"
                    className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors"
                  >
                    Lộ trình Tiểu Học Vui (7–12 tuổi)
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Môn học">
              <div className="font-bold text-slate-900 mb-2">Môn học</div>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm list-none p-0 m-0">
                <li>
                  <Link href="/tro-choi-tu-duy" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                    Trò chơi tư duy logic
                  </Link>
                </li>
                <li>
                  <Link href="/tro-choi-my-thuat" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                    Bé học mỹ thuật sáng tạo
                  </Link>
                </li>
                <li>
                  <Link href="/ky-nang-song" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                    Kỹ năng sống cho bé
                  </Link>
                </li>
                <li>
                  <Link href="/dia-ly-tu-nhien" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                    Khám phá địa lý tự nhiên
                  </Link>
                </li>
                <li>
                  <Link href="/am-nhac" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                    Bé làm quen âm nhạc
                  </Link>
                </li>
                <li>
                  <Link href="/khoa-hoc" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                    Khoa học vui cho trẻ
                  </Link>
                </li>
                <li>
                  <Link href="/hoc-tieng-viet-cho-be" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                    Học tiếng Việt cho bé
                  </Link>
                </li>
                <li>
                  <Link href="/tro-choi-toan-hoc" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                    Toán học qua trò chơi
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Hỗ trợ">
              <div className="font-bold text-slate-900 mb-2">Hỗ trợ</div>
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                <li>
                  <Link href="/feedback" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                    Gửi góp ý cho Cú Thông Minh
                  </Link>
                </li>
                <li>
                  <Link
                    href="/editorial-policy"
                    className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors"
                  >
                    Chính sách biên tập & Giáo dục
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                    Điều khoản sử dụng
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Trust Badges Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-6 mb-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <ShieldCheck className="w-4.5 h-4.5 text-green-500" />
            <span>An toàn cho bé</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Ban className="w-4.5 h-4.5 text-blue-500" />
            <span>Không quảng cáo</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Lock className="w-4.5 h-4.5 text-purple-500" />
            <span>Bảo mật thông tin</span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-medium">
          <p>&copy; {new Date().getFullYear()} Cú Thông Minh Educational. All rights reserved.</p>
          <p>Mỗi bài học là một nụ cười cho con.</p>
        </div>
      </div>
    </footer>
  );
}
