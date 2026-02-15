"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useUser } from "./UserContext";
import { checkLessonAccess, AccessCheckResult, AccessReason } from "@/libs/actions/access";

const REDIRECT_STORAGE_KEY = "auth_redirect_url";

export function getRedirectUrl(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(REDIRECT_STORAGE_KEY);
}

export function clearRedirectUrl(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
}

function saveRedirectUrl(url: string | null): void {
  if (typeof window === "undefined") return;
  if (url) {
    sessionStorage.setItem(REDIRECT_STORAGE_KEY, url);
  } else {
    sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
  }
}

type PaywallType = "login" | "premium";

interface AccessContextType {
  isPremium: boolean;
  isLoggedIn: boolean;
  checkAccess: (courseId: string, groupId: string, lessonId: string) => Promise<AccessCheckResult>;
  showPaywall: (type: PaywallType, redirectUrl?: string) => void;
  hidePaywall: () => void;
  paywallState: { isOpen: boolean; type: PaywallType | null; redirectUrl: string | null };
  setPaywallState: (state: { isOpen: boolean; type: PaywallType | null; redirectUrl: string | null }) => void;
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
    const url = redirectUrl || null;
    setPaywallState({ isOpen: true, type, redirectUrl: url });
    saveRedirectUrl(url);
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
        setPaywallState,
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
