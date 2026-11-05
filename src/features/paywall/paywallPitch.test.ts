import { describe, expect, it } from "vitest";
import { buildPaywallPitch, parseGamePath, TOTAL_GAMES, TOTAL_LESSONS } from "./paywallPitch";

describe("parseGamePath", () => {
  it("reads course and group from a lesson URL", () => {
    expect(parseGamePath("/games/learn-numbers/group2/lesson/lesson1")).toEqual({
      courseId: "learn-numbers",
      groupId: "group2",
    });
  });

  it("reads a course URL without group", () => {
    expect(parseGamePath("/games/talk-with-owl")).toEqual({ courseId: "talk-with-owl", groupId: null });
  });

  it("ignores non-game URLs", () => {
    expect(parseGamePath("/upgrade")).toBeNull();
    expect(parseGamePath(null)).toBeNull();
  });
});

describe("buildPaywallPitch", () => {
  it("lists the locked groups of learn-numbers with its highlights", () => {
    const pitch = buildPaywallPitch("/games/learn-numbers/group2/lesson/lesson1");
    expect(pitch?.courseTitle).toBe("Đếm số");
    expect(pitch?.lockedGroupTitles).toEqual(["Làm quen 4-6", "Làm quen 7-9", "Làm quen 10-20", "Luyện tập"]);
    expect(pitch?.lockedLessonCount).toBe(14);
    expect(pitch?.highlights.length).toBeGreaterThan(0);
  });

  it("works for games without hand-written highlights", () => {
    const pitch = buildPaywallPitch("/games/learn-shape/group2");
    expect(pitch).not.toBeNull();
    expect(pitch?.highlights).toEqual([]);
    expect(pitch?.lockedGroupTitles.length).toBeGreaterThan(0);
  });

  it("returns null for unknown games", () => {
    expect(buildPaywallPitch("/games/not-a-game/group1")).toBeNull();
  });

  it("counts the catalogue", () => {
    expect(TOTAL_GAMES).toBeGreaterThan(40);
    expect(TOTAL_LESSONS).toBeGreaterThan(600);
  });
});
