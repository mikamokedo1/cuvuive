import { WEIGHT_BOYS, WEIGHT_GIRLS, HEIGHT_BOYS, HEIGHT_GIRLS, formatAge } from "@/libs/data/who-growth-standards";

/**
 * Static WHO reference table rendered as a Server Component.
 * This content is fully crawlable by Google for SEO.
 */
export function WHOTable() {
  return (
    <div className="space-y-12">
      {/* Weight Tables */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-baloo-2)]">
          📊 Bảng cân nặng chuẩn WHO (kg)
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Boys Weight */}
          <div>
            <h4 className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wide">👦 Bé trai</h4>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-3 py-2 text-left font-bold text-slate-700">Tuổi</th>
                    <th className="px-2 py-2 text-center font-bold text-red-500">3%</th>
                    <th className="px-2 py-2 text-center font-bold text-orange-500">15%</th>
                    <th className="px-2 py-2 text-center font-bold text-green-600 bg-green-50/50">50%</th>
                    <th className="px-2 py-2 text-center font-bold text-orange-500">85%</th>
                    <th className="px-2 py-2 text-center font-bold text-red-500">97%</th>
                  </tr>
                </thead>
                <tbody>
                  {WEIGHT_BOYS.map((row) => (
                    <tr key={row.month} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-1.5 font-medium text-slate-700">{formatAge(row.month)}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p3}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p15}</td>
                      <td className="px-2 py-1.5 text-center font-bold text-green-700 bg-green-50/30">{row.p50}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p85}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p97}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Girls Weight */}
          <div>
            <h4 className="text-sm font-bold text-pink-600 mb-2 uppercase tracking-wide">👧 Bé gái</h4>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-pink-50">
                    <th className="px-3 py-2 text-left font-bold text-slate-700">Tuổi</th>
                    <th className="px-2 py-2 text-center font-bold text-red-500">3%</th>
                    <th className="px-2 py-2 text-center font-bold text-orange-500">15%</th>
                    <th className="px-2 py-2 text-center font-bold text-green-600 bg-green-50/50">50%</th>
                    <th className="px-2 py-2 text-center font-bold text-orange-500">85%</th>
                    <th className="px-2 py-2 text-center font-bold text-red-500">97%</th>
                  </tr>
                </thead>
                <tbody>
                  {WEIGHT_GIRLS.map((row) => (
                    <tr key={row.month} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-1.5 font-medium text-slate-700">{formatAge(row.month)}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p3}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p15}</td>
                      <td className="px-2 py-1.5 text-center font-bold text-green-700 bg-green-50/30">{row.p50}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p85}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p97}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Height Tables */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-baloo-2)]">
          📏 Bảng chiều cao chuẩn WHO (cm)
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Boys Height */}
          <div>
            <h4 className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wide">👦 Bé trai</h4>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-3 py-2 text-left font-bold text-slate-700">Tuổi</th>
                    <th className="px-2 py-2 text-center font-bold text-red-500">3%</th>
                    <th className="px-2 py-2 text-center font-bold text-orange-500">15%</th>
                    <th className="px-2 py-2 text-center font-bold text-green-600 bg-green-50/50">50%</th>
                    <th className="px-2 py-2 text-center font-bold text-orange-500">85%</th>
                    <th className="px-2 py-2 text-center font-bold text-red-500">97%</th>
                  </tr>
                </thead>
                <tbody>
                  {HEIGHT_BOYS.map((row) => (
                    <tr key={row.month} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-1.5 font-medium text-slate-700">{formatAge(row.month)}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p3}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p15}</td>
                      <td className="px-2 py-1.5 text-center font-bold text-green-700 bg-green-50/30">{row.p50}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p85}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p97}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Girls Height */}
          <div>
            <h4 className="text-sm font-bold text-pink-600 mb-2 uppercase tracking-wide">👧 Bé gái</h4>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-pink-50">
                    <th className="px-3 py-2 text-left font-bold text-slate-700">Tuổi</th>
                    <th className="px-2 py-2 text-center font-bold text-red-500">3%</th>
                    <th className="px-2 py-2 text-center font-bold text-orange-500">15%</th>
                    <th className="px-2 py-2 text-center font-bold text-green-600 bg-green-50/50">50%</th>
                    <th className="px-2 py-2 text-center font-bold text-orange-500">85%</th>
                    <th className="px-2 py-2 text-center font-bold text-red-500">97%</th>
                  </tr>
                </thead>
                <tbody>
                  {HEIGHT_GIRLS.map((row) => (
                    <tr key={row.month} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-1.5 font-medium text-slate-700">{formatAge(row.month)}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p3}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p15}</td>
                      <td className="px-2 py-1.5 text-center font-bold text-green-700 bg-green-50/30">{row.p50}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p85}</td>
                      <td className="px-2 py-1.5 text-center text-slate-500">{row.p97}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center">
        Nguồn: Tổ chức Y tế Thế giới (WHO) — Child Growth Standards.
        Dữ liệu áp dụng cho trẻ em từ sơ sinh đến 8 tuổi.
      </p>
    </div>
  );
}
