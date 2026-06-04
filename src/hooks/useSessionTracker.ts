"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

/**
 * Tracks learning session time when the kid is playing a game.
 * - Starts a session when entering a lesson page: /games/[courseId]/[groupId]/lesson/[lessonId]
 * - Ends the session on navigation away, tab close, or idle timeout
 * - Uses navigator.sendBeacon() for reliability on tab close
 * - Pauses when idle for > 2 minutes (no interaction)
 */
export function useSessionTracker() {
  const { user } = useUser();
  const pathname = usePathname();
  const sessionIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  const idleCheckRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);
  const pausedDurationRef = useRef(0); // Accumulated pause time in ms

  // Extract courseId only when specifically on a lesson page: /games/[courseId]/[groupId]/lesson/[lessonId]
  const courseId = useMemo(() => {
    if (!pathname) return null;
    const parts = pathname.split("/");
    if (parts.length === 6 && parts[1] === "games" && parts[4] === "lesson") {
      return parts[2];
    }
    return null;
  }, [pathname]);

  const endSession = useCallback(() => {
    if (!sessionIdRef.current || !startTimeRef.current) return;

    const now = Date.now();
    const totalElapsed = now - startTimeRef.current;
    const activeDuration = Math.max(0, totalElapsed - pausedDurationRef.current);
    const durationSeconds = Math.round(activeDuration / 1000);

    // Use sendBeacon for reliability (works even during page unload)
    const payload = JSON.stringify({
      sessionId: sessionIdRef.current,
      durationSeconds,
    });

    if (navigator.sendBeacon) {
      // sendBeacon only sends POST, so we use a dedicated endpoint
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/learning-sessions/end", blob);
    } else {
      // Fallback: fire-and-forget fetch
      fetch("/api/learning-sessions/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }

    sessionIdRef.current = null;
    startTimeRef.current = null;
    pausedDurationRef.current = 0;
    isPausedRef.current = false;
  }, []);

  const startSession = useCallback(
    async (course: string) => {
      // End any existing session first
      endSession();

      try {
        const res = await fetch("/api/learning-sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId: course }),
        });

        if (res.ok) {
          const data = await res.json();
          sessionIdRef.current = data.sessionId;
          startTimeRef.current = Date.now();
          pausedDurationRef.current = 0;
          isPausedRef.current = false;
          lastActivityRef.current = Date.now();
        }
      } catch (error) {
        console.error("Failed to start learning session:", error);
      }
    },
    [endSession],
  );

  // Track user activity to detect idle
  useEffect(() => {
    const onActivity = () => {
      lastActivityRef.current = Date.now();
      if (isPausedRef.current && startTimeRef.current) {
        // Resume: track how long we were paused
        isPausedRef.current = false;
      }
    };

    const events = ["mousedown", "touchstart", "keydown", "scroll"] as const;
    events.forEach((event) => window.addEventListener(event, onActivity, { passive: true }));

    return () => {
      events.forEach((event) => window.removeEventListener(event, onActivity));
    };
  }, []);

  // Idle detection — pause session after 2 minutes of inactivity
  useEffect(() => {
    if (!courseId || !user) return;

    const IDLE_THRESHOLD = 2 * 60 * 1000; // 2 minutes

    idleCheckRef.current = setInterval(() => {
      if (!sessionIdRef.current || !startTimeRef.current) return;

      const idleTime = Date.now() - lastActivityRef.current;
      if (idleTime >= IDLE_THRESHOLD && !isPausedRef.current) {
        isPausedRef.current = true;
        // Add idle time as paused duration
        pausedDurationRef.current += idleTime;
      }
    }, 30_000); // Check every 30 seconds

    return () => {
      if (idleCheckRef.current) {
        clearInterval(idleCheckRef.current);
        idleCheckRef.current = null;
      }
    };
  }, [courseId, user]);

  // Start/end session based on route changes
  useEffect(() => {
    if (!user) return;

    if (courseId) {
      startSession(courseId);
    } else {
      endSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, user?.id]);

  // End session on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      endSession();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Also end session when hook unmounts (e.g., auth state change)
      endSession();
    };
  }, [endSession]);
}
