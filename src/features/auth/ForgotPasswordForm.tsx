"use client";

import { createClient } from "@/libs/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ActionButton } from "@/components/common/ActionButton";
import { EmailIcon, ExclamationIcon } from "@/components/common/Icons";

export function ForgotPasswordForm() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setGeneralError(null);
      setSuccess(false);

      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${location.origin}/auth/update-password`,
      });

      if (error) {
        setGeneralError(error.message);
        setLoading(false);
      } else {
        setSuccess(true);
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full border-4 border-white/50 backdrop-blur-sm p-8 md:p-12 relative">
      <div className="text-center mb-8">
        <h1 className="text-3xl text-purple-600 font-display mb-2 drop-shadow-sm">Quên Mật Khẩu?</h1>
        <p className="text-gray-500 font-medium">Đừng lo, hãy nhập email để lấy lại mật khẩu nhé! 🕵️‍♂️</p>
      </div>

      {success ? (
        <div className="text-center">
          <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-200">
            <p className="font-bold text-lg mb-2">Đã gửi email! 📧</p>
            <p className="text-sm">Hãy kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật khẩu.</p>
          </div>
          <Link href="/auth/login" className="text-purple-600 font-bold hover:underline">
            Quay lại Đăng nhập
          </Link>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-1">
            <div className="relative group">
              <span
                className={`absolute left-4 top-3.5 transition-colors ${
                  formik.touched.email && formik.errors.email
                    ? "text-red-400"
                    : "text-gray-400 group-focus-within:text-purple-500"
                }`}
              >
                <EmailIcon className="h-6 w-6" />
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
                placeholder="Email tài khoản"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs ml-1 font-semibold">{formik.errors.email}</div>
            )}
          </div>

          {generalError && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg flex items-center gap-2">
              <ExclamationIcon className="h-5 w-5" />
              {generalError}
            </div>
          )}

          <ActionButton
            type="submit"
            variant="glossy"
            color="purple"
            className="w-full py-4 text-xl uppercase tracking-wider shadow-lg hover:shadow-xl mt-2"
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Gửi Yêu Cầu"}
          </ActionButton>

          <div className="text-center mt-4">
            <Link href="/auth/login" className="text-gray-500 font-bold hover:text-gray-700 hover:underline">
              Quay lại Đăng nhập
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
