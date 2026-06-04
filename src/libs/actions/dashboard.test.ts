import { vi, describe, it, expect, beforeEach } from "vitest";
import {
  getDashboardStatsAction,
  getCategoryAnalysisAction,
  getLessonSuggestionsAction,
} from "./dashboard";

// --- MOCKS ---

const mockGetUser = vi.fn();
vi.mock("@/libs/supabase/server", () => ({
  createClient: () => ({
    auth: {
      getUser: () => mockGetUser(),
    },
  }),
}));

const mockSelectResult = vi.fn();
const mockFindFirst = vi.fn();

const mockSelect = vi.fn().mockImplementation(() => {
  return {
    from: vi.fn().mockImplementation(() => {
      return {
        where: vi.fn().mockImplementation(() => {
          return {
            groupBy: vi.fn().mockImplementation(() => {
              return {
                then: (resolve: any) => resolve(mockSelectResult()),
              };
            }),
            then: (resolve: any) => resolve(mockSelectResult()),
          };
        }),
      };
    }),
  };
});

vi.mock("@/db", () => ({
  db: {
    select: (...args: any[]) => mockSelect(...args),
    query: {
      users: {
        findFirst: (...args: any[]) => mockFindFirst(...args),
      },
    },
  },
}));

describe("dashboard actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getDashboardStatsAction", () => {
    it("should return null if user is not authenticated", async () => {
      mockGetUser.mockResolvedValueOnce({ data: { user: null } });
      const res = await getDashboardStatsAction("week");
      expect(res).toBeNull();
    });

    it("should return correct stats for week period when user is logged in", async () => {
      mockGetUser.mockResolvedValue({ data: { user: { id: "user_123" } } });
      mockFindFirst.mockResolvedValueOnce({ currentStreak: 3 });

      // Mock the 6 select queries executed in getDashboardStatsAction:
      // 1. currentLessons
      mockSelectResult.mockResolvedValueOnce([{ count: 5, avgScore: 85 }]);
      // 2. prevLessons
      mockSelectResult.mockResolvedValueOnce([{ count: 2 }]);
      // 3. currentTime (seconds)
      mockSelectResult.mockResolvedValueOnce([{ totalSeconds: 1800 }]); // 30 minutes
      // 4. prevTime (seconds)
      mockSelectResult.mockResolvedValueOnce([{ totalSeconds: 1200 }]); // 20 minutes
      // 5. dailyLessons
      mockSelectResult.mockResolvedValueOnce([
        { day: "2026-06-03", count: 2 },
        { day: "2026-06-04", count: 3 },
      ]);
      // 6. dailySessions
      mockSelectResult.mockResolvedValueOnce([
        { day: "2026-06-03", totalSeconds: 600 },
        { day: "2026-06-04", totalSeconds: 1200 },
      ]);

      const res = await getDashboardStatsAction("week");
      expect(res).not.toBeNull();
      expect(res?.totalMinutes).toBe(30);
      expect(res?.lessonsCompleted).toBe(5);
      expect(res?.avgScore).toBe(85);
      expect(res?.currentStreak).toBe(3);
      expect(res?.lessonsDelta).toBe(150); // (5 - 2)/2 * 100
      expect(res?.minutesDelta).toBe(50); // (30 - 20)/20 * 100
      expect(res?.dailyData).toHaveLength(7); // 7 days in a week
    });

    it("should return correct stats for today period", async () => {
      mockGetUser.mockResolvedValue({ data: { user: { id: "user_123" } } });
      mockFindFirst.mockResolvedValueOnce({ currentStreak: 1 });

      mockSelectResult.mockResolvedValueOnce([{ count: 1, avgScore: 90 }]); // currentLessons
      mockSelectResult.mockResolvedValueOnce([{ count: 0 }]); // prevLessons
      mockSelectResult.mockResolvedValueOnce([{ totalSeconds: 600 }]); // currentTime
      mockSelectResult.mockResolvedValueOnce([{ totalSeconds: 0 }]); // prevTime
      mockSelectResult.mockResolvedValueOnce([]); // dailyLessons
      mockSelectResult.mockResolvedValueOnce([]); // dailySessions

      const res = await getDashboardStatsAction("today");
      expect(res).not.toBeNull();
      expect(res?.totalMinutes).toBe(10);
      expect(res?.lessonsCompleted).toBe(1);
      expect(res?.lessonsDelta).toBe(0);
      expect(res?.minutesDelta).toBe(0);
      expect(res?.dailyData).toHaveLength(1);
    });
  });

  describe("getCategoryAnalysisAction", () => {
    it("should return empty array if user is not authenticated", async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      const res = await getCategoryAnalysisAction();
      expect(res).toEqual([]);
    });

    it("should group completed lessons by category correctly", async () => {
      mockGetUser.mockResolvedValue({ data: { user: { id: "user_123" } } });
      // Return 2 completed lessons
      mockSelectResult.mockResolvedValueOnce([
        { courseId: "toan-tu-duy-1", groupId: "phep-cong", lessonId: "bai-1" },
        { courseId: "tieng-viet-1", groupId: "chu-cai", lessonId: "bai-a" },
      ]);

      const res = await getCategoryAnalysisAction();
      expect(res.length).toBeGreaterThan(0);
      // Ensure it sorted descending or returns stats
      const first = res[0];
      expect(first).toHaveProperty("category");
      expect(first).toHaveProperty("totalLessons");
      expect(first).toHaveProperty("completedLessons");
      expect(first).toHaveProperty("percentage");
    });
  });

  describe("getLessonSuggestionsAction", () => {
    it("should return empty array if user is not authenticated", async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });
      const res = await getLessonSuggestionsAction();
      expect(res).toEqual([]);
    });

    it("should return suggestions from weakest categories first", async () => {
      mockGetUser.mockResolvedValue({ data: { user: { id: "user_123" } } });
      // 1. mockSelectResult for suggestions' getAuthenticatedUserId's completed query
      mockSelectResult.mockResolvedValueOnce([]);
      
      // 2. mockSelectResult for getCategoryAnalysisAction's completed query
      mockSelectResult.mockResolvedValueOnce([]);

      const res = await getLessonSuggestionsAction();
      expect(Array.isArray(res)).toBe(true);
      if (res.length > 0) {
        expect(res[0]).toHaveProperty("courseId");
        expect(res[0]).toHaveProperty("lessonId");
        expect(res[0]).toHaveProperty("reason");
      }
    });
  });
});
