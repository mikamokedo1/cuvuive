/**
 * useRoadmapBack
 *
 * Reads the `?from=` query param (set by RoadmapView when navigating to a game)
 * and returns the correct "back" URL.
 *
 * Examples:
 *   /games/learn-alphabet?from=lo-trinh/tien-lop-1  → back = /lo-trinh/tien-lop-1
 *   /games/learn-alphabet                            → back = /games
 */
"use client";

import { useSearchParams } from "next/navigation";

const ROADMAP_PREFIX = "lo-trinh/";

export function useRoadmapBack(fallback: string = "/games"): string {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  if (from && from.startsWith(ROADMAP_PREFIX)) {
    return `/${from}`;
  }

  return fallback;
}
