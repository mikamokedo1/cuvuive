import Image from "next/image";
import Link from "next/link";

// Assets
import LogoLong from "@/assets/logo-long.png";
import avatarBoy from "@/assets/avatar-boy.png";
const Header = () => {
  return (
    <header className="w-full flex justify-between items-center relative mb-8 bg-[#F8EEDD] backdrop-blur-sm rounded-3xl shadow-xl px-6 border-4 border-white relative">
      <Link href="/">
        <Image
          src={LogoLong}
          alt="Thong Minh"
          className="cursor-pointer h-16 md:h-20 w-auto object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
        />
      </Link>
      {/* Avatar on the right */}
      <div className="absolute -right-2 translate-x-1/4 -translate-y-1/4 md:translate-x-0 md:translate-y-0">
        <div className="relative">
          <Image
            src={avatarBoy}
            alt="Avatar"
            className="w-20 md:w-30 rounded-full border-4 border-white shadow-md bg-blue-200"
          />
          <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white">
            1
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
