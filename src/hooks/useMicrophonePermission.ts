"use client";

import { useState, useCallback, useEffect } from "react";

type MicPermissionStatus = "idle" | "requesting" | "granted" | "denied";

interface UseMicrophonePermissionReturn {
  status: MicPermissionStatus;
  requestPermission: () => Promise<void>;
}

export function useMicrophonePermission(): UseMicrophonePermissionReturn {
  const [status, setStatus] = useState<MicPermissionStatus>("idle");

  // Check existing permission on mount — skip the prompt if already granted
  useEffect(() => {
    if (typeof window === "undefined") return;

    // navigator.permissions.query is not available on all browsers (e.g. older Safari)
    if (navigator.permissions?.query) {
      navigator.permissions
        .query({ name: "microphone" as PermissionName })
        .then((result) => {
          if (result.state === "granted") {
            setStatus("granted");
          } else if (result.state === "denied") {
            setStatus("denied");
          }
          // "prompt" → keep "idle" so the permission UI shows

          // Listen for future changes (e.g. user revokes permission)
          result.addEventListener("change", () => {
            if (result.state === "granted") {
              setStatus("granted");
            } else if (result.state === "denied") {
              setStatus("denied");
            }
          });
        })
        .catch(() => {
          // permissions API not supported — stay "idle"
        });
    }
  }, []);

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
