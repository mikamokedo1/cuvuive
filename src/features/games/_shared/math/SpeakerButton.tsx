"use client";

import Image from "next/image";
import { LoudSpeaker } from "@/libs/constants/game-assets";

interface SpeakerButtonProps {
  onSpeak: () => void;
}

export function SpeakerButton({ onSpeak }: SpeakerButtonProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <button onClick={onSpeak} className="cursor-pointer hover:scale-105 transition-all">
        <Image width={48} height={40} src={LoudSpeaker} alt="Speaker" className="w-12 h-10" />
      </button>
    </div>
  );
}
