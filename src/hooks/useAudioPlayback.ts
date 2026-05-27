"use client";

import { useCallback, useRef, useState } from "react";
import { base64ToBytes } from "@/libs/utils/audioUtils";

interface UseAudioPlaybackReturn {
  /** Current speaker output level (0-1) */
  speakerLevel: number;
  /** Whether audio is currently playing */
  isPlaying: boolean;
  /** Initialize the output AudioContext (call once on user gesture) */
  initPlayback: () => void;
  /** Play a base64-encoded PCM16 chunk (24kHz by default) */
  playPcm16: (base64: string, sampleRate?: number) => void;
  /** Stop all active playback immediately (barge-in) */
  stopPlayback: () => void;
  /** Clean up resources */
  dispose: () => void;
}

/**
 * Hook for gapless playback of PCM16 audio chunks from Gemini.
 * Supports barge-in (immediate stop) and speaker level metering.
 */
export function useAudioPlayback(): UseAudioPlaybackReturn {
  const [speakerLevel, setSpeakerLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const nextTimeRef = useRef(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const initPlayback = useCallback(() => {
    if (ctxRef.current) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: 24000,
    });
    ctx.resume();
    ctxRef.current = ctx;
  }, []);

  const stopPlayback = useCallback(() => {
    activeSourcesRef.current.forEach((src) => {
      try {
        src.onended = null;
        src.stop();
      } catch {
        /* noop */
      }
    });
    activeSourcesRef.current.clear();
    nextTimeRef.current = 0;
    setSpeakerLevel(0);
    setIsPlaying(false);
  }, []);

  const playPcm16 = useCallback(
    (base64: string, sampleRate: number = 24000) => {
      const ctx = ctxRef.current;
      if (!ctx || ctx.state !== "running") return;

      // Skip if page is hidden to prevent audio queue buildup
      if (typeof document !== "undefined" && document.hidden) {
        nextTimeRef.current = 0;
        return;
      }

      const bytes = base64ToBytes(base64);
      if (!bytes.byteLength) return;

      const samples = new Int16Array(
        bytes.buffer,
        bytes.byteOffset,
        Math.floor(bytes.byteLength / 2),
      );
      const buffer = ctx.createBuffer(1, samples.length, sampleRate);
      const channel = buffer.getChannelData(0);
      let energy = 0;

      for (let i = 0; i < samples.length; i++) {
        const value = samples[i] / 32768;
        channel[i] = value;
        energy += value * value;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);

      const now = ctx.currentTime;
      if (nextTimeRef.current < now - 0.5) {
        nextTimeRef.current = now;
      }
      const startAt = Math.max(now, nextTimeRef.current);
      source.start(startAt);
      nextTimeRef.current = startAt + buffer.duration;

      activeSourcesRef.current.add(source);
      setIsPlaying(true);

      // Update speaker level
      const rms = Math.sqrt(energy / Math.max(1, samples.length));
      const level = Math.min(1, rms * 5);
      setSpeakerLevel(level);

      source.onended = () => {
        activeSourcesRef.current.delete(source);
        if (
          ctx &&
          ctx.currentTime >= nextTimeRef.current - 0.05
        ) {
          setSpeakerLevel(0);
          setIsPlaying(false);
        }
      };
    },
    [],
  );

  const dispose = useCallback(() => {
    stopPlayback();
    ctxRef.current?.close();
    ctxRef.current = null;
  }, [stopPlayback]);

  return {
    speakerLevel,
    isPlaying,
    initPlayback,
    playPcm16,
    stopPlayback,
    dispose,
  };
}
