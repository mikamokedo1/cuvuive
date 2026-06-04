import type { WeeklyReportData } from "@/libs/actions/dashboard";

/**
 * Generates an HTML email template for the weekly learning report.
 * Uses inline styles for maximum email client compatibility.
 */
export function renderWeeklyReportEmail(data: WeeklyReportData): string {
  const {
    kidName,
    totalMinutes,
    lessonsCompleted,
    avgScore,
    currentStreak,
    topCourses,
    strengths,
    weaknesses,
    prevTotalMinutes,
    prevLessonsCompleted,
  } = data;

  const minutesDelta =
    prevTotalMinutes > 0 ? Math.round(((totalMinutes - prevTotalMinutes) / prevTotalMinutes) * 100) : 0;
  const lessonsDelta =
    prevLessonsCompleted > 0 ? Math.round(((lessonsCompleted - prevLessonsCompleted) / prevLessonsCompleted) * 100) : 0;

  const deltaText = (value: number) => {
    if (value > 0) return `<span style="color: #10b981;">↑ +${value}%</span>`;
    if (value < 0) return `<span style="color: #ef4444;">↓ ${value}%</span>`;
    return `<span style="color: #94a3b8;">— 0%</span>`;
  };

  return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Báo cáo tuần - ${kidName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f0f7ff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <tr>
      <td>
        <!-- Header -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #ff9c01, #f97316); border-radius: 20px; padding: 30px; text-align: center;">
          <tr>
            <td>
              <h1 style="color: white; font-size: 24px; margin: 0 0 8px;"><img src="https://assets.cuthongminh.com/assets/logo-long.webp" alt="Cú Thông Minh" style="width: 256px; height: 56px;" /></h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0;">Báo cáo tuần của <strong>${kidName}</strong></p>
            </td>
          </tr>
        </table>

        <!-- Stats -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 20px;">
          <tr>
            <td style="padding: 0 4px;" width="50%">
              <div style="background: white; border-radius: 16px; padding: 20px; text-align: center; border: 1px solid #e2e8f0;">
                <p style="font-size: 28px; font-weight: 800; color: #1e293b; margin: 0;">${totalMinutes}</p>
                <p style="font-size: 12px; color: #94a3b8; margin: 4px 0 0; font-weight: 600;">phút học ${deltaText(minutesDelta)}</p>
              </div>
            </td>
            <td style="padding: 0 4px;" width="50%">
              <div style="background: white; border-radius: 16px; padding: 20px; text-align: center; border: 1px solid #e2e8f0;">
                <p style="font-size: 28px; font-weight: 800; color: #1e293b; margin: 0;">${lessonsCompleted}</p>
                <p style="font-size: 12px; color: #94a3b8; margin: 4px 0 0; font-weight: 600;">bài hoàn thành ${deltaText(lessonsDelta)}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 4px 0;" width="50%">
              <div style="background: white; border-radius: 16px; padding: 20px; text-align: center; border: 1px solid #e2e8f0;">
                <p style="font-size: 28px; font-weight: 800; color: #1e293b; margin: 0;">${lessonsCompleted * 100 + totalMinutes * 10 || "—"}</p>
                <p style="font-size: 12px; color: #94a3b8; margin: 4px 0 0; font-weight: 600;">điểm tích lũy (XP)</p>
              </div>
            </td>
            <td style="padding: 8px 4px 0;" width="50%">
              <div style="background: white; border-radius: 16px; padding: 20px; text-align: center; border: 1px solid #e2e8f0;">
                <p style="font-size: 28px; font-weight: 800; color: #1e293b; margin: 0;">🔥 ${currentStreak}</p>
                <p style="font-size: 12px; color: #94a3b8; margin: 4px 0 0; font-weight: 600;">ngày streak</p>
              </div>
            </td>
          </tr>
        </table>

        <!-- Top Courses -->
        ${
          topCourses.length > 0
            ? `
        <div style="background: white; border-radius: 16px; padding: 24px; margin-top: 20px; border: 1px solid #e2e8f0;">
          <h2 style="font-size: 16px; color: #1e293b; margin: 0 0 16px;">⭐ Bài học nổi bật tuần này</h2>
          ${topCourses
            .map(
              (c, i) => `
          <div style="display: flex; align-items: center; padding: 10px 0; ${i < topCourses.length - 1 ? "border-bottom: 1px solid #f1f5f9;" : ""}">
            <span style="font-size: 12px; color: #64748b; font-weight: 600;">${i + 1}.</span>
            <span style="margin-left: 8px; font-size: 14px; color: #334155; font-weight: 600;">${c.title}</span>
            <span style="margin-left: auto; font-size: 12px; color: #f97316; font-weight: 700;">${c.lessonsCompleted} bài</span>
          </div>`,
            )
            .join("")}
        </div>`
            : ""
        }

        <!-- Strengths & Weaknesses -->
        <div style="background: white; border-radius: 16px; padding: 24px; margin-top: 20px; border: 1px solid #e2e8f0;">
          <h2 style="font-size: 16px; color: #1e293b; margin: 0 0 16px;">💡 Phân tích</h2>
          ${
            strengths.length > 0
              ? `<p style="font-size: 13px; color: #059669; margin: 0 0 8px;"><strong>✅ Thế mạnh:</strong> ${strengths.join(", ")}</p>`
              : ""
          }
          ${
            weaknesses.length > 0
              ? `<p style="font-size: 13px; color: #d97706; margin: 0;"><strong>⚠️ Cần luyện thêm:</strong> ${weaknesses.join(", ")}</p>`
              : ""
          }
          ${strengths.length === 0 && weaknesses.length === 0 ? `<p style="font-size: 13px; color: #94a3b8; margin: 0;">Bé cần học thêm để có đủ dữ liệu phân tích.</p>` : ""}
        </div>

        <!-- CTA -->
        <div style="text-align: center; margin-top: 24px;">
          <a href="https://cuthongminh.com/parent-dashboard" style="display: inline-block; padding: 14px 32px; background: #f97316; color: white; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 14px;">
            Xem chi tiết trên Dashboard →
          </a>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 11px; color: #94a3b8; margin: 0;">
            Bạn nhận email này vì đã bật thông báo tuần trên Cú Thông Minh.<br>
            <a href="https://cuthongminh.com/settings" style="color: #f97316;">Tắt thông báo</a>
          </p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
