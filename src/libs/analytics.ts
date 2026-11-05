/**
 * Thin wrapper around GA4's gtag. gtag.js loads lazily, so events fired before it is ready
 * are queued in dataLayer the same way the inline gtag() stub in layout.tsx does.
 */
type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

export function trackEvent(name: string, params: Record<string, string | number | null | undefined> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params);
    return;
  }
  w.dataLayer = w.dataLayer || [];
  // gtag expects an Arguments object, not a plain array.
  const queue: (...args: unknown[]) => void = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  queue("event", name, params);
}

const SOURCE_KEY = "paywall_source_course";

/** Remembers which game sent the parent to checkout, so the purchase event can credit it. */
export function savePaywallSource(courseId: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (courseId) localStorage.setItem(SOURCE_KEY, courseId);
    else localStorage.removeItem(SOURCE_KEY);
  } catch {
    // storage unavailable (private mode): attribution is best-effort
  }
}

export function getPaywallSource(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(SOURCE_KEY);
  } catch {
    return null;
  }
}
