import { useState, useEffect, useCallback } from "react";

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
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSupported(true);

      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);

        // Try to find a voice that matches the default language
        const defaultVoice = availableVoices.find((v) => v.lang.toLowerCase().startsWith(defaultLang.toLowerCase()));
        // If no specific language match, fall back to the first available or keep current if valid
        if (defaultVoice) {
          setSelectedVoice(defaultVoice);
        } else if (availableVoices.length > 0 && !selectedVoice) {
          setSelectedVoice(availableVoices[0]);
        }
      };

      loadVoices();

      // Chrome loads voices asynchronously
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, [defaultLang, selectedVoice]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported) {
        console.warn("Text-to-speech not supported");
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Optional: tweak rate/pitch if needed for Vietnamese
      // utterance.rate = 0.9;

      window.speechSynthesis.speak(utterance);
    },
    [isSupported, selectedVoice],
  );

  return {
    speak,
    voices,
    selectedVoice,
    setSelectedVoice,
    isSupported,
  };
};
