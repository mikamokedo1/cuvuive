"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { getRedirectUrl, clearRedirectUrl } from "@/context/AccessContext";

/**
 * Hook that handles redirect after OAuth login return.
 * When a user returns from social OAuth (Google/Facebook), the React context is lost.
 * This hook checks sessionStorage for a pending redirect URL and navigates there
 * once the user is authenticated.
 *
 * Should be used in the main app layout (e.g., inside PaywallListener or a dedicated component).
 */
export function useAuthRedirect() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (isLoading || hasRedirected.current) return;

    if (user) {
      const redirectUrl = getRedirectUrl();
      if (redirectUrl) {
        hasRedirected.current = true;
        clearRedirectUrl();
        router.replace(redirectUrl);
      }
    }
  }, [user, isLoading, router]);
}
