"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ActionButton } from "@/components/common/ActionButton";
import { ExclamationIcon, UserIcon } from "@/components/common/Icons";
import { useUser } from "@/context/UserContext";
import Header from "@/components/layout/Header";
import { submitFeedbackAction } from "@/libs/actions/feedback";

// Re-using the same owl image for feedback header
const owlHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";

export function FeedbackView() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      email: user?.email ?? "",
      phone: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Vui lòng nhập tiêu đề"),
      description: Yup.string().required("Vui lòng nhập nội dung góp ý"),
      email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
      phone: Yup.string().nullable(),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setGeneralError(null);
      setSuccessMessage(null);

      const result = await submitFeedbackAction({
        title: values.title,
        description: values.description,
        email: values.email,
        phone: values.phone || undefined,
      });

      if (!result.success) {
        setGeneralError(result.error || "Có lỗi xảy ra, vui lòng thử lại sau.");
      } else {
        setSuccessMessage("Cảm ơn bạn đã góp ý! Lời nhắn của bạn đã được gửi thành công.");
        resetForm({
          values: {
            title: "",
            description: "",
            email: user?.email ?? "",
            phone: "",
          },
        });
      }
      setLoading(false);
    },
  });

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
              <h2 className="text-2xl text-purple-600 font-display mb-2 drop-shadow-sm">Góp Ý & Phản Hồi</h2>
              <p className="text-gray-500 font-medium text-sm">Hãy chia sẻ ý kiến của bạn để giúp chúng tôi tốt hơn!</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-1">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 ml-1">
                  Tiêu đề *
                </label>
                <div className="relative group">
                  <span
                    className={`absolute left-4 top-3.5 transition-colors ${
                      formik.touched.title && formik.errors.title
                        ? "text-red-400"
                        : "text-gray-400 group-focus-within:text-purple-500"
                    }`}
                  >
                    📝
                  </span>
                  <input
                    id="title"
                    type="text"
                    {...formik.getFieldProps("title")}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:ring-4 focus:outline-none transition-all font-medium text-lg placeholder:text-gray-300 ${
                      formik.touched.title && formik.errors.title
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100 text-red-900"
                        : "border-gray-200 focus:border-purple-400 focus:ring-purple-100 text-gray-700"
                    }`}
                    placeholder="Ví dụ: Lỗi tải trang, Đề xuất tính năng..."
                  />
                </div>
                {formik.touched.title && formik.errors.title && (
                  <div className="text-red-500 text-sm ml-1 font-semibold">{formik.errors.title as string}</div>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 ml-1">
                  Nội dung chi tiết *
                </label>
                <div className="relative group">
                  <textarea
                    id="description"
                    rows={4}
                    {...formik.getFieldProps("description")}
                    className={`w-full p-4 rounded-xl border-2 focus:ring-4 focus:outline-none transition-all font-medium text-lg placeholder:text-gray-300 ${
                      formik.touched.description && formik.errors.description
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100 text-red-900"
                        : "border-gray-200 focus:border-purple-400 focus:ring-purple-100 text-gray-700"
                    }`}
                    placeholder="Vui lòng mô tả chi tiết phản hồi của bạn..."
                  />
                </div>
                {formik.touched.description && formik.errors.description && (
                  <div className="text-red-500 text-sm ml-1 font-semibold">{formik.errors.description as string}</div>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 ml-1">
                  Email liên hệ *
                </label>
                <div className="relative group">
                  <span
                    className={`absolute left-4 top-3.5 transition-colors ${
                      formik.touched.email && formik.errors.email
                        ? "text-red-400"
                        : "text-gray-400 group-focus-within:text-purple-500"
                    }`}
                  >
                    ✉️
                  </span>
                  <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:ring-4 focus:outline-none transition-all font-medium text-lg placeholder:text-gray-300 ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100 text-red-900"
                        : "border-gray-200 focus:border-purple-400 focus:ring-purple-100 text-gray-700"
                    }`}
                    placeholder="email@example.com"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm ml-1 font-semibold">{formik.errors.email as string}</div>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 ml-1">
                  Số điện thoại (Không bắt buộc)
                </label>
                <div className="relative group">
                  <span
                    className={`absolute left-4 top-3.5 transition-colors ${
                      formik.touched.phone && formik.errors.phone
                        ? "text-red-400"
                        : "text-gray-400 group-focus-within:text-purple-500"
                    }`}
                  >
                    📞
                  </span>
                  <input
                    id="phone"
                    type="text"
                    {...formik.getFieldProps("phone")}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:ring-4 focus:outline-none transition-all font-medium text-lg placeholder:text-gray-300 ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100 text-red-900"
                        : "border-gray-200 focus:border-purple-400 focus:ring-purple-100 text-gray-700"
                    }`}
                    placeholder="0123 456 789"
                  />
                </div>
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-500 text-sm ml-1 font-semibold">{formik.errors.phone as string}</div>
                )}
              </div>

              {generalError && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl flex items-center gap-2 font-medium mt-2">
                  <ExclamationIcon className="h-5 w-5 shrink-0" />
                  {generalError}
                </div>
              )}

              {successMessage && (
                <div className="bg-green-50 text-green-600 text-sm p-4 rounded-xl flex items-start gap-3 font-medium border border-green-200 shadow-sm mt-2">
                  <div className="bg-green-100 p-1 rounded-full shrink-0">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p>{successMessage}</p>
                </div>
              )}

              <ActionButton
                type="submit"
                variant="glossy"
                color="blue"
                className="w-full py-4 text-xl uppercase tracking-wider shadow-lg hover:shadow-xl mt-4"
                disabled={loading}
              >
                {loading ? "Đang Gửi..." : "Gửi Góp Ý"}
              </ActionButton>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
