"use client";

import dynamic from "next/dynamic";

const TopProgressBar = dynamic(() => import("@/components/common/TopProgressBar"), {
  ssr: false,
});

const MissingInfoListener = dynamic(
  () => import("@/features/auth/MissingInfoListener").then((mod) => mod.MissingInfoListener),
  { ssr: false },
);

const ReferralTracker = dynamic(
  () => import("@/features/referral/ReferralTracker").then((mod) => mod.ReferralTracker),
  { ssr: false },
);

const PaywallListener = dynamic(
  () => import("@/features/paywall/PaywallListener").then((mod) => mod.PaywallListener),
  { ssr: false },
);

const ClientDynamicComponents = dynamic(
  () => import("@/components/common/ClientDynamicComponents").then((mod) => mod.ClientDynamicComponents),
  { ssr: false },
);

const SessionTrackerListener = dynamic(
  () => import("@/features/parent-dashboard/SessionTrackerListener").then((mod) => mod.SessionTrackerListener),
  { ssr: false },
);

const RouteChangeAudioCleanup = dynamic(
  () => import("@/components/common/RouteChangeAudioCleanup").then((mod) => mod.RouteChangeAudioCleanup),
  { ssr: false },
);

export function AppProviders() {
  return (
    <>
      <TopProgressBar />
      <MissingInfoListener />
      <ReferralTracker />
      <PaywallListener />
      <ClientDynamicComponents />
      <SessionTrackerListener />
      <RouteChangeAudioCleanup />
    </>
  );
}
