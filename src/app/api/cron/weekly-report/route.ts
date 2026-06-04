import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { renderWeeklyReportEmail } from "@/libs/email-templates/weekly-report";
import { getWeeklyReportDataAction } from "@/libs/actions/dashboard";

const CRON_SECRET = process.env.CRON_SECRET;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Cú Thông Minh <noreply@cuthongminh.com>";

/**
 * GET /api/cron/weekly-report
 *
 * Sends weekly learning reports to all users who have opted in.
 * Should be called by a cron job every Sunday at 9:00 AM Vietnam time.
 *
 * Security: Protected by CRON_SECRET header.
 */
export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
  }

  try {
    // Get all users with weekly report enabled
    const eligibleUsers = await db.query.users.findMany({
      where: eq(users.weeklyReportEnabled, true),
      columns: {
        id: true,
        email: true,
      },
    });

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const user of eligibleUsers) {
      try {
        // Get report data for this user
        const reportData = await getWeeklyReportDataAction(user.id);

        if (!reportData || (reportData.lessonsCompleted === 0 && reportData.totalMinutes === 0)) {
          // Skip users with no activity this week
          continue;
        }

        const html = renderWeeklyReportEmail(reportData);

        // Send email via Resend
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: user.email,
            subject: `📊 Báo cáo tuần: ${reportData.kidName} đã học ${reportData.lessonsCompleted} bài`,
            html,
          }),
        });

        if (response.ok) {
          sent++;
        } else {
          const error = await response.text();
          failed++;
          errors.push(`${user.email}: ${error}`);
        }

        // Rate limit: 2 emails per second (Resend free tier limit)
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        failed++;
        errors.push(`${user.email}: ${String(error)}`);
      }
    }

    return NextResponse.json({
      ok: true,
      total: eligibleUsers.length,
      sent,
      failed,
      skipped: eligibleUsers.length - sent - failed,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Weekly report cron error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
