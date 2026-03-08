import Image from "next/image";
import Link from "next/link";
import LogoLong from "@/assets/logo-long.webp";

export function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-slate-100 mt-auto">
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8 items-center justify-between font-medium">
        <Image src={LogoLong} alt="Logo" width={256} height={56} />

        <div className="text-slate-500 text-center md:text-left text-sm">
          &copy; {new Date().getFullYear()} Cú Thông Minh. Bản quyền thuộc về Cú Thông Minh Educational.
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-slate-500 text-sm">
          <Link href="/blogs" className="hover:text-[#FF9C01] font-semibold transition-colors block py-2">
            Chia sẻ (Blog)
          </Link>
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
  );
}
