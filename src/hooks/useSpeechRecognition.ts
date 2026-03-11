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
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition?: {
      new (): SpeechRecognition;
    };
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
  const retryCountRef = useRef(0);
  const isUserStoppedRef = useRef(false);
  const startListeningRef = useRef<(() => void) | null>(null);

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

  const startListening = useCallback(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
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

    // Create a fresh instance each time (iOS Safari requires this)
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = langRef.current;

    setError(null);
    setTranscript("");
    setInterimTranscript("");
    gotResultRef.current = false;
    isUserStoppedRef.current = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    // Track if audio actually started (iOS Safari specific)
    recognition.onaudiostart = () => {
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
      console.error("Speech recognition error:", event.error);
      // "no-speech" is not a real error, just means the user didn't say anything
      // "aborted" happens when we intentionally abort, also not a real error
      if (event.error !== "no-speech" && event.error !== "aborted") {
        setError(event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);

      // iOS Safari workaround: if recognition ended without results
      // and user didn't manually stop, retry once automatically
      if (!gotResultRef.current && !isUserStoppedRef.current && retryCountRef.current < 1) {
        retryCountRef.current += 1;
        // Small delay before retry to let iOS Safari settle
        setTimeout(() => {
          if (startListeningRef.current) {
            startListeningRef.current();
          }
        }, 300);
      } else {
        retryCountRef.current = 0;
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      setIsListening(false);
    }
  }, []);

  // Keep ref in sync so onend callback can call startListening
  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  const stopListening = useCallback(() => {
    isUserStoppedRef.current = true;
    retryCountRef.current = 0;
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
