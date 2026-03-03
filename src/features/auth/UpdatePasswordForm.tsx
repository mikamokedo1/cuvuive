"use client";

import { createClient } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ActionButton } from "@/components/common/ActionButton";
import { ConfirmPasswordIcon, ExclamationIcon, EyeIcon, PasswordIcon } from "@/components/common/Icons";

export function UpdatePasswordForm() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu mới"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Mật khẩu không khớp")
        .required("Vui lòng xác nhận mật khẩu"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setGeneralError(null);

      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        setGeneralError(error.message);
        setLoading(false);
      } else {
        alert("Đồi mật khẩu thành công! 🥳");
        router.push("/games");
        router.refresh();
      }
    },
  });

  return (
    <div className="flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full border-4 border-white/50 backdrop-blur-sm p-8 md:p-12 relative">
      <div className="text-center mb-8">
        <h1 className="text-3xl text-purple-600 font-display mb-2 drop-shadow-sm">Đặt Lại Mật Khẩu</h1>
        <p className="text-gray-500 font-medium">Nhập mật khẩu mới an toàn hơn nhé! 🔒</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-1">
          <div className="relative group">
            <span
              className={`absolute left-4 top-3.5 transition-colors ${
                formik.touched.password && formik.errors.password
                  ? "text-red-400"
                  : "text-gray-400 group-focus-within:text-purple-500"
              }`}
            >
              <PasswordIcon className="h-6 w-6" />
            </span>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...formik.getFieldProps("password")}
              className={`w-full pl-12 pr-12 py-3.5 rounded-xl border-2 focus:ring-4 focus:outline-none transition-all font-medium text-lg placeholder:text-gray-300 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100 text-red-900"
                  : "border-gray-200 focus:border-purple-400 focus:ring-purple-100 text-gray-700"
              }`}
              placeholder="Mật khẩu mới"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-gray-300 hover:text-gray-500"
            >
              <EyeIcon className="h-6 w-6" />
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-xs ml-1 font-semibold">{formik.errors.password}</div>
          )}
        </div>

        <div className="space-y-1">
          <div className="relative group">
            <span
              className={`absolute left-4 top-3.5 transition-colors ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "text-red-400"
                  : "text-gray-400 group-focus-within:text-purple-500"
              }`}
            >
              <ConfirmPasswordIcon className="h-6 w-6" />
            </span>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...formik.getFieldProps("confirmPassword")}
              className={`w-full pl-12 pr-12 py-3.5 rounded-xl border-2 focus:ring-4 focus:outline-none transition-all font-medium text-lg placeholder:text-gray-300 ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100 text-red-900"
                  : "border-gray-200 focus:border-purple-400 focus:ring-purple-100 text-gray-700"
              }`}
              placeholder="Nhập lại mật khẩu mới"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-3.5 text-gray-300 hover:text-gray-500"
            >
              <EyeIcon className="h-6 w-6" />
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-xs ml-1 font-semibold">{formik.errors.confirmPassword}</div>
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
          {loading ? "Đang cập nhật..." : "Cập Nhật Mật Khẩu"}
        </ActionButton>
      </form>
    </div>
  );
}
