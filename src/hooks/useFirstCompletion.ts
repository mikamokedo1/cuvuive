"use client";

import { useState, useCallback } from "react";

const STORAGE_PREFIX = "cuthongminh_shared_";

/**
 * Hook to track whether the share modal has been shown for a specific game.
 * Uses localStorage so the modal only appears once per game, even across sessions.
 */
export function useFirstCompletion(gameSlug: string) {
  const storageKey = `${STORAGE_PREFIX}${gameSlug}`;

  const [hasShownShareModal] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(storageKey) === "true";
    } catch {
      return false;
    }
  });

  const markShareModalShown = useCallback(() => {
    try {
      localStorage.setItem(storageKey, "true");
    } catch {
      // localStorage may be unavailable in some contexts
    }
  }, [storageKey]);

  return { hasShownShareModal, markShareModalShown };
}
