/**
 * useRoadmapBack
 *
 * Reads the `#from=` hash fragment (set by RoadmapView when navigating to a game)
 * and returns the correct "back" URL.
 *
 * Uses hash fragments instead of query params so Google doesn't treat each
 * roadmap referral as a separate URL (preventing duplicate content issues).
 *
 * Examples:
 *   /games/learn-alphabet#from=lo-trinh/tien-lop-1  → back = /lo-trinh/tien-lop-1
 *   /games/learn-alphabet                            → back = /games
 */
"use client";

import { useEffect, useState } from "react";

const ROADMAP_PREFIX = "lo-trinh/";

export function useRoadmapBack(fallback: string = "/games"): string {
  const [backUrl, setBackUrl] = useState(fallback);

  useEffect(() => {
    const hash = window.location.hash; // e.g. "#from=lo-trinh/tien-lop-1"
    if (hash.startsWith("#from=")) {
      const from = decodeURIComponent(hash.slice("#from=".length));
      if (from.startsWith(ROADMAP_PREFIX)) {
        setBackUrl(`/${from}`);
      }
    }
  }, []);

  return backUrl;
}
