"use client";

import { useAccess } from "@/context/AccessContext";
import { PaywallModal } from "./PaywallModal";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export function PaywallListener() {
  const { paywallState, hidePaywall } = useAccess();

  // Handle redirect after OAuth return (Google/Facebook)
  useAuthRedirect();

  return <PaywallModal isOpen={paywallState.isOpen} type={paywallState.type} onClose={hidePaywall} />;
}
