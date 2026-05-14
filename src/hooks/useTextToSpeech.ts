"use client";
import { useState, useEffect, useCallback, useRef } from "react";

interface UseTextToSpeechReturn {
  speak: (text: string) => void;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
  isSupported: boolean;
}

export const useTextToSpeech = (defaultLang: string = "vi"): UseTextToSpeechReturn => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  // Keep refs to avoid stale closures in the useCallback
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const defaultLangRef = useRef(defaultLang);
  const speakTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selectedVoice) {
      selectedVoiceRef.current = selectedVoice;
    }
  }, [selectedVoice]);

  useEffect(() => {
    defaultLangRef.current = defaultLang;
  }, [defaultLang]);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSupported(true);

      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length === 0) return;

        setVoices(availableVoices);

        // Try to find a voice that matches the default language
        const langLower = defaultLang.toLowerCase();

        // Priority 1: Match language and prefer Google/Premium/Natural voices
        const premiumVoice = availableVoices.find(
          (v) =>
            v.lang.toLowerCase().startsWith(langLower) &&
            (v.name.includes("Google") || v.name.includes("Premium") || v.name.includes("Natural")),
        );

        // Priority 2: Any matching language voice
        const fallbackVoice = availableVoices.find((v) => v.lang.toLowerCase().startsWith(langLower));

        const defaultVoice = premiumVoice || fallbackVoice;
        // If no specific language match, fall back to the first available or keep current if valid
        if (defaultVoice) {
          setSelectedVoice((prev) => (prev?.name === defaultVoice.name ? prev : defaultVoice));
        } else if (availableVoices.length > 0) {
          setSelectedVoice((prev) => prev || availableVoices[0]);
        }
      };

      loadVoices();

      // Chrome loads voices asynchronously
      if (typeof window.speechSynthesis.addEventListener === "function") {
        window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
      } else {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }

      return () => {
        if (typeof window.speechSynthesis.removeEventListener === "function") {
          window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
        } else {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, [defaultLang]);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Text-to-speech not supported");
      return;
    }

    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
    }

    // Cancel any ongoing speech immediately
    window.speechSynthesis.cancel();

    // Chrome bug workaround: after cancel(), we need a sufficient delay before
    // calling speak() again. Without this, Chrome creates a "silent" utterance
    // where the speaker icon shows but no audio is produced.
    speakTimeoutRef.current = setTimeout(() => {
      // Double-check: cancel again and resume if paused (belt-and-suspenders)
      window.speechSynthesis.cancel();

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);

      // Explicitly set language so Safari doesn't fallback to English
      utterance.lang = defaultLangRef.current === "vi" ? "vi-VN" : defaultLangRef.current;

      if (selectedVoiceRef.current) {
        utterance.voice = selectedVoiceRef.current;
        utterance.lang = selectedVoiceRef.current.lang; // Use exact language of the chosen voice
      }

      // Chrome bug workaround: Chrome stops speaking after ~15 seconds for
      // long utterances. We use a keep-alive interval that calls pause/resume
      // periodically to prevent this.
      let keepAlive: ReturnType<typeof setInterval> | null = null;

      utterance.onstart = () => {
        keepAlive = setInterval(() => {
          if (!window.speechSynthesis.speaking) {
            if (keepAlive) clearInterval(keepAlive);
            return;
          }
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }, 10000);
      };

      const cleanup = () => {
        if (keepAlive) {
          clearInterval(keepAlive);
          keepAlive = null;
        }
      };

      utterance.onend = cleanup;
      utterance.onerror = (e) => {
        cleanup();
        // Chrome sometimes fires 'interrupted' when cancel() is called —
        // this is expected and not a real error.
        if (e.error !== "interrupted" && e.error !== "canceled") {
          console.warn("SpeechSynthesis error:", e.error);
        }
      };

      window.speechSynthesis.speak(utterance);
    }, 150); // 150ms delay — enough for Chrome to fully clean up after cancel()
  }, []);

  return {
    speak,
    voices,
    selectedVoice,
    setSelectedVoice,
    isSupported,
  };
};
