import Link from "next/link";
import Image from "next/image";
import LogoLong from "@/assets/logo-long.webp";
import LogoShort from "@/assets/logo.png";

export const HeaderHome = () => {
  return (
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10 pt-6">
      <Link href="/">
        <Image className="md:block hidden" src={LogoLong} alt="Logo" width={256} height={56} priority />
        <Image className="md:hidden" src={LogoShort} alt="Logo" width={56} height={56} priority />
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="/games"
          className="px-6 py-3 bg-[#FF9C01] hover:bg-orange-500 text-slate-900 font-bold rounded-full shadow-[0_4px_14px_0_rgba(255,156,1,0.39)] hover:shadow-[0_6px_20px_rgba(255,156,1,0.23)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          Bắt đầu khám phá
        </Link>
      </div>
    </nav>
  );
};
