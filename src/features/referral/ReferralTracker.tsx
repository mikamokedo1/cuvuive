"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@/context/UserContext";
import { recordReferralSignup } from "@/libs/actions/referral";

const REFERRAL_STORAGE_KEY = "referral_code";

/**
 * Tracks referral codes from URL params and records them when user signs up.
 * Uses window.location instead of useSearchParams to avoid Suspense boundary requirement.
 */
export function ReferralTracker() {
  const { user } = useUser();
  const hasRecorded = useRef(false);

  // Save referral code from URL to localStorage (runs once on mount)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const refCode = params.get("ref");
      if (refCode) {
        localStorage.setItem(REFERRAL_STORAGE_KEY, refCode.toUpperCase());
      }
    } catch {
      // Ignore errors (e.g., SSR)
    }
  }, []);

  // When user logs in, check for saved referral code and record it
  useEffect(() => {
    if (!user || hasRecorded.current) return;

    const savedCode = localStorage.getItem(REFERRAL_STORAGE_KEY);
    if (!savedCode) return;

    hasRecorded.current = true;

    recordReferralSignup(savedCode).then((result) => {
      if (result.success) {
        localStorage.removeItem(REFERRAL_STORAGE_KEY);
      } else if (
        result.error === "already_referred" ||
        result.error === "self_referral" ||
        result.error === "invalid_code"
      ) {
        // Don't retry for permanent errors
        localStorage.removeItem(REFERRAL_STORAGE_KEY);
      }
      // For other errors (server_error), keep the code in localStorage for retry
    });
  }, [user]);

  return null;
}
