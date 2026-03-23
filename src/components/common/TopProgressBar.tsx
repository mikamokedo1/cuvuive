"use client";

import { useEffect, useState, useCallback, useRef } from "react";

/**
 * YouTube-style top progress bar for route changes.
 * Intercepts link clicks and monitors URL changes to show loading state.
 */
export default function TopProgressBar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLoading = useCallback(() => {
    setLoading(true);
    setProgress(10);

    // Simulate progress that slows down as it approaches 90%
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const increment = Math.max(1, (90 - prev) * 0.1);
        return Math.min(prev + increment, 90);
      });
    }, 300);
  }, []);

  const completeLoading = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setProgress(100);
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 300);
  }, []);

  useEffect(() => {
    // Store the current URL to detect changes
    let currentUrl = window.location.href;

    // Intercept clicks on links
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Skip external links, hash links, and special protocols
      if (
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank"
      ) {
        return;
      }

      // Check if it's a different route
      const url = new URL(href, window.location.origin);
      if (url.pathname !== window.location.pathname) {
        startLoading();
      }
    };

    // Use MutationObserver + polling to detect when navigation completes
    const checkUrlChange = () => {
      if (window.location.href !== currentUrl) {
        currentUrl = window.location.href;
        completeLoading();
      }
    };

    const pollInterval = setInterval(checkUrlChange, 100);

    // Also listen to popstate (back/forward navigation)
    const handlePopState = () => {
      startLoading();
      // Small delay then complete, as popstate fires when navigation is done
      setTimeout(completeLoading, 200);
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
      clearInterval(pollInterval);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startLoading, completeLoading]);

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 99999,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "#FF9C01",
          transition:
            progress === 100
              ? "width 0.2s ease-out"
              : "width 0.3s ease-in-out",
          boxShadow: "0 0 8px rgba(255, 156, 1, 0.6)",
        }}
      />
    </div>
  );
}
