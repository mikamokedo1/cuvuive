import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { GET } from "./route";
import { NextRequest } from "next/server";

// Re-implement the helper functions locally for testing since they cannot be exported from route.ts
function getDayOfWeekForUser(userId: string): number {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash << 5) - hash + userId.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % 7;
}

function getVietnamDayOfWeek(date: Date = new Date()): number {
  const vnDateStr = date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
  const vnDate = new Date(vnDateStr);
  return vnDate.getDay();
}

// Mock the dependencies
const mockFindMany = vi.fn();
vi.mock("@/db", () => ({
  db: {
    query: {
      users: {
        findMany: (...args: any[]) => mockFindMany(...args),
      },
    },
  },
}));

const mockGetWeeklyReportData = vi.fn();
vi.mock("@/libs/actions/dashboard", () => ({
  getWeeklyReportDataAction: (...args: any[]) => mockGetWeeklyReportData(...args),
}));

// Mock fetch
const originalFetch = global.fetch;
const mockFetch = vi.fn();

describe("Weekly Report Cron Job (Brevo + Daily Rolling)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = mockFetch;
    
    // Set default env variables
    process.env.CRON_SECRET = "test-secret";
    process.env.BREVO_API_KEY = "test-brevo-key";
    process.env.BREVO_FROM_EMAIL = "Cú Thông Minh <noreply@cuthongminh.com>";
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should return 401 if unauthorized", async () => {
    const req = new NextRequest("http://localhost/api/cron/weekly-report", {
      headers: {
        authorization: "Bearer wrong-secret",
      },
    });

    const res = await GET(req);
    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toBe("Unauthorized");
  });

  it("should return 500 if BREVO_API_KEY is not configured", async () => {
    delete process.env.BREVO_API_KEY;
    delete process.env.RESEND_API_KEY;
    const req = new NextRequest("http://localhost/api/cron/weekly-report", {
      headers: {
        authorization: "Bearer test-secret",
      },
    });

    const res = await GET(req);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("BREVO_API_KEY not configured");
  });

  it("should process users scheduled for today, skip other cohorts, and send emails via Brevo", async () => {
    const todayVnDay = getVietnamDayOfWeek();

    // Find IDs that map to today's cohort and tomorrow's cohort
    let activeUserId = "user_today";
    let inactiveUserId = "user_tomorrow";

    // Loop to find user IDs that match target days
    for (let i = 0; i < 100; i++) {
      const id = `user_${i}`;
      const day = getDayOfWeekForUser(id);
      if (day === todayVnDay) {
        activeUserId = id;
      } else if (day === (todayVnDay + 1) % 7) {
        inactiveUserId = id;
      }
    }

    // 1. Mock eligible users in DB
    mockFindMany.mockResolvedValue([
      { id: activeUserId, email: "active@example.com" },
      { id: inactiveUserId, email: "inactive@example.com" }, // Should be skipped (wrong cohort today)
    ]);

    // 2. Mock report data for the active user
    mockGetWeeklyReportData.mockResolvedValueOnce({
      kidName: "Bé An",
      totalMinutes: 30,
      lessonsCompleted: 5,
      avgScore: 90,
      currentStreak: 2,
      topCourses: [{ title: "Toán", lessonsCompleted: 3 }],
      strengths: ["Toán"],
      weaknesses: [],
      prevTotalMinutes: 20,
      prevLessonsCompleted: 3,
    });

    // 3. Mock fetch responses (Brevo API call)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => "ok",
    });

    const req = new NextRequest("http://localhost/api/cron/weekly-report", {
      headers: {
        authorization: "Bearer test-secret",
      },
    });

    const res = await GET(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toEqual({
      ok: true,
      dayOfWeek: todayVnDay,
      eligibleTotal: 2,
      todayTotal: 1, // Only 1 user matched today's cohort
      sent: 1,
      failed: 0,
      skipped: 0,
    });

    // Check Brevo API call params
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe("https://api.brevo.com/v3/smtp/email");
    
    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(requestBody.sender).toEqual({
      name: "Cú Thông Minh",
      email: "noreply@cuthongminh.com",
    });
    expect(requestBody.to).toEqual([{ email: "active@example.com" }]);
    expect(requestBody.subject).toBe("📊 Báo cáo tuần: Bé An đã học 5 bài");
    expect(requestBody.htmlContent).toContain("Bé An");
  });
});
