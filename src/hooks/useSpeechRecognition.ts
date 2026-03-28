"use client";

import { useState, useCallback, useRef, useEffect } from "react";

// Add types for SpeechRecognition since they aren't built-in
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition?: {
      new (): SpeechRecognition;
    };
    __audioContext?: AudioContext | null;
  }
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export function useSpeechRecognition(lang: string = "vi-VN"): UseSpeechRecognitionReturn {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const langRef = useRef(lang);
  const gotResultRef = useRef(false);
  const isUserStoppedRef = useRef(false);
  const startPendingRef = useRef(false);

  // Keep lang ref in sync
  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  // Check support on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      startPendingRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore error on unmount
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  // Helper: detect Safari (including iOS Safari / WebKit-based browsers)
  const isSafari = useCallback(() => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
    return /Safari/.test(ua) && !/Chrome/.test(ua) && !/CriOS/.test(ua);
  }, []);

  const startListening = useCallback(async () => {
    if (typeof window === "undefined") return;

    // Guard: prevent overlapping start attempts
    if (startPendingRef.current) return;
    startPendingRef.current = true;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      startPendingRef.current = false;
      setIsSupported(false);
      return;
    }

    // Abort any existing instance first (critical for iOS Safari)
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }

    const safari = isSafari();

    // ── Step 1: Kill all competing audio sources ──
    // iOS Safari has exclusive audio session: only ONE of TTS / AudioContext /
    // SpeechRecognition can hold the audio hardware at a time.

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    // Close AudioContext entirely (not just suspend) so iOS fully releases the
    // audio session. playSound.ts will lazily recreate it when needed.
    const ctx = window.__audioContext;
    if (ctx && ctx.state !== "closed") {
      try {
        await ctx.close();
      } catch {
        // ignore
      }
      window.__audioContext = null;
    }

    // ── Step 2: Force iOS to switch audio session to recording mode ──
    // On iOS Safari, after TTS or AudioContext playback, the audio session stays
    // in "playback" mode. webkitSpeechRecognition.start() does NOT switch it to
    // "record" mode automatically. Requesting getUserMedia forces the OS to
    // switch, making the microphone available for SpeechRecognition.
    if (safari) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Brief pause to let iOS complete the audio session switch
        await new Promise((resolve) => setTimeout(resolve, 300));
        // Release the stream — the audio session stays in recording mode
        stream.getTracks().forEach((track) => track.stop());
      } catch (e) {
        console.warn("getUserMedia warmup failed:", e);
        // Continue anyway — SpeechRecognition might still work
      }
    }

    // ── Step 3: Create and start a fresh SpeechRecognition instance ──
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = langRef.current;

    setError(null);
    setTranscript("");
    setInterimTranscript("");
    gotResultRef.current = false;
    isUserStoppedRef.current = false;

    // Safety timeout: if onstart never fires within 3 seconds, reset state
    const startTimeout = setTimeout(() => {
      if (!gotResultRef.current && recognitionRef.current === recognition) {
        console.warn("Speech recognition: onstart never fired, resetting");
        setIsListening(false);
        startPendingRef.current = false;
        try {
          recognition.abort();
        } catch {
          // ignore
        }
      }
    }, 3000);

    recognition.onstart = () => {
      clearTimeout(startTimeout);
      startPendingRef.current = false;
      setIsListening(true);
      setError(null);
    };

    recognition.onaudiostart = () => {
      clearTimeout(startTimeout);
      gotResultRef.current = false; // reset, audio is flowing
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      gotResultRef.current = true;
      let finalSpeech = "";
      let interimSpeech = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalSpeech += event.results[i][0].transcript;
        } else {
          interimSpeech += event.results[i][0].transcript;
        }
      }

      setInterimTranscript(interimSpeech);
      if (finalSpeech) {
        setTranscript((prev) => (prev ? prev + " " + finalSpeech : finalSpeech));
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      clearTimeout(startTimeout);
      startPendingRef.current = false;
      console.error("Speech recognition error:", event.error, event.message);
      if (event.error !== "no-speech" && event.error !== "aborted") {
        setError(event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      clearTimeout(startTimeout);
      startPendingRef.current = false;
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (e) {
      clearTimeout(startTimeout);
      startPendingRef.current = false;
      console.error("Failed to start speech recognition:", e);
      setIsListening(false);
    }
  }, [isSafari]);

  const stopListening = useCallback(() => {
    isUserStoppedRef.current = true;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
}
