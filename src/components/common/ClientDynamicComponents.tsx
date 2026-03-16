"use client";

import dynamic from "next/dynamic";

// Lazy-load client components that are not critical for initial render
// Reduces initial JS bundle by ~60KB+ (framer-motion, paywall, install prompt)
const OwlCompanion = dynamic(
  () => import("@/components/common/OwlCompanion").then((m) => m.OwlCompanion),
  { ssr: false },
);
const PaywallListener = dynamic(
  () => import("@/features/paywall/PaywallListener").then((m) => m.PaywallListener),
  { ssr: false },
);
const PlayTimerListener = dynamic(
  () => import("@/features/parental/PlayTimerListener").then((m) => m.PlayTimerListener),
  { ssr: false },
);
const InstallPrompt = dynamic(
  () => import("@/components/common/InstallPrompt").then((m) => m.InstallPrompt),
  { ssr: false },
);

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
