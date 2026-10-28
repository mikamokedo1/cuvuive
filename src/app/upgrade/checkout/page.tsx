"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/layout/Header";
import { ActionButton } from "@/components/common/ActionButton";
import { Loader2, CheckCircle2, Copy, Check, Download } from "lucide-react";
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
  const [copiedField, setCopiedField] = useState<"account" | "amount" | "code" | null>(null);
  const [downloadingQr, setDownloadingQr] = useState(false);

  // Bank Info
  const BANK_NAME = "VietinBank";
  const ACCOUNT_NUM = "104879547120";
  const ACCOUNT_HOLDER = "LE CAO QUY";

  const copyToClipboard = async (value: string, field: "account" | "amount" | "code") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    } catch {
      // ignore clipboard errors
    }
  };

  useEffect(() => {
    if (!orderId) {
      router.push("/upgrade");
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}/status`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        setStatus(data.status);
        if (data.amount && data.cartCode) {
          setOrderInfo({ amount: data.amount, cartCode: data.cartCode });
        } else {
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
      } catch {
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

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
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
          Quay lại bảng giá
        </ActionButton>
      </div>
    );
  }

  const qrUrl =
    orderInfo?.amount && orderInfo.amount > 0
      ? `https://qr.sepay.vn/img?acc=${ACCOUNT_NUM}&bank=${BANK_NAME}&amount=${orderInfo.amount}&des=${orderInfo.cartCode}`
      : `https://qr.sepay.vn/img?acc=${ACCOUNT_NUM}&bank=${BANK_NAME}&des=${orderInfo?.cartCode}`;

  const handleDownloadQr = async () => {
    try {
      setDownloadingQr(true);
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `QR-CuThongMinh-${orderInfo?.cartCode || "thanh-toan"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(qrUrl, "_blank");
    } finally {
      setDownloadingQr(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 relative overflow-hidden font-nunito flex flex-col py-6 px-4">
      <Header />

      <div className="relative z-10 container mx-auto px-2 sm:px-4 pb-12 flex flex-col items-center mt-6">
        <div className="bg-white rounded-[32px] p-5 sm:p-8 md:p-10 shadow-2xl border-4 border-white flex flex-col items-center max-w-2xl w-full">
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
              <Image src={owlHi} alt="Owl Header" width={84} height={84} className="mb-3" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#8B4513] mb-1.5">
                Thanh Toán Quét Mã QR
              </h1>
              <p className="text-gray-500 text-sm sm:text-base mb-5 font-medium max-w-lg">
                Quét mã QR hoặc bấm <strong>Tải ảnh QR</strong> về điện thoại rồi mở App Ngân hàng chọn ảnh để thanh toán tự động trong 5 giây.
              </p>

              {/* QR Image Container + Mobile Download QR Button */}
              <div className="flex flex-col items-center gap-3 bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-gray-300 mb-6">
                <Image
                  src={qrUrl}
                  alt="QR Code"
                  width={260}
                  height={260}
                  className="rounded-xl shadow-sm"
                  unoptimized
                />

                <button
                  type="button"
                  onClick={handleDownloadQr}
                  disabled={downloadingQr}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-sm sm:text-base shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadingQr ? "Đang tải ảnh QR..." : "Tải ảnh mã QR về điện thoại"}</span>
                </button>
              </div>

              {/* Bank Details with 1-Tap Copy Buttons */}
              <div className="w-full bg-blue-50/60 p-3.5 sm:p-6 rounded-2xl border border-blue-100 text-left mb-6 flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-blue-100 pb-2.5 gap-2">
                  <span className="text-gray-500 font-semibold text-xs sm:text-base whitespace-nowrap shrink-0">
                    Ngân hàng
                  </span>
                  <span className="font-extrabold text-blue-900 text-xs sm:text-base text-right">
                    {BANK_NAME} ({ACCOUNT_HOLDER})
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-blue-100 pb-2.5 gap-2">
                  <span className="text-gray-500 font-semibold text-xs sm:text-base whitespace-nowrap shrink-0">
                    Số tài khoản
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="font-extrabold tracking-wider text-blue-900 text-sm sm:text-lg whitespace-nowrap">
                      {ACCOUNT_NUM}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(ACCOUNT_NUM, "account")}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {copiedField === "account" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                          <span className="text-green-600">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 shrink-0" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b border-blue-100 pb-2.5 gap-2">
                  <span className="text-gray-500 font-semibold text-xs sm:text-base whitespace-nowrap shrink-0">
                    Số tiền
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="font-extrabold text-red-600 text-sm sm:text-lg whitespace-nowrap">
                      {orderInfo?.amount ? `${orderInfo.amount.toLocaleString("vi-VN")} VND` : "---"}
                    </span>
                    {orderInfo?.amount ? (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(`${orderInfo.amount}`, "amount")}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {copiedField === "amount" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                            <span className="text-green-600">Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 shrink-0" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 gap-2">
                  <span className="text-gray-500 font-semibold text-xs sm:text-base whitespace-nowrap shrink-0">
                    Nội dung CK
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="font-extrabold font-mono bg-white px-2.5 py-1 rounded-lg shadow-inner text-orange-600 border border-orange-200 text-xs sm:text-base whitespace-nowrap">
                      {orderInfo?.cartCode}
                    </span>
                    {orderInfo?.cartCode ? (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(orderInfo.cartCode, "code")}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs whitespace-nowrap shrink-0"
                      >
                        {copiedField === "code" ? (
                          <>
                            <Check className="w-3.5 h-3.5 shrink-0" />
                            <span>Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 shrink-0" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sky-600 bg-sky-50 px-6 py-3 rounded-full font-bold animate-pulse text-sm sm:text-base">
                <Loader2 className="w-5 h-5 animate-spin" />
                Đang chờ thanh toán (tự động kích hoạt sau 5 giây)...
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
