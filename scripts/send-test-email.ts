import * as dotenv from "dotenv";
import { renderWeeklyReportEmail } from "../src/libs/email-templates/weekly-report";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

async function main() {
  const brevoApiKey = process.env.BREVO_API_KEY || process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.BREVO_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || "Cú Thông Minh <noreply@cuthongminh.com>";
  const targetEmail = "mikamokedo@gmail.com";

  if (!brevoApiKey || brevoApiKey.includes("your-brevo-api-key")) {
    console.error("❌ BREVO_API_KEY is not configured in .env.local!");
    console.log("Vui lòng cập nhật API Key thật của Brevo vào file .env.local trước khi chạy test.");
    process.exit(1);
  }

  // Parse sender
  const match = fromEmail.match(/^([^<]+)\s*<([^>]+)>$/);
  const sender = match
    ? { name: match[1].trim(), email: match[2].trim() }
    : { name: "Cú Thông Minh", email: fromEmail.trim() };

  console.log(`Sending test email to ${targetEmail} via Brevo...`);
  console.log(`Sender: ${sender.name} <${sender.email}>`);

  // Generate mock weekly report data
  const dummyReportData = {
    kidName: "Bé An",
    totalMinutes: 45,
    lessonsCompleted: 6,
    avgScore: 95,
    currentStreak: 3,
    topCourses: [
      { title: "Đếm số", lessonsCompleted: 4 },
      { title: "Học màu sắc", lessonsCompleted: 2 },
    ],
    strengths: ["Toán Học", "Mỹ Thuật"],
    weaknesses: [],
    prevTotalMinutes: 30,
    prevLessonsCompleted: 4,
  };

  const html = renderWeeklyReportEmail(dummyReportData);

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender,
        to: [{ email: targetEmail }],
        subject: `📊 [TEST] Báo cáo tuần: ${dummyReportData.kidName} đã học ${dummyReportData.lessonsCompleted} bài`,
        htmlContent: html,
      }),
    });

    const responseData = await response.text();
    if (response.ok) {
      console.log("✅ Email sent successfully!");
      console.log("Brevo API Response:", responseData);
      console.log(`Please check the inbox of ${targetEmail} (including Spam/Junk/Promo folders).`);
    } else {
      console.error(`❌ Failed to send email. API Response: ${responseData}`);
    }
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

main();
