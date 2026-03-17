"use client";

import { createClient } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import { ActionButton } from "@/components/common/ActionButton";
const owlHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";
import { ExclamationIcon, PhoneIcon, UserIcon } from "@/components/common/Icons";

interface MissingInfoModalProps {
  isOpen: boolean;
  onSuccess: () => void;
}

export function MissingInfoModal({ isOpen, onSuccess }: MissingInfoModalProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      kidName: "",
      parentPhone: "",
      age: 3,
      sex: "male",
    },
    validationSchema: object({
      kidName: string().required("Vui lòng nhập tên bé"),
      parentPhone: string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
      age: number().required("Vui lòng chọn tuổi"),
      sex: string().required("Vui lòng chọn giới tính"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setGeneralError(null);

      const { error } = await supabase.auth.updateUser({
        data: {
          kidName: values.kidName,
          parentPhone: values.parentPhone,
          age: values.age,
          sex: values.sex,
        },
      });

      if (error) {
        setGeneralError(error.message);
        setLoading(false);
      } else {
        onSuccess();
        // Refresh to ensure context updates
        router.refresh();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full border-4 border-white/50 animate-scale-in">
        <div className="p-8 flex flex-col justify-center bg-white relative">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Image src={owlHi} alt="Owl Companion" width={100} height={100} className="drop-shadow-lg" />
            </div>
            <h2 className="text-2xl text-purple-600 font-display mb-2 drop-shadow-sm">Thêm Thông Tin Bé</h2>
            <p className="text-gray-500 font-medium text-sm">Để Cú Thông Minh có thể hỗ trợ bé tốt nhất nhé!</p>
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

            <div className="space-y-1">
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
                <div className="text-red-500 text-xs ml-1 font-semibold">{formik.errors.parentPhone}</div>
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
              {loading ? "Đang xử lý..." : "Cập Nhật"}
            </ActionButton>
          </form>
        </div>
      </div>
    </div>
  );
}
