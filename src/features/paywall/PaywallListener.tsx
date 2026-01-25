"use client";

import { useAccess } from "@/context/AccessContext";
import { PaywallModal } from "./PaywallModal";

export function PaywallListener() {
  const { paywallState, hidePaywall } = useAccess();

  return <PaywallModal isOpen={paywallState.isOpen} type={paywallState.type} onClose={hidePaywall} />;
}
