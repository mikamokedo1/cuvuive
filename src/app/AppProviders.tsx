"use client";

import type { ReactNode } from "react";
import { OwlProvider } from "@/context/OwlContext";
import { UserProvider } from "@/context/UserContext";
import { AccessProvider } from "@/context/AccessContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { PlayTimerProvider } from "@/context/PlayTimerContext";
import { MissingInfoListener } from "@/features/auth/MissingInfoListener";
import { ReferralTracker } from "@/features/referral/ReferralTracker";
import TopProgressBar from "@/components/common/TopProgressBar";
import { ClientDynamicComponents } from "@/components/common/ClientDynamicComponents";
import { AutoRecoveryBoundary } from "@/components/common/AutoRecoveryBoundary";
import { Suspense } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AutoRecoveryBoundary>
      <UserProvider>
        <AccessProvider>
          <ProgressProvider>
            <PlayTimerProvider>
              <OwlProvider>
                <TopProgressBar />
                {children}
                <MissingInfoListener />
                <ReferralTracker />
                <Suspense fallback={null}>
                  <ClientDynamicComponents />
                </Suspense>
              </OwlProvider>
            </PlayTimerProvider>
          </ProgressProvider>
        </AccessProvider>
      </UserProvider>
    </AutoRecoveryBoundary>
  );
}
