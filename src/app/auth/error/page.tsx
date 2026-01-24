import { ActionButton } from "@/components/common/ActionButton";
import owlHi from "@/assets/games/common/owl-say-hi.webp";
import { ExclamationIcon } from "@/components/common/Icons";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

async function ErrorContent({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const params = await searchParams;

  return (
    <div className="bg-red-50 rounded-xl p-6 mb-8 border-2 border-red-100 flex items-start gap-4 text-left">
      <div className="flex-shrink-0 mt-1">
        <ExclamationIcon className="w-6 h-6 text-red-500" />
      </div>
      <div>
        <p className="text-red-800 font-bold mb-1">Chi tiết lỗi:</p>
        {params?.error ? (
          <code className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded block break-all">{params.error}</code>
        ) : (
          <p className="text-sm text-red-600">Đã xảy ra lỗi không xác định.</p>
        )}
      </div>
    </div>
  );
}

export default function Page({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4 bg-[url('/bg-pattern.png')]">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full border-4 border-white/50 backdrop-blur-sm">
        {/* Left Side - Illustration */}
        <div className="md:w-1/2 bg-red-100 relative p-8 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/assets/bg.jpg')] bg-cover opacity-10"></div>
          <div className="relative z-10 text-center">
            <Image
              src={owlHi}
              alt="Owl Companion"
              width={280}
              height={280}
              className="drop-shadow-2xl animate-bounce-subtle mx-auto transform hover:scale-105 transition-transform duration-300 grayscale-[0.5]"
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative text-center">
          <div className="mb-6">
            <h1 className="text-4xl text-red-600 font-display mb-4 drop-shadow-sm">Rất Tiếc!</h1>
            <p className="text-gray-500 font-medium text-lg">Có chút trục trặc đã xảy ra 😔</p>
          </div>

          <Suspense fallback={<div className="h-24 bg-gray-100 rounded-xl animate-pulse mb-8" />}>
            <ErrorContent searchParams={searchParams} />
          </Suspense>

          <div className="flex flex-col gap-3">
            <Link href="/auth/login" className="w-full block">
              <ActionButton
                variant="glossy"
                color="orange"
                className="w-full py-4 text-xl uppercase tracking-wider shadow-lg hover:shadow-xl"
              >
                Quay Lại Đăng Nhập
              </ActionButton>
            </Link>

            <Link href="/" className="text-gray-400 font-medium hover:text-gray-600 transition-colors">
              Trở về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
