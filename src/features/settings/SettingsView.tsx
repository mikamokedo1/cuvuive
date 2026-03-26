"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { ActionButton } from "@/components/common/ActionButton";
import { ExclamationIcon, PhoneIcon, UserIcon } from "@/components/common/Icons";
import { useUser } from "@/context/UserContext";
import Header from "@/components/layout/Header";
import {
  accountProfileSchema,
  deleteCurrentAccount,
  getAccountProfileInitialValues,
  updateAccountProfile,
} from "@/features/settings/account-profile";

// Re-using the same owl image for settings header
const owlHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";

export function SettingsView() {
  const router = useRouter();
  const { user, isPremium, premiumEndDate } = useUser();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: getAccountProfileInitialValues(user, { includePlayTimerMinutes: true }),
    enableReinitialize: true,
    validationSchema: accountProfileSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setGeneralError(null);
      setSuccessMessage(null);

      const { error } = await updateAccountProfile(values, { includePlayTimerMinutes: true });

      if (error) {
        setGeneralError(error.message);
        setLoading(false);
      } else {
        setSuccessMessage("Cập nhật thông tin thành công!");
        setTimeout(() => {
          router.refresh();
        }, 500);
      }
    },
  });

  const handleDeleteAccount = async () => {
    setLoading(true);
    setGeneralError(null);
    setSuccessMessage(null);

    try {
      await deleteCurrentAccount();
      setSuccessMessage("Tài khoản đã được xóa thành công. Đang chuyển hướng...");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error(error);
      setGeneralError("Đã có lỗi xảy ra khi xóa tài khoản. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-[#F0F7FF] flex flex-col py-6 px-4">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-500 mb-6">Vui lòng đăng nhập để xem cài đặt.</p>
            <Link href="/auth/login">
              <ActionButton variant="glossy" color="orange">
                Đăng nhập ngay
              </ActionButton>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F0F7FF] py-6 px-4 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-lg w-full border-4 border-white/50 animate-scale-in">
          <div className="p-8 flex flex-col justify-center bg-white relative">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <Image
                  src={owlHi}
                  alt="Cú Thông Minh"
                  width={100}
                  height={100}
                  className="drop-shadow-lg object-contain"
                />
              </div>
              <h2 className="text-2xl text-orange-600 font-display mb-2 drop-shadow-sm">Cài Đặt Tài Khoản</h2>
              <p className="text-gray-500 font-medium text-sm">Cập nhật thông tin của bé yêu nhé!</p>
            </div>

            <div className="bg-[#FFF4E5] p-5 rounded-2xl border-2 border-orange-200 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-orange-900 mb-2 uppercase tracking-wide">Loại Tài Khoản</h3>
                {isPremium ? (
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-yellow-600 flex items-center gap-2">🌟 Premium</span>
                    {premiumEndDate && (
                      <span className="text-sm font-medium text-orange-700 mt-1.5">
                        Hiệu lực đến: {new Date(premiumEndDate).toLocaleDateString("vi-VN")}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-700 flex items-center gap-2">
                      🌱 Thường (Miễn phí)
                    </span>
                    <span className="text-sm text-gray-500 mt-1.5">Nâng cấp để mở khóa tất cả bài học!</span>
                  </div>
                )}
              </div>
              {!isPremium && (
                <Link href="/upgrade">
                  <ActionButton
                    variant="glossy"
                    color="orange"
                    className="py-3 px-6 text-sm whitespace-nowrap shadow-md hover:shadow-lg transition-shadow"
                  >
                    Nâng cấp Premium
                  </ActionButton>
                </Link>
              )}
            </div>

            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-1">
                <label htmlFor="kidName" className="block text-sm font-semibold text-gray-700 ml-1">
                  Tên của bé
                </label>
                <div className="relative group">
                  <span
                    className={`absolute left-4 top-3.5 transition-colors ${
                      formik.touched.kidName && formik.errors.kidName
                        ? "text-red-400"
                        : "text-gray-400 group-focus-within:text-purple-500"
                    }`}
                  >
                    <UserIcon className="h-6 w-6" />
                  </span>
                  <input
                    id="kidName"
                    type="text"
                    {...formik.getFieldProps("kidName")}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:ring-4 focus:outline-none transition-all font-medium text-lg placeholder:text-gray-300 ${
                      formik.touched.kidName && formik.errors.kidName
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100 text-red-900"
                        : "border-gray-200 focus:border-purple-400 focus:ring-purple-100 text-gray-700"
                    }`}
                    placeholder="Tên của bé"
                  />
                </div>
                {formik.touched.kidName && formik.errors.kidName && (
                  <div className="text-red-500 text-sm ml-1 font-semibold">{formik.errors.kidName as string}</div>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="parentPhone" className="block text-sm font-semibold text-gray-700 ml-1">
                  Số điện thoại bố mẹ
                </label>
                <div className="relative group">
                  <span
                    className={`absolute left-4 top-3.5 transition-colors ${
                      formik.touched.parentPhone && formik.errors.parentPhone
                        ? "text-red-400"
                        : "text-gray-400 group-focus-within:text-purple-500"
                    }`}
                  >
                    <PhoneIcon className="h-6 w-6" />
                  </span>
                  <input
                    id="parentPhone"
                    type="tel"
                    {...formik.getFieldProps("parentPhone")}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:ring-4 focus:outline-none transition-all font-medium text-lg placeholder:text-gray-300 ${
                      formik.touched.parentPhone && formik.errors.parentPhone
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100 text-red-900"
                        : "border-gray-200 focus:border-purple-400 focus:ring-purple-100 text-gray-700"
                    }`}
                    placeholder="Số điện thoại bố mẹ"
                  />
                </div>
                {formik.touched.parentPhone && formik.errors.parentPhone && (
                  <div className="text-red-500 text-sm ml-1 font-semibold">{formik.errors.parentPhone as string}</div>
                )}
              </div>

              <div className="flex gap-4">
                <div className="space-y-1 w-1/2">
                  <label htmlFor="age" className="block text-sm font-semibold text-gray-700 ml-1">
                    Độ tuổi
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-4 text-gray-400">🎂</span>
                    <select
                      id="age"
                      {...formik.getFieldProps("age")}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all font-medium text-lg text-gray-700 appearance-none bg-white"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 3).map((age) => (
                        <option key={age} value={age}>
                          {age} tuổi
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  {formik.touched.age && formik.errors.age && (
                    <div className="text-red-500 text-sm ml-1 font-semibold">{formik.errors.age as string}</div>
                  )}
                </div>

                <div className="space-y-1 w-1/2">
                  <label htmlFor="sex" className="block text-sm font-semibold text-gray-700 ml-1">
                    Giới tính
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-4 text-gray-400">⚧</span>
                    <select
                      id="sex"
                      {...formik.getFieldProps("sex")}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all font-medium text-lg text-gray-700 appearance-none bg-white"
                    >
                      <option value="male">Bé trai</option>
                      <option value="female">Bé gái</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  {formik.touched.sex && formik.errors.sex && (
                    <div className="text-red-500 text-sm ml-1 font-semibold">{formik.errors.sex as string}</div>
                  )}
                </div>
              </div>

              {/* Play Timer Setting */}
              <div className="space-y-1">
                <label htmlFor="playTimerMinutes" className="block text-sm font-semibold text-gray-700 ml-1">
                  ⏰ Giới hạn thời gian chơi
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-4 text-gray-400">🕐</span>
                  <select
                    id="playTimerMinutes"
                    {...formik.getFieldProps("playTimerMinutes")}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all font-medium text-lg text-gray-700 appearance-none bg-white"
                  >
                    <option value={0}>Tắt</option>
                    <option value={10}>10 phút</option>
                    <option value={15}>15 phút</option>
                    <option value={20}>20 phút</option>
                    <option value={30}>30 phút</option>
                    <option value={45}>45 phút</option>
                    <option value={60}>60 phút</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-400 ml-1">
                  Sau khoảng thời gian này, bé sẽ cần ba mẹ trả lời câu hỏi để chơi tiếp.
                </p>
              </div>

              {generalError && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl flex items-center gap-2 font-medium">
                  <ExclamationIcon className="h-5 w-5" />
                  {generalError}
                </div>
              )}

              {successMessage && (
                <div className="bg-green-50 text-green-600 text-sm p-3 rounded-xl flex items-center gap-2 font-medium">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {successMessage}
                </div>
              )}

              <ActionButton
                type="submit"
                variant="glossy"
                color="blue"
                className="w-full py-4 text-xl uppercase tracking-wider shadow-lg hover:shadow-xl mt-4"
                disabled={loading}
              >
                {loading ? "Đang lưu..." : "Lưu Thay Đổi"}
              </ActionButton>
            </form>
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      "CẢNH BÁO: Hành động này sẽ xóa vĩnh viễn tài khoản và toàn bộ dữ liệu học tập của bé. Bạn có chắc chắn muốn xóa không?",
                    )
                  ) {
                    handleDeleteAccount();
                  }
                }}
                disabled={loading}
                className="text-red-500 hover:text-red-600 font-semibold text-sm underline underline-offset-4 transition-colors p-2"
              >
                Xóa Tài Khoản (Delete Account)
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
