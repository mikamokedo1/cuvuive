"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/layout/Header";
import { ActionButton } from "@/components/common/ActionButton";
import { Loader2, CheckCircle2 } from "lucide-react";
const owlHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";
import { useUser } from "@/context/UserContext";

function CheckoutContent() {
  const { refreshSubscription } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [orderInfo, setOrderInfo] = useState<{ amount: number; cartCode: string } | null>(null);
  const [status, setStatus] = useState<"pending" | "paid" | "error">("pending");
  const [loading, setLoading] = useState(true);

  // Bank Info from Prompt
  const BANK_NAME = "VietinBank";
  const ACCOUNT_NUM = "104879547120";

  useEffect(() => {
    if (!orderId) {
      router.push("/upgrade");
      return;
    }

    // Since we don't have a GET /api/orders/[id] yet, just deriving cartCode manually
    // Wait, we need the exact amount to render the QR correctly.
    // Let's create a quick API fetch or just assume the user knows the amount,
    // but the QR requires the exact amount.
    // For now, let's add a quick hack: we know the cart code is CUVUIVE<id>.
    // To make it robust, we should really fetch the amount from the DB.
    // Since we didn't expose GET /api/orders/[id] with full details, let's just make it visually pending until paid.
    // But we need the amount for the QR generator.
    // As a workaround, we can fetch status which could return the amount too. Let's assume we update the GET status API!

    // Actually, I can just write a quick fetch here to `GET /api/orders/[id]/status`
    // Let's modify the GET route slightly to also return the amount and cartCode!

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}/status`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        setStatus(data.status);
        if (data.amount && data.cartCode) {
          setOrderInfo({ amount: data.amount, cartCode: data.cartCode });
        } else {
          // Fallback to construct it
          setOrderInfo({ amount: 0, cartCode: `SEVQR${orderId}` });
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    // Polling interval
    const interval = setInterval(async () => {
      if (status === "paid") return;

      try {
        const res = await fetch(`/api/orders/${orderId}/status`);
        const data = await res.json();
        if (data.status === "paid") {
          setStatus("paid");
          clearInterval(interval);
          fireConfetti();
        }
      } catch (err) {
        // ignore polling errors
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId, router, status]);

  const fireConfetti = async () => {
    const confetti = (await import("canvas-confetti")).default;
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleBack = async () => {
    await refreshSubscription();
    router.push("/games");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sky-100 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-sky-500 mb-4" />
        <p className="text-gray-600 font-nunito font-bold text-lg">Đang tải thông tin thanh toán...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-sky-100 flex flex-col items-center justify-center font-nunito p-4 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Có lỗi xảy ra!</h1>
        <p className="text-gray-600 mb-8">Không thể tìm thấy hóa đơn. Vui lòng thử lại.</p>
        <ActionButton onClick={() => router.push("/upgrade")} variant="glossy" color="blue">
          Quay lại bàng giá
        </ActionButton>
      </div>
    );
  }

  // QR Generate URL
  // We use standard VietQR format via sepay's generator or vietqr.net
  // https://qr.sepay.vn/img?acc={104879547120}&bank={VietinBank}&amount={amount}&des={cartCode}
  const qrUrl =
    orderInfo?.amount && orderInfo.amount > 0
      ? `https://qr.sepay.vn/img?acc=${ACCOUNT_NUM}&bank=${BANK_NAME}&amount=${orderInfo.amount}&des=${orderInfo.cartCode}`
      : `https://qr.sepay.vn/img?acc=${ACCOUNT_NUM}&bank=${BANK_NAME}&des=${orderInfo?.cartCode}`;

  return (
    <div className="min-h-screen bg-sky-100 relative overflow-hidden font-nunito flex flex-col py-6 px-4">
      <Header />

      <div className="relative z-10 container mx-auto px-4 pb-12 flex flex-col items-center mt-8">
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border-4 border-white flex flex-col items-center max-w-2xl w-full">
          {status === "paid" ? (
            <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
              <CheckCircle2 className="w-24 h-24 text-green-500 mb-6 drop-shadow-md" />
              <h1 className="text-4xl font-extrabold text-[#8B4513] mb-4">Thanh toán thành công!</h1>
              <p className="text-lg text-gray-600 mb-8 font-semibold">
                Cảm ơn bạn. Tài khoản Premium đã được kích hoạt. Chúc bé học thật vui!
              </p>
              <ActionButton onClick={handleBack} variant="glossy" color="green" className="px-8 py-3 text-lg">
                Bắt Đầu Học Ngay
              </ActionButton>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center w-full">
              <Image src={owlHi} alt="Owl Header" width={100} height={100} className="mb-4" />
              <h1 className="text-3xl font-extrabold text-[#8B4513] mb-2">Thanh Toán Quét Mã QR</h1>
              <p className="text-gray-500 mb-8 font-medium">
                Mở ứng dụng ngân hàng và quét mã để thanh toán. Hệ thống sẽ tự động xác nhận trong vài giây.
              </p>

              {/* QR Image Container */}
              <div className="bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-gray-300 mb-8">
                <Image
                  src={qrUrl}
                  alt="QR Code"
                  width={300}
                  height={300}
                  className="rounded-xl shadow-sm"
                  unoptimized
                />
              </div>

              {/* Bank Details Fallback */}
              <div className="w-full bg-blue-50/50 p-6 rounded-2xl border border-blue-100 text-left mb-8 flex flex-col gap-2 relative">
                <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                  <span className="text-gray-500 font-semibold">Ngân hàng</span>
                  <span className="font-extrabold text-blue-900">{BANK_NAME}</span>
                </div>
                <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                  <span className="text-gray-500 font-semibold">Số tài khoản</span>
                  <span className="font-extrabold tracking-wider text-blue-900">{ACCOUNT_NUM}</span>
                </div>
                <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                  <span className="text-gray-500 font-semibold">Số tiền</span>
                  <span className="font-extrabold text-red-600 text-lg">
                    {orderInfo?.amount ? `${orderInfo.amount.toLocaleString("vi-VN")} VND` : "---"}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-500 font-semibold">Nội dung chuyển khoản</span>
                  <span className="font-extrabold font-mono bg-white px-3 py-1 rounded shadow-inner text-orange-600 border border-orange-200">
                    {orderInfo?.cartCode}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sky-600 bg-sky-50 px-6 py-3 rounded-full font-bold animate-pulse">
                <Loader2 className="w-5 h-5 animate-spin" />
                Đang chờ thanh toán...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-sky-100 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
