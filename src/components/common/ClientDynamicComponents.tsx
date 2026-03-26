"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const OwlCompanion = dynamic(() => import("@/components/common/OwlCompanion").then((mod) => mod.OwlCompanion));
const PlayTimerListener = dynamic(() => import("@/features/parental/PlayTimerListener").then((mod) => mod.PlayTimerListener));
const InstallPrompt = dynamic(() => import("@/components/common/InstallPrompt").then((mod) => mod.InstallPrompt));

export function ClientDynamicComponents() {
  const [showDeferredUi, setShowDeferredUi] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const revealDeferredUi = () => {
      if (!cancelled) {
        setShowDeferredUi(true);
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(revealDeferredUi, { timeout: 2000 });

      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = setTimeout(revealDeferredUi, 1200);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  if (!showDeferredUi) {
    return null;
  }

  return (
    <>
      <OwlCompanion />
      <PlayTimerListener />
      <InstallPrompt />
    </>
  );
}
