// @vitest-environment jsdom
import { describe, expect, it, vi, beforeEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import SpeakPraticeLayout from "./SpeakPraticeLayout";

let speech = { isSupported: true, error: null as string | null, transcript: "" };
let micStatus = "granted";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: { src: string; alt: string }) => <img src={props.src} alt={props.alt} />,
}));
// Stable function identities, like the real hooks (useCallback); new ones each render would loop effects
const fns = { speak: vi.fn(), start: vi.fn(), stop: vi.fn(), reset: vi.fn(), request: vi.fn() };
vi.mock("@/hooks/useTextToSpeech", () => ({ useTextToSpeech: () => ({ speak: fns.speak }) }));
vi.mock("@/hooks/useSpeechRecognition", () => ({
  useSpeechRecognition: () => ({
    isListening: false,
    transcript: speech.transcript,
    interimTranscript: "",
    isSupported: speech.isSupported,
    error: speech.error,
    startListening: fns.start,
    stopListening: fns.stop,
    resetTranscript: fns.reset,
  }),
}));
vi.mock("@/hooks/useMicrophonePermission", () => ({
  useMicrophonePermission: () => ({ status: micStatus, requestPermission: fns.request }),
}));
vi.mock("@/libs/utils/playWinEffect", () => ({ playWinEffect: vi.fn() }));
vi.mock("@/libs/utils/playSound", () => ({ playButtonSound: vi.fn(), playSound: vi.fn() }));
vi.mock("@/libs/analytics", () => ({ trackEvent: vi.fn() }));

const entities = [
  { id: "bo", name: "Bố", image: "/bo.webp" },
  { id: "me", name: "Mẹ", image: "/me.webp" },
] as never[];

const nextButton = () => document.querySelector("button:has(svg.lucide-arrow-right), button:has(svg.lucide-check)") as HTMLButtonElement;

describe("SpeakPraticeLayout never blocks the child", () => {
  beforeEach(() => {
    speech = { isSupported: true, error: null, transcript: "" };
    vi.useRealTimers();
    micStatus = "granted";
  });

  it("without speech recognition, the lesson counts as done right away", () => {
    speech.isSupported = false;
    const onComplete = vi.fn();
    render(<SpeakPraticeLayout entities={entities} onComplete={onComplete} />);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Máy này chưa dùng được micro")).toBeInTheDocument();
    expect(screen.getByText(/Safari hoặc Chrome/)).toBeInTheDocument();
  });

  it("with the microphone blocked, the lesson counts as done", () => {
    micStatus = "denied";
    const onComplete = vi.fn();
    render(<SpeakPraticeLayout entities={entities} onComplete={onComplete} />);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/bật lại quyền micro/)).toBeInTheDocument();
  });

  it("with iPhone dictation off, the lesson counts as done", () => {
    speech.error = "service-not-allowed";
    const onComplete = vi.fn();
    render(<SpeakPraticeLayout entities={entities} onComplete={onComplete} />);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("while waiting for permission, does not skip and has no 'without microphone' option", () => {
    micStatus = "idle";
    const onComplete = vi.fn();
    render(<SpeakPraticeLayout entities={entities} onComplete={onComplete} />);
    expect(onComplete).not.toHaveBeenCalled();
    expect(screen.getByText("Cho phép sử dụng micro 🎤")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Học không dùng micro" })).toBeNull();
  });

  it("after two wrong tries, shows the > button to move on", () => {
    vi.useFakeTimers();
    speech.transcript = "con mèo"; // the child keeps saying something else than "Bố"
    render(<SpeakPraticeLayout entities={entities} onComplete={vi.fn()} />);
    expect(nextButton()).toBeNull();
    act(() => vi.advanceTimersByTime(2100)); // first wrong try is reset after 2s, then judged again
    act(() => vi.advanceTimersByTime(2100));
    expect(nextButton()).not.toBeNull();
    fireEvent.click(nextButton());
    expect(screen.getByAltText("Mẹ")).toBeInTheDocument();
  });

  it("stays silent behind the permission prompt, reads the word once the mic is allowed", () => {
    vi.useFakeTimers();
    fns.speak.mockClear();
    micStatus = "idle";
    const { rerender } = render(<SpeakPraticeLayout entities={entities} onComplete={vi.fn()} />);
    act(() => vi.advanceTimersByTime(2000));
    expect(fns.speak).not.toHaveBeenCalled();
    micStatus = "granted";
    rerender(<SpeakPraticeLayout entities={entities} onComplete={vi.fn()} />);
    act(() => vi.advanceTimersByTime(1000));
    expect(fns.speak).toHaveBeenCalledWith("Bố");
  });

  it("with everything working, shows the microphone and no skip button yet", () => {
    render(<SpeakPraticeLayout entities={entities} onComplete={vi.fn()} />);
    expect(screen.queryByText("Máy này chưa dùng được micro")).not.toBeInTheDocument();
    expect(screen.getByText("Bấm vào chiếc mic để bắt đầu nói")).toBeInTheDocument();
    expect(nextButton()).toBeNull();
  });
});
