"use client";

import { useState } from "react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface PianoKeyProps {
    note: string;
    freq: number;
    color: string;
    label: string;
    soundSet?: string;
    animalSound?: string;
    isHighlighted?: boolean;
}

export default function PianoKey({ note, freq, color, label, soundSet = "classic", animalSound, isHighlighted }: PianoKeyProps) {
    const [isActive, setIsActive] = useState(false);
    const { speak } = useTextToSpeech();

    const playSound = () => {
        if (soundSet === "classic") {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

            gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 1);
        } else if (animalSound) {
            speak(animalSound);
        }

        // Visual feedback
        setIsActive(true);
        setTimeout(() => setIsActive(false), 200);
    };

    return (
        <div
            onClick={playSound}
            className={`
        relative w-full h-[280px] sm:h-[350px] rounded-b-2xl cursor-pointer 
        transition-all duration-100 flex flex-col items-center justify-end pb-8
        shadow-[inset_0_-8px_10px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)]
        ${color} 
        ${isActive ? "scale-[0.98] brightness-90 translate-y-1 shadow-inner" : "hover:brightness-105"}
        ${isHighlighted ? "ring-8 ring-white ring-inset animate-pulse z-10 scale-105" : ""}
      `}
        >
            {/* Visual Sparkle on tap */}
            {isActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full animate-ping rounded-b-2xl bg-white opacity-40" />
                </div>
            )}

            <div className="bg-white/30 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full mb-4 z-20">
                <span className="text-white text-xl sm:text-2xl font-black drop-shadow-md select-none">
                    {label}
                </span>
            </div>
            <div className="absolute top-0 left-0 w-full h-8 bg-black/10 rounded-t-sm" />
        </div>
    );
}
