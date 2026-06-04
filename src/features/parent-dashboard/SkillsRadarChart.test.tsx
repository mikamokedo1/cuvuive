// @vitest-environment jsdom
import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkillsRadarChart } from "./SkillsRadarChart";
import Chart from "chart.js/auto";

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

describe("SkillsRadarChart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => {
      return {} as any;
    });
  });

  it("should show empty state if all scores are 0", () => {
    const categories = [
      {
        category: "logic" as const,
        categoryTitle: "Tư duy",
        categoryIcon: "",
        totalLessons: 10,
        completedLessons: 0,
        percentage: 0,
      },
    ];

    render(<SkillsRadarChart categories={categories} />);

    // Should display the empty state message
    expect(screen.getByText(/Chưa có dữ liệu thế mạnh/)).toBeInTheDocument();
    expect(screen.getByText(/Bé cần hoàn thành bài học/)).toBeInTheDocument();

    // Chart should still be initialized (even with 0 scores, we still render the chart layout)
    expect(mockChartConstructor).toHaveBeenCalled();
  });

  it("should not show empty state if at least one score is greater than 0", () => {
    const categories = [
      {
        category: "logic" as const,
        categoryTitle: "Tư duy",
        categoryIcon: "",
        totalLessons: 10,
        completedLessons: 2, // 20% score
        percentage: 20,
      },
    ];

    render(<SkillsRadarChart categories={categories} />);

    // Empty state message should NOT be in the document
    expect(screen.queryByText(/Chưa có dữ liệu thế mạnh/)).toBeNull();

    // Chart should be initialized with the calculated radar data
    expect(mockChartConstructor).toHaveBeenCalled();
    const constructorCallArgs = mockChartConstructor.mock.calls[0];
    const dataPassed = constructorCallArgs[1].data;
    
    // Check that labels and scores are mapped correctly
    expect(dataPassed.labels).toEqual(["Tư duy", "Toán học", "Ngôn ngữ", "Nghệ thuật", "Kỹ năng sống"]);
    // Logic completedLessons = 2, totalLessons = 10 -> 20 score. Others should be 0.
    expect(dataPassed.datasets[0].data).toEqual([20, 0, 0, 0, 0]);
  });

  it("should cleanup/destroy chart on unmount", () => {
    const categories = [
      {
        category: "logic" as const,
        categoryTitle: "Tư duy",
        categoryIcon: "",
        totalLessons: 10,
        completedLessons: 2,
        percentage: 20,
      },
    ];

    const { unmount } = render(<SkillsRadarChart categories={categories} />);
    expect(mockDestroy).not.toHaveBeenCalled();

    unmount();
    expect(mockDestroy).toHaveBeenCalledTimes(1);
  });
});
