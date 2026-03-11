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

    let cancelled = false;

    const checkPermission = async () => {
      // Try navigator.permissions.query first (Chrome, Firefox, etc.)
      if (navigator.permissions?.query) {
        try {
          const result = await navigator.permissions.query({ name: "microphone" as PermissionName });
          if (cancelled) return;

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
          return; // permissions.query worked, no need for fallback
        } catch {
          // permissions.query not supported for microphone — fall through to fallback
        }
      }

      // Fallback for iOS Safari: try a quick getUserMedia probe
      // This will NOT show a permission prompt if already granted,
      // but WILL show a prompt if not yet granted — so we only use it
      // if the browser doesn't support permissions.query
      if (navigator.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          if (cancelled) {
            stream.getTracks().forEach((track) => track.stop());
            return;
          }
          // If we got here without a prompt, permission was already granted
          stream.getTracks().forEach((track) => track.stop());
          setStatus("granted");
        } catch {
          // getUserMedia failed — could be denied or user dismissed
          // Stay "idle" to show the permission UI (don't set "denied" since
          // on iOS Safari the first getUserMedia call IS the permission prompt)
        }
      }
    };

    checkPermission();

    return () => {
      cancelled = true;
    };
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
