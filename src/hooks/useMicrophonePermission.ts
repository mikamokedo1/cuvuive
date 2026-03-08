"use client";

import { useState, useCallback } from "react";

type MicPermissionStatus = "idle" | "requesting" | "granted" | "denied";

interface UseMicrophonePermissionReturn {
  status: MicPermissionStatus;
  requestPermission: () => Promise<void>;
}

export function useMicrophonePermission(): UseMicrophonePermissionReturn {
  const [status, setStatus] = useState<MicPermissionStatus>("idle");

  const requestPermission = useCallback(async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setStatus("denied");
      return;
    }

    setStatus("requesting");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Immediately stop the stream — we just needed the permission
      stream.getTracks().forEach((track) => track.stop());
      setStatus("granted");
    } catch (err: unknown) {
      console.error("Microphone permission error:", err);
      setStatus("denied");
    }
  }, []);

  return { status, requestPermission };
}
