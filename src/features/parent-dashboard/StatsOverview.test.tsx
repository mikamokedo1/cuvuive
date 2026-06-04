// @vitest-environment jsdom
import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsOverview } from "./StatsOverview";

// Immediately resolve requestAnimationFrame callbacks with future time in setTimeout so AnimatedNumber renders final target value instantly
vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
  return setTimeout(() => cb(performance.now() + 2000), 0);
});
vi.stubGlobal("cancelAnimationFrame", (id: any) => {
  clearTimeout(id);
});

describe("StatsOverview", () => {
  const defaultStats = {
    totalMinutes: 45,
    lessonsCompleted: 8,
    avgScore: 92,
    currentStreak: 5,
    dailyData: [],
    minutesDelta: 15,
    lessonsDelta: -5,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all statistics cards with correct labels", () => {
    render(<StatsOverview stats={defaultStats} />);

    expect(screen.getByText("Thời gian học")).toBeInTheDocument();
    expect(screen.getByText("Bài hoàn thành")).toBeInTheDocument();
    expect(screen.getByText("Điểm tích lũy")).toBeInTheDocument();
    expect(screen.getByText("Chuỗi học tập")).toBeInTheDocument();
  });

  it("should calculate and render correct values", async () => {
    render(<StatsOverview stats={defaultStats} />);

    // totalMinutes = 45 -> "45 phút"
    expect(await screen.findByText("45 phút")).toBeInTheDocument();

    // lessonsCompleted = 8 -> "8 bài"
    expect(await screen.findByText("8 bài")).toBeInTheDocument();

    // currentStreak = 5 -> "5 ngày"
    expect(await screen.findByText("5 ngày")).toBeInTheDocument();

    // XP = lessonsCompleted * 100 + totalMinutes * 10 = 8 * 100 + 45 * 10 = 800 + 450 = 1250 XP
    expect(await screen.findByText("1250 XP")).toBeInTheDocument();
  });

  it("should display delta badges with correct trends", () => {
    render(<StatsOverview stats={defaultStats} />);

    // minutesDelta = 15 -> "+15%" (green badge)
    expect(screen.getByText("+15%")).toBeInTheDocument();

    // lessonsDelta = -5 -> "-5%" (red badge)
    expect(screen.getByText("-5%")).toBeInTheDocument();
  });

  it("should not render delta badge when delta is zero", () => {
    const statsWithZeroDeltas = {
      ...defaultStats,
      minutesDelta: 0,
    };
    render(<StatsOverview stats={statsWithZeroDeltas} />);

    // 0% badge should not be in the document
    expect(screen.queryByText("0%")).toBeNull();
  });
});
