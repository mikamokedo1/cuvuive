import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { renderWeeklyReportEmail } from "@/libs/email-templates/weekly-report";
import { getWeeklyReportDataAction } from "@/libs/actions/dashboard";

const CRON_SECRET = process.env.CRON_SECRET;
const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.BREVO_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || "Cú Thông Minh <noreply@cuthongminh.com>";

/**
 * Parses "Name <email@domain.com>" or "email@domain.com" into Brevo sender object format.
 */
function parseFromEmail(fromStr: string): { name: string; email: string } {
  const match = fromStr.match(/^([^<]+)\s*<([^>]+)>$/);
  if (match) {
    return { name: match[1].trim(), email: match[2].trim() };
  }
  return { name: "Cú Thông Minh", email: fromStr.trim() };
}

/**
 * Consistently maps a userId to a day of the week (0 = Sunday to 6 = Saturday)
 * to distribute email sending volume evenly.
 */
function getDayOfWeekForUser(userId: string): number {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash << 5) - hash + userId.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % 7;
}

/**
 * Gets the current day of the week in Vietnam timezone (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
 */
function getVietnamDayOfWeek(date: Date = new Date()): number {
  const vnDateStr = date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
  const vnDate = new Date(vnDateStr);
  return vnDate.getDay();
}

/**
 * GET /api/cron/weekly-report
 *
 * Sends weekly learning reports to eligible users.
 * To distribute email sending volume (staying within Brevo free limits),
 * users are divided into 7 rolling cohorts (one for each day of the week).
 * This endpoint should be triggered DAILY (e.g., at 9:00 AM Vietnam time).
 *
 * Security: Protected by CRON_SECRET header.
 */
export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!BREVO_API_KEY) {
    return NextResponse.json({ error: "BREVO_API_KEY not configured" }, { status: 500 });
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

    const currentVnDay = getVietnamDayOfWeek();
    
    // Filter users scheduled for today
    const usersForToday = eligibleUsers.filter(
      (user) => getDayOfWeekForUser(user.id) === currentVnDay
    );

    console.log(
      `Weekly report cron: Today is VN day ${currentVnDay}. Processing ${usersForToday.length} of ${eligibleUsers.length} total eligible users.`
    );

    const sender = parseFromEmail(FROM_EMAIL);
    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const user of usersForToday) {
      try {
        // Get report data for this user
        const reportData = await getWeeklyReportDataAction(user.id);

        if (!reportData || (reportData.lessonsCompleted === 0 && reportData.totalMinutes === 0)) {
          // Skip users with no activity this week
          continue;
        }

        const html = renderWeeklyReportEmail(reportData);

        // Send email via Brevo API v3
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "api-key": BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender,
            to: [{ email: user.email }],
            subject: `📊 Báo cáo tuần: ${reportData.kidName} đã học ${reportData.lessonsCompleted} bài`,
            htmlContent: html,
          }),
        });

        if (response.ok) {
          sent++;
        } else {
          const error = await response.text();
          failed++;
          errors.push(`${user.email}: ${error}`);
        }

        // Small safety delay between emails
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        failed++;
        errors.push(`${user.email}: ${String(error)}`);
      }
    }

    return NextResponse.json({
      ok: true,
      dayOfWeek: currentVnDay,
      eligibleTotal: eligibleUsers.length,
      todayTotal: usersForToday.length,
      sent,
      failed,
      skipped: usersForToday.length - sent - failed,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Weekly report cron error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
