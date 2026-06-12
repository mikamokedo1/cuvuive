"use client";

import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { AccessProvider } from "./AccessContext";
import { ProgressProvider } from "./ProgressContext";
import { PlayTimerProvider } from "./PlayTimerContext";
import { OwlProvider } from "./OwlContext";

/**
 * Consolidated client providers for the app.
 *
 * All 5 context providers are combined into a single wrapper to:
 * 1. Make the dependency order explicit and easy to reason about
 * 2. Reduce nesting in layout.tsx
 * 3. Create a single client boundary (instead of 5 separate ones)
 *
 * Order matters: UserProvider must be outermost because
 * AccessProvider, ProgressProvider, and PlayTimerProvider all depend on it.
 *
 * Note: React Compiler (enabled in next.config.ts) handles memoization
 * automatically — no need for manual useMemo wrappers.
 */
export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <AccessProvider>
        <ProgressProvider>
          <PlayTimerProvider>
            <OwlProvider>{children}</OwlProvider>
          </PlayTimerProvider>
        </ProgressProvider>
      </AccessProvider>
    </UserProvider>
  );
}
