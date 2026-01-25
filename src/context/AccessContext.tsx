"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useUser } from "./UserContext";
import { checkLessonAccess, AccessCheckResult, AccessReason } from "@/libs/actions/access";

type PaywallType = "login" | "premium";

interface AccessContextType {
  isPremium: boolean;
  isLoggedIn: boolean;
  checkAccess: (courseId: string, groupId: string, lessonId: string) => Promise<AccessCheckResult>;
  showPaywall: (type: PaywallType, redirectUrl?: string) => void;
  hidePaywall: () => void;
  paywallState: { isOpen: boolean; type: PaywallType | null; redirectUrl: string | null };
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

export function AccessProvider({ children }: { children: ReactNode }) {
  const { user, isPremium } = useUser();
  const [paywallState, setPaywallState] = useState<{
    isOpen: boolean;
    type: PaywallType | null;
    redirectUrl: string | null;
  }>({
    isOpen: false,
    type: null,
    redirectUrl: null,
  });

  const isLoggedIn = !!user;

  const checkAccess = useCallback(
    async (courseId: string, groupId: string, lessonId: string): Promise<AccessCheckResult> => {
      return await checkLessonAccess(courseId, groupId, lessonId);
    },
    [],
  );

  const showPaywall = useCallback((type: PaywallType, redirectUrl?: string) => {
    setPaywallState({ isOpen: true, type, redirectUrl: redirectUrl || null });
  }, []);

  const hidePaywall = useCallback(() => {
    setPaywallState({ isOpen: false, type: null, redirectUrl: null });
  }, []);

  return (
    <AccessContext.Provider
      value={{
        isPremium,
        isLoggedIn,
        checkAccess,
        showPaywall,
        hidePaywall,
        paywallState,
      }}
    >
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (!context) {
    throw new Error("useAccess must be used within an AccessProvider");
  }
  return context;
}
