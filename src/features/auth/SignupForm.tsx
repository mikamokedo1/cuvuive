"use client";

import { createClient } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ActionButton } from "@/components/common/ActionButton";
import owlHi from "@/assets/games/common/owl-say-hi.webp";
import {
  ConfirmPasswordIcon,
  EmailIcon,
  ExclamationIcon,
  EyeIcon,
  FacebookIcon,
  GoogleIcon,
  PasswordIcon,
  UserIcon,
} from "@/components/common/Icons";

export const MAP_ERROR = {
  "User already registered": "Email đã được đăng ký",
  "Invalid login credentials": "Email hoặc mật khẩu không chính xác",
};

export function SignupForm() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      kidName: "",
      age: 3,
      sex: "male",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
      password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Mật khẩu không khớp")
        .required("Vui lòng xác nhận mật khẩu"),
      kidName: Yup.string().required("Vui lòng nhập tên bé"),
      age: Yup.number().required("Vui lòng chọn tuổi"),
      sex: Yup.string().required("Vui lòng chọn giới tính"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setGeneralError(null);

      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/sign-up-success`,
          data: {
            kidName: values.kidName,
            age: values.age,
            sex: values.sex,
          },
        },
      });

      if (error) {
        setGeneralError(MAP_ERROR[error.message as keyof typeof MAP_ERROR] || error.message);
        setLoading(false);
      } else {
        router.push("/auth/sign-up-success");
      }
    },
  });

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/`,
      },
    });

    if (error) {
      setGeneralError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full border-4 border-white/50 backdrop-blur-sm">
      {/* Left Side - Illustration */}
      <div className="md:w-1/2 bg-purple-50 relative p-8 flex flex-col items-center justify-center overflow-hidden">
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

      {/* Right Side - Signup Form */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
        <div className="text-center mb-6">
          <h1 className="text-4xl text-purple-600 font-display mb-2 drop-shadow-sm">Đăng Ký</h1>
          <p className="text-gray-500 font-medium">Tạo tài khoản học tập cho bé</p>
        </div>

        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="cursor-pointer w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <GoogleIcon className="w-6 h-6" />
            Đăng ký bằng Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("facebook")}
            className="cursor-pointer w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white font-bold py-3 rounded-xl hover:bg-[#166FE5] transition-all shadow-md active:scale-[0.98]"
          >
            <FacebookIcon className="w-6 h-6" />
            Đăng ký bằng Facebook
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">hoặc bằng email</span>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <div className="space-y-1">
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
              <div className="text-red-500 text-xs ml-1 font-semibold">{formik.errors.kidName}</div>
            )}
          </div>

          <div className="flex gap-3">
            <div className="space-y-1 w-1/2">
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
                <div className="text-red-500 text-xs ml-1 font-semibold">{formik.errors.age}</div>
              )}
            </div>

            <div className="space-y-1 w-1/2">
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
                <div className="text-red-500 text-xs ml-1 font-semibold">{formik.errors.sex}</div>
              )}
            </div>
          </div>

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
                placeholder="Email của bố mẹ"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs ml-1 font-semibold">{formik.errors.email}</div>
            )}
          </div>

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
                placeholder="Mật khẩu"
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
                placeholder="Nhập lại mật khẩu"
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
            {loading ? "Đang xử lý..." : "Tạo Tài Khoản"}
          </ActionButton>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500 font-medium">
            Đã có tài khoản?{" "}
            <Link href="/auth/login" className="text-purple-600 font-bold hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
