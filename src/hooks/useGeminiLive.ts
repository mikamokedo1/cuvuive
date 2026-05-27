"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useAudioCapture } from "./useAudioCapture";
import { useAudioPlayback } from "./useAudioPlayback";

export type GeminiLiveStatus = "idle" | "connecting" | "live" | "error";

interface TranscriptEntry {
  role: "user" | "model";
  text: string;
}

interface UseGeminiLiveOptions {
  /** Relay server WebSocket URL (default: ws://localhost:8081) */
  relayUrl?: string;
  /** Gemini voice name */
  voice?: string;
  /** System instructions for the AI */
  instructions?: string;
}

interface UseGeminiLiveReturn {
  status: GeminiLiveStatus;
  transcript: TranscriptEntry[];
  micLevel: number;
  speakerLevel: number;
  isAiSpeaking: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  sendText: (text: string) => void;
}

/**
 * Orchestration hook that manages the full voice chat lifecycle:
 * WebSocket connection, mic capture, audio playback, and transcript.
 */
export function useGeminiLive(options: UseGeminiLiveOptions = {}): UseGeminiLiveReturn {
  const {
    relayUrl = "ws://localhost:8081",
    voice = "Skye",
    instructions = "",
  } = options;

  const [status, setStatus] = useState<GeminiLiveStatus>("idle");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const statusRef = useRef<GeminiLiveStatus>("idle");

  const { isCapturing, micLevel, startCapture, stopCapture } = useAudioCapture();
  const {
    speakerLevel,
    isPlaying: isAiSpeaking,
    initPlayback,
    playPcm16,
    stopPlayback,
    dispose: disposePlayback,
  } = useAudioPlayback();

  // Keep status ref in sync
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  // Append to transcript, merging consecutive same-role entries
  const appendTranscript = useCallback(
    (role: "user" | "model", text: string) => {
      if (!text.trim()) return;
      setTranscript((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.role === role) {
          return [
            ...prev.slice(0, -1),
            { role, text: `${last.text} ${text}`.replace(/\s+/g, " ").trim() },
          ];
        }
        return [...prev, { role, text: text.trim() }];
      });
    },
    [],
  );

  // End current model turn (break merge)
  const endModelTurn = useCallback(() => {
    setTranscript((prev) => [...prev]); // force new array identity
  }, []);

  // Handle Gemini messages
  const handleGeminiMessage = useCallback(
    (message: any) => {
      const sc = message.serverContent;
      if (!sc) return;

      // Input transcription (what user said)
      if (sc.inputTranscription?.text?.trim()) {
        appendTranscript("user", sc.inputTranscription.text.trim());
      }

      // Output transcription (what AI said)
      if (sc.outputTranscription?.text?.trim()) {
        appendTranscript("model", sc.outputTranscription.text.trim());
      }

      // Model turn parts (audio + text)
      for (const part of sc.modelTurn?.parts || []) {
        if (part.thought) continue;
        if (part.text?.trim()) {
          appendTranscript("model", part.text.trim());
        }
        if (part.inlineData?.data) {
          playPcm16(part.inlineData.data, 24000);
        }
      }

      // Barge-in: user interrupted AI
      if (sc.interrupted) {
        stopPlayback();
      }

      // Turn complete
      if (sc.generationComplete || sc.turnComplete) {
        endModelTurn();
      }
    },
    [appendTranscript, endModelTurn, playPcm16, stopPlayback],
  );

  // Send JSON to relay
  const sendToRelay = useCallback((data: Record<string, unknown>) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  // ── Connect ──
  const connect = useCallback(async () => {
    if (statusRef.current !== "idle") return;
    setStatus("connecting");
    setTranscript([]);

    // Initialize audio playback (needs user gesture)
    initPlayback();

    try {
      const ws = new WebSocket(relayUrl);
      wsRef.current = ws;

      await new Promise<void>((resolve, reject) => {
        ws.onopen = () => {
          // Send start message with voice + instructions
          ws.send(
            JSON.stringify({
              type: "start",
              voiceName: voice,
              instructions,
            }),
          );
        };

        ws.onmessage = (event) => {
          let msg: any;
          try {
            msg = JSON.parse(event.data as string);
          } catch {
            return;
          }

          if (msg.type === "server.ready") {
            setStatus("live");
            resolve();

            // Start mic capture after session is ready
            startCapture((base64) => {
              sendToRelay({
                type: "audio",
                audio: { data: base64, mimeType: "audio/pcm;rate=16000" },
              });
            }).catch(console.error);

            return;
          }

          if (msg.type === "server.error") {
            console.error("Relay error:", msg.message);
            return;
          }

          if (msg.type === "server.status") {
            // Could show status in UI
            return;
          }

          if (msg.type === "server.closed") {
            setStatus("idle");
            return;
          }

          if (msg.type === "gemini.message") {
            handleGeminiMessage(msg.message);
          }
        };

        ws.onerror = () => {
          reject(new Error("WebSocket connection failed"));
        };

        ws.onclose = () => {
          if (statusRef.current !== "idle") {
            setStatus("idle");
            stopCapture();
            stopPlayback();
          }
        };

        // Timeout after 15 seconds
        setTimeout(() => reject(new Error("Connection timeout")), 15000);
      });
    } catch (err) {
      console.error("Connect failed:", err);
      setStatus("error");
      stopCapture();
      disposePlayback();
    }
  }, [
    relayUrl,
    voice,
    instructions,
    initPlayback,
    startCapture,
    stopCapture,
    stopPlayback,
    disposePlayback,
    sendToRelay,
    handleGeminiMessage,
  ]);

  // ── Disconnect ──
  const disconnect = useCallback(() => {
    sendToRelay({ type: "close" });
    wsRef.current?.close(1000, "client_stop");
    wsRef.current = null;
    stopCapture();
    disposePlayback();
    setStatus("idle");
  }, [sendToRelay, stopCapture, disposePlayback]);

  // ── Send text message ──
  const sendText = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      appendTranscript("user", text);
      sendToRelay({ type: "text", text });
    },
    [sendToRelay, appendTranscript],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      wsRef.current?.close();
      stopCapture();
      disposePlayback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    status,
    transcript,
    micLevel,
    speakerLevel,
    isAiSpeaking,
    connect,
    disconnect,
    sendText,
  };
}
