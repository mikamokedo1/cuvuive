// @vitest-environment jsdom
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PaywallModal } from "./PaywallModal";

let redirectUrl: string | null = null;
let completedLessons: Record<string, string[]> = {};

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: { src: string; alt: string }) => <img src={props.src} alt={props.alt} />,
}));
vi.mock("@/context/AccessContext", () => ({
  useAccess: () => ({
    paywallState: { isOpen: true, type: "premium", redirectUrl },
    setPaywallState: vi.fn(),
  }),
}));
vi.mock("@/context/ProgressContext", () => ({
  useProgress: () => ({ getCourseProgress: () => ({ completedGroups: [], completedLessons }) }),
}));
vi.mock("@/libs/supabase/client", () => ({ createClient: vi.fn() }));

describe("PaywallModal premium", () => {
  beforeEach(() => {
    redirectUrl = null;
    completedLessons = {};
  });

  it("shows the game-specific pitch for learn-numbers", () => {
    redirectUrl = "/games/learn-numbers/group2/lesson/lesson1";
    completedLessons = { group1: ["lesson1", "lesson2", "lesson3", "lesson4"] };
    render(<PaywallModal isOpen type="premium" onClose={vi.fn()} />);

    expect(screen.getByText("🎉 Bé đã hoàn thành 4 bài!")).toBeInTheDocument();
    expect(screen.getByText("Làm quen 4-6")).toBeInTheDocument();
    expect(screen.getByText("Đếm, nhận biết và tập viết số từ 1 đến 20")).toBeInTheDocument();
    expect(screen.getByText("Mở khóa cho bé")).toBeInTheDocument();
    expect(screen.getByText("299.000đ")).toBeInTheDocument();
    expect(screen.getByText("399.000đ")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/upgrade?next=%2Fgames%2Flearn-numbers%2Fgroup2%2Flesson%2Flesson1",
    );
  });

  it("falls back to the generic pitch outside a game", () => {
    redirectUrl = "/upgrade";
    render(<PaywallModal isOpen type="premium" onClose={vi.fn()} />);
    expect(screen.getByText("Nâng cấp Premium")).toBeInTheDocument();
    expect(screen.getByText("Nâng cấp ngay")).toBeInTheDocument();
  });
});
