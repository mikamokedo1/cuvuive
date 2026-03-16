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

      // Fallback for iOS Safari: DON'T call getUserMedia if we'll be using SpeechRecognition.
      // On iOS Safari, getUserMedia (microphone) and SpeechRecognition (dictation) are
      // SEPARATE permissions. Calling getUserMedia first can prevent Safari from showing
      // the SpeechRecognition permission prompt, causing "service-not-allowed" error.
      //
      // If webkitSpeechRecognition is available, skip getUserMedia and let SpeechRecognition
      // handle its own permission flow when the user taps the mic button.
      if ((window as any).webkitSpeechRecognition || (window as any).SpeechRecognition) {
        // SpeechRecognition is available — skip getUserMedia probe.
        // Set "granted" so the permission gate doesn't block the UI.
        // SpeechRecognition.start() will show its own permission prompt if needed.
        setStatus("granted");
        return;
      }

      // Only use getUserMedia probe for browsers WITHOUT SpeechRecognition support
      if (navigator.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          if (cancelled) {
            stream.getTracks().forEach((track) => track.stop());
            return;
          }
          stream.getTracks().forEach((track) => track.stop());
          setStatus("granted");
        } catch {
          // getUserMedia failed — stay "idle"
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
