import Link from "next/link";
import Image from "next/image";
import OwlSleep from "@/assets/games/owl-sleep.webp";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-violet-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Lost owl */}
        <div className="relative w-24 h-24 md:w-48 md:h-48 mx-auto">
          <Image src={OwlSleep} alt="not-found" fill className="animate-bounce-subtle object-contain" priority />
        </div>

        <h1 className="text-4xl font-display font-bold text-purple-600 mb-3">404</h1>

        <p className="text-2xl font-display font-bold text-purple-500 mb-2">Ở đây không có gì cả!</p>

        <p className="text-lg text-gray-600 mb-8 font-sans">Trang này không tồn tại. Hãy quay về nhà nhé!</p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xl font-bold text-white
                     bg-gradient-to-b from-purple-400 to-purple-600
                     shadow-[0_6px_0_#6b21a8,0_10px_20px_rgba(0,0,0,0.25)]
                     hover:-translate-y-0.5 hover:brightness-105
                     active:translate-y-1 active:brightness-95
                     transition-all duration-150"
        >
          🏠 Về trang chủ
        </Link>
      </div>
    </div>
  );
}
