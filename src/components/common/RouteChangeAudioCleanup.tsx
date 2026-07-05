"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Stops all ongoing audio playback when the route changes.
 *
 * This handles:
 * 1. Web Speech API (`speechSynthesis`) — used by `useTextToSpeech` in many game components
 * 2. Pending speak timeouts — the 150ms Chrome workaround delay in `useTextToSpeech`
 *
 * Place this component once in the app (e.g., inside `AppProviders`).
 * It runs on every pathname change and cancels any leftover audio from the previous page.
 */
export function RouteChangeAudioCleanup() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Skip the initial mount — only run on actual route changes
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    // Cancel Web Speech API (used by useTextToSpeech hook)
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [pathname]);

  return null;
}
