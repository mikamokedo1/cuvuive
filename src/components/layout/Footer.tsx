import Image from "next/image";
import Link from "next/link";
const LogoLong = "https://assets.cuthongminh.com/assets/logo-long.webp";
import { Facebook, Video, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white py-16 border-t border-slate-100 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start justify-between mb-12">
          <div className="flex flex-col gap-6 max-w-xs text-center md:text-left">
            <Image src={LogoLong} alt="Cú Thông Minh - Trang chủ" width={220} height={48} className="mx-auto md:mx-0" />
            <p className="text-slate-500 text-sm leading-relaxed">
              Nền tảng học mà chơi số 1 cho bé, giúp con phát triển tư duy toàn diện qua những bài học sáng tạo.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 w-full md:w-auto">
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-slate-900 mb-2">Khám phá</h3>
              <Link href="/about-us" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                Giới thiệu về Cú Thông Minh
              </Link>
              <Link href="/blogs" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                Blog giáo dục mầm non
              </Link>
              <Link href="/games" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                Kho trò chơi giáo dục
              </Link>
              <Link
                href="/upgrade"
                className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors font-medium"
              >
                Nâng cấp Premium
              </Link>
              <Link
                href="/gioi-thieu-kiem-tien"
                className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors"
              >
                Giới thiệu bạn bè — Nhận hoa hồng
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-slate-900 mb-2">Theo độ tuổi</h3>
              <Link href="/do-tuoi/3-tuoi" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                Trò chơi cho bé 3 tuổi
              </Link>
              <Link href="/do-tuoi/4-tuoi" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                Trò chơi cho bé 4 tuổi
              </Link>
              <Link href="/do-tuoi/5-tuoi" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                Bé 5 tuổi chuẩn bị vào lớp 1
              </Link>
              <Link href="/do-tuoi/6-8-tuoi" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                Trò chơi trí tuệ cho bé 6-8 tuổi
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-slate-900 mb-2">Môn học</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <Link href="/tro-choi-tu-duy" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                  Trò chơi tư duy logic
                </Link>
                <Link href="/tro-choi-my-thuat" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                  Bé học mỹ thuật sáng tạo
                </Link>
                <Link href="/ky-nang-song" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                  Kỹ năng sống cho bé
                </Link>
                <Link href="/dia-ly-tu-nhien" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                  Khám phá địa lý tự nhiên
                </Link>
                <Link href="/am-nhac" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                  Bé làm quen âm nhạc
                </Link>
                <Link href="/khoa-hoc" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                  Khoa học vui cho trẻ
                </Link>
                <Link href="/hoc-tieng-viet-cho-be" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                  Học tiếng Việt cho bé
                </Link>
                <Link href="/tro-choi-toan-hoc" className="text-slate-500 hover:text-[#FF9C01] transition-colors">
                  Toán học qua trò chơi
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-slate-900 mb-2">Hỗ trợ</h3>
              <Link href="/feedback" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                Gửi góp ý cho Cú Thông Minh
              </Link>
              <Link href="/editorial-policy" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                Chính sách biên tập & Giáo dục
              </Link>
              <Link href="/privacy" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="/terms" className="text-slate-500 hover:text-[#FF9C01] text-sm transition-colors">
                Điều khoản sử dụng
              </Link>
            </div>

            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <h3 className="font-bold text-slate-900 mb-2">Kết nối</h3>
              <div className="flex gap-4">
                <Link
                  href="https://www.facebook.com/CuthongminhOffical"
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                  aria-label="Facebook"
                >
                  <span className="sr-only">Facebook Cú Thông Minh</span>
                  <Facebook size={20} />
                </Link>
                <Link
                  href="https://www.tiktok.com/@cuthongminh"
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                  aria-label="TikTok"
                >
                  <span className="sr-only">TikTok Cú Thông Minh</span>
                  <Video size={20} />
                </Link>
                <Link
                  href="https://www.youtube.com/@cuthongminh-r1k"
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                  aria-label="YouTube"
                >
                  <span className="sr-only">YouTube Cú Thông Minh</span>
                  <Youtube size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-medium">
          <p>&copy; {new Date().getFullYear()} Cú Thông Minh Educational. All rights reserved.</p>
          <p>Mỗi bài học là một nụ cười cho con.</p>
        </div>
      </div>
    </footer>
  );
}
