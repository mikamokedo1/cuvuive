"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface PlayTimerContextType {
  showChallenge: boolean;
  onChallengeSuccess: () => void;
}

const PlayTimerContext = createContext<PlayTimerContextType | undefined>(undefined);

export const PlayTimerProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const pathname = usePathname();
  const [showChallenge, setShowChallenge] = useState(false);
  const elapsedRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Read the timer limit from user metadata (default 15 minutes, 0 = disabled)
  const timerMinutes = user?.user_metadata?.playTimerMinutes ?? 15;
  const timerLimitSeconds = timerMinutes * 60;
  const isOnGamePage = pathname?.startsWith("/games/") ?? false;
  const isTimerEnabled = timerMinutes > 0 && !!user;

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only tick when on a game page, timer is enabled, and challenge is not showing
    if (isOnGamePage && isTimerEnabled && !showChallenge) {
      intervalRef.current = setInterval(() => {
        elapsedRef.current += 1;
        if (elapsedRef.current >= timerLimitSeconds) {
          setShowChallenge(true);
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isOnGamePage, isTimerEnabled, showChallenge, timerLimitSeconds]);

  const onChallengeSuccess = useCallback(() => {
    elapsedRef.current = 0;
    setShowChallenge(false);
  }, []);

  return (
    <PlayTimerContext.Provider value={{ showChallenge, onChallengeSuccess }}>{children}</PlayTimerContext.Provider>
  );
};

export const usePlayTimer = () => {
  const context = useContext(PlayTimerContext);
  if (!context) {
    throw new Error("usePlayTimer must be used within a PlayTimerProvider");
  }
  return context;
};
