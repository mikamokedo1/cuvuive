// @vitest-environment jsdom
import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressChart } from "./ProgressChart";

const { mockChartConstructor, mockDestroy } = vi.hoisted(() => {
  const mockDestroy = vi.fn();
  const mockChartConstructor = vi.fn().mockImplementation(function() {
    return {
      destroy: mockDestroy,
    };
  });
  return { mockChartConstructor, mockDestroy };
});

vi.mock("chart.js/auto", () => {
  return {
    default: mockChartConstructor,
  };
});

describe("ProgressChart", () => {
  const defaultStats = {
    totalMinutes: 45,
    lessonsCompleted: 8,
    avgScore: 92,
    currentStreak: 5,
    dailyData: [
      { date: "01/06", lessons: 2, minutes: 10 },
      { date: "02/06", lessons: 1, minutes: 5 },
      { date: "03/06", lessons: 5, minutes: 30 },
    ],
    minutesDelta: 15,
    lessonsDelta: -5,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => {
      return {
        createLinearGradient: vi.fn().mockReturnValue({
          addColorStop: vi.fn(),
        }),
      } as any;
    });
  });

  it("should render chart header and customized legends", () => {
    render(<ProgressChart data={defaultStats.dailyData} period="week" />);

    expect(screen.getByText("📈 Biểu đồ tiến trình")).toBeInTheDocument();
    
    // Custom legends
    expect(screen.getByText("Bài học")).toBeInTheDocument();
    expect(screen.getByText("Phút học")).toBeInTheDocument();
  });

  it("should initialize Chart.js with correct dataset mappings", () => {
    render(<ProgressChart data={defaultStats.dailyData} period="week" />);

    expect(mockChartConstructor).toHaveBeenCalled();
    const config = mockChartConstructor.mock.calls[0][1];

    // Verify types and labels
    expect(config.type).toBe("line");
    expect(config.data.labels).toEqual(["01/06", "02/06", "03/06"]);

    // Verify lessons dataset (orange)
    const lessonsDataset = config.data.datasets[0];
    expect(lessonsDataset.label).toBe("Bài học");
    expect(lessonsDataset.data).toEqual([2, 1, 5]);

    // Verify minutes dataset (blue)
    const minutesDataset = config.data.datasets[1];
    expect(minutesDataset.label).toBe("Phút học");
    expect(minutesDataset.data).toEqual([10, 5, 30]);
  });

  it("should clean up/destroy chart instance on unmount", () => {
    const { unmount } = render(<ProgressChart data={defaultStats.dailyData} period="week" />);
    
    unmount();
    expect(mockDestroy).toHaveBeenCalledTimes(1);
  });
});
