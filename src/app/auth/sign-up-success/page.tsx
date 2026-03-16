import { ActionButton } from "@/components/common/ActionButton";
const owlHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4 bg-[url('/bg-pattern.png')]">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full border-4 border-white/50 backdrop-blur-sm">
        {/* Left Side - Illustration */}
        <div className="md:w-1/2 bg-green-100 relative p-8 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/assets/bg.jpg')] bg-cover opacity-10"></div>
          <div className="relative z-10 text-center">
            <Image
              src={owlHi}
              alt="Owl Companion"
              width={280}
              height={280}
              className="drop-shadow-2xl animate-bounce-subtle mx-auto transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative text-center">
          <div className="mb-8">
            <h1 className="text-4xl text-green-600 font-display mb-4 drop-shadow-sm">Đăng Ký Thành Công!</h1>
            <p className="text-gray-500 font-medium text-lg">Chúc mừng bé đã gia nhập Cú Thông Minh🎉</p>
          </div>

          {/* <div className="bg-green-50 rounded-xl p-6 mb-8 border-2 border-green-100">
            <p className="text-gray-700 mb-2">Chúng tôi đã gửi email xác nhận đến hộp thư của bạn.</p>
            <p className="text-gray-600 text-sm">Vui lòng kiểm tra email và bấm vào liên kết để kích hoạt tài khoản.</p>
          </div> */}

          <Link href="/auth/login" className="w-full block">
            <ActionButton
              variant="glossy"
              color="green"
              className="w-full py-4 text-xl uppercase tracking-wider shadow-lg hover:shadow-xl"
            >
              Đăng Nhập Ngay
            </ActionButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
