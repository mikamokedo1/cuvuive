"use client";

import { useAccess } from "@/context/AccessContext";
import { PaywallModal } from "./PaywallModal";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useUser } from "@/context/UserContext";

export function PaywallListener() {
  const { paywallState, hidePaywall } = useAccess();
  const { isLoading } = useUser();

  // Handle redirect after OAuth return (Google/Facebook)
  useAuthRedirect();

  return !isLoading && <PaywallModal isOpen={paywallState.isOpen} type={paywallState.type} onClose={hidePaywall} />;
}
