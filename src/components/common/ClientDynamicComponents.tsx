"use client";

import { OwlCompanion } from "@/components/common/OwlCompanion";
import { PaywallListener } from "@/features/paywall/PaywallListener";
import { PlayTimerListener } from "@/features/parental/PlayTimerListener";
import { InstallPrompt } from "@/components/common/InstallPrompt";

export function ClientDynamicComponents() {
  return (
    <>
      <OwlCompanion />
      <PaywallListener />
      <PlayTimerListener />
      <InstallPrompt />
    </>
  );
}
