"use client";

import { useSessionTracker } from "@/hooks/useSessionTracker";

/**
 * Invisible component that tracks learning session time.
 * Placed in AppProviders so it runs globally.
 */
export function SessionTrackerListener() {
  useSessionTracker();
  return null;
}
