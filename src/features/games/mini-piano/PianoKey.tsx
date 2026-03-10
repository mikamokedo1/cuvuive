"use client";

import { useState } from "react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playNoteSound } from "./utils/audioUtils";

interface PianoKeyProps {
    note: string;
    freq: number;
    color: string;
    label: string;
    soundSet?: string;
    animalSound?: string;
    isHighlighted?: boolean;
    onClick?: (note: string) => void;
}

export default function PianoKey({
    note,
    freq,
    color,
    label,
    soundSet = "classic",
    animalSound,
    isHighlighted,
    onClick
}: PianoKeyProps) {
    const [isActive, setIsActive] = useState(false);
    const { speak } = useTextToSpeech();

    const playSound = () => {
        if (soundSet === "classic") {
            playNoteSound(freq);
        } else if (animalSound) {
            speak(animalSound);
        }

        // Visual feedback
        setIsActive(true);
        setTimeout(() => setIsActive(false), 200);

        // Call parent handler
        if (onClick) onClick(note);
    };

    return (
        <div
            onClick={playSound}
            className={`
        relative flex-1 min-w-0 h-[220px] [@media(min-width:376px)]:h-[280px] sm:h-[350px] rounded-b-2xl cursor-pointer 
        transition-all duration-100 flex flex-col items-center justify-end pb-4 sm:pb-8
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

            <div className="bg-white/30 backdrop-blur-sm w-10 h-10 [@media(min-width:376px)]:w-12 [@media(min-width:376px)]:h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full mb-2 sm:mb-4 z-20 shadow-sm border border-white/20">
                <span className="text-white text-lg [@media(min-width:376px)]:text-xl sm:text-2xl font-black drop-shadow-md select-none leading-none">
                    {label}
                </span>
            </div>
            <div className="absolute top-0 left-0 w-full h-8 bg-black/10 rounded-t-sm" />
        </div>
    );
}
