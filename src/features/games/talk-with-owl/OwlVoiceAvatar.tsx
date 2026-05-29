"use client";

import Image from "next/image";
import type { GeminiLiveStatus } from "@/hooks/useGeminiLive";

const OWL_IMAGE = "https://assets.cuthongminh.com/assets/own-learning.webp";

interface OwlVoiceAvatarProps {
  speakerLevel: number;
  isSpeaking: boolean;
  isListening: boolean;
  status: GeminiLiveStatus;
}

/**
 * Animated owl avatar for the voice chat page.
 * Bounces when AI is speaking, pulses when listening.
 */
export function OwlVoiceAvatar({
  speakerLevel,
  isSpeaking,
  isListening,
  status,
}: OwlVoiceAvatarProps) {
  // Scale based on speaker volume for lip-sync effect
  const speakScale = isSpeaking ? 1 + speakerLevel * 0.15 : 1;
  const bounce = isSpeaking ? `translateY(${-speakerLevel * 8}px)` : "translateY(0)";

  return (
    <div
      className={`vc-owl ${
        isSpeaking ? "vc-owl-speaking" : isListening ? "vc-owl-listening" : ""
      } ${status === "idle" ? "vc-owl-idle" : ""}`}
    >
      {/* Glow ring */}
      <div
        className="vc-owl-glow"
        style={{
          opacity: isSpeaking ? 0.6 + speakerLevel * 0.4 : isListening ? 0.3 : 0,
          transform: `scale(${isSpeaking ? 1.1 + speakerLevel * 0.2 : 1})`,
        }}
      />

      {/* Listening pulse rings */}
      {isListening && !isSpeaking && (
        <>
          <div className="vc-owl-pulse vc-owl-pulse-1" />
          <div className="vc-owl-pulse vc-owl-pulse-2" />
        </>
      )}

      {/* Owl image */}
      <div
        className="vc-owl-img-wrap"
        style={{
          transform: `${bounce} scale(${speakScale})`,
          transition: isSpeaking ? "transform 100ms ease" : "transform 300ms ease",
        }}
      >
        <Image
          src={OWL_IMAGE}
          alt="Cú Thông Minh"
          width={200}
          height={200}
          className="vc-owl-img"
          priority
          draggable={false}
        />
      </div>

      {/* Speech indicator */}
      {isSpeaking && (
        <div className="vc-owl-speech-dots">
          <span className="vc-dot" />
          <span className="vc-dot" />
          <span className="vc-dot" />
        </div>
      )}
    </div>
  );
}
