"use client";

import { useCallback, useRef, useState } from "react";
import { floatToPcm16Base64, estimateLevel } from "@/libs/utils/audioUtils";

interface UseAudioCaptureReturn {
  /** Whether mic is currently capturing */
  isCapturing: boolean;
  /** Current mic input level (0-1) */
  micLevel: number;
  /** Start capturing mic audio; calls onChunk with base64 PCM data */
  startCapture: (onChunk: (base64: string) => void) => Promise<void>;
  /** Stop capturing and release resources */
  stopCapture: () => void;
  /** Mute mic (disable track without releasing it) — prevents echo on mobile */
  muteMic: () => void;
  /** Unmute mic (re-enable track) */
  unmuteMic: () => void;
}

/**
 * Hook that captures microphone audio, downsamples to 16kHz PCM,
 * and delivers base64-encoded chunks via a callback.
 */
export function useAudioCapture(): UseAudioCaptureReturn {
  const [isCapturing, setIsCapturing] = useState(false);
  const [micLevel, setMicLevel] = useState(0);

  const micStreamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const silenceGainRef = useRef<GainNode | null>(null);

  const stopCapture = useCallback(() => {
    processorRef.current?.disconnect();
    silenceGainRef.current?.disconnect();
    sourceRef.current?.disconnect();
    audioCtxRef.current?.close();

    processorRef.current = null;
    silenceGainRef.current = null;
    sourceRef.current = null;
    audioCtxRef.current = null;

    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;

    setIsCapturing(false);
    setMicLevel(0);
  }, []);

  /** Mute mic by disabling track — prevents echo when AI speaks on mobile speakers */
  const muteMic = useCallback(() => {
    micStreamRef.current?.getAudioTracks().forEach((t) => {
      t.enabled = false;
    });
  }, []);

  /** Unmute mic by re-enabling track */
  const unmuteMic = useCallback(() => {
    micStreamRef.current?.getAudioTracks().forEach((t) => {
      t.enabled = true;
    });
  }, []);

  const startCapture = useCallback(
    async (onChunk: (base64: string) => void) => {
      // ── Step 1: Kill competing audio sources (iOS Safari fix) ──
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      // ── Step 2: Check permission state before requesting ──
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const permResult = await navigator.permissions.query({
            name: "microphone" as PermissionName,
          });
          if (permResult.state === "denied") {
            console.error("Microphone permission denied");
            return;
          }
        }
      } catch {
        // permissions.query may not be supported — continue anyway
      }

      // ── Step 3: Request mic with noise/echo settings ──
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
      } catch (err) {
        console.error("Microphone access failed:", err);
        return;
      }

      micStreamRef.current = stream;

      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      await ctx.resume();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      sourceRef.current = source;

      // ScriptProcessor with small buffer for low latency (~21ms at 48kHz)
      const processor = ctx.createScriptProcessor(1024, 1, 1);
      processorRef.current = processor;

      // Silent gain to keep the processing graph alive
      const silenceGain = ctx.createGain();
      silenceGain.gain.value = 0.00001;
      silenceGainRef.current = silenceGain;

      processor.onaudioprocess = (event) => {
        const samples = event.inputBuffer.getChannelData(0);
        const level = estimateLevel(samples);
        setMicLevel(level);

        // Encode and deliver chunk
        const base64 = floatToPcm16Base64(samples, ctx.sampleRate, 16000);
        onChunk(base64);
      };

      source.connect(processor);
      processor.connect(silenceGain);
      silenceGain.connect(ctx.destination);

      setIsCapturing(true);
    },
    [],
  );

  return { isCapturing, micLevel, startCapture, stopCapture, muteMic, unmuteMic };
}
