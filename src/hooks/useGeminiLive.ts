"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useAudioCapture } from "./useAudioCapture";
import { useAudioPlayback } from "./useAudioPlayback";

export type GeminiLiveStatus = "idle" | "connecting" | "live" | "error" | "quota_exceeded";
export type DisconnectReason = "idle_timeout" | "session_expired" | "user" | null;

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
  /** Supabase JWT token for auth + quota tracking */
  token?: string;
  /** Optional greeting prompt sent after connection — triggers AI to speak first */
  greeting?: string;
}

interface UseGeminiLiveReturn {
  status: GeminiLiveStatus;
  transcript: TranscriptEntry[];
  micLevel: number;
  speakerLevel: number;
  isAiSpeaking: boolean;
  disconnectReason: DisconnectReason;
  connect: () => Promise<void>;
  disconnect: (reason?: DisconnectReason) => void;
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
    token,
    greeting,
  } = options;

  const [status, setStatus] = useState<GeminiLiveStatus>("idle");
  const [disconnectReason, setDisconnectReason] = useState<DisconnectReason>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const statusRef = useRef<GeminiLiveStatus>("idle");
  const idleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const disconnectRef = useRef<((reason?: DisconnectReason) => void) | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const IDLE_TIMEOUT_MS = 30_000; // 30 seconds

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
        lastActivityRef.current = Date.now(); // user spoke
      }

      // Output transcription (what AI said)
      if (sc.outputTranscription?.text?.trim()) {
        appendTranscript("model", sc.outputTranscription.text.trim());
        lastActivityRef.current = Date.now(); // AI responded
      }

      // Model turn parts (audio + text)
      for (const part of sc.modelTurn?.parts || []) {
        if (part.thought) continue;
        if (part.text?.trim()) {
          appendTranscript("model", part.text.trim());
          lastActivityRef.current = Date.now();
        }
        if (part.inlineData?.data) {
          playPcm16(part.inlineData.data, 24000);
          lastActivityRef.current = Date.now(); // AI sent audio
        }
      }

      // Barge-in: user interrupted AI
      if (sc.interrupted) {
        stopPlayback();
        lastActivityRef.current = Date.now();
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
    console.log("🔌 [Client] connect() triggered. greeting:", greeting);
    setStatus("connecting");
    setDisconnectReason(null);
    setTranscript([]);

    // Initialize audio playback (needs user gesture)
    initPlayback();

    try {
      const ws = new WebSocket(relayUrl);
      wsRef.current = ws;

      await new Promise<void>((resolve, reject) => {
        ws.onopen = () => {
          // Send start message with voice + instructions + token
          ws.send(
            JSON.stringify({
              type: "start",
              voiceName: voice,
              instructions,
              token: token || undefined,
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
            console.log("🟢 [Client] server.ready received! Status -> live. greeting:", greeting);
            setStatus("live");
            resolve();

            // Start idle check interval — auto disconnect if no activity for 30s
            lastActivityRef.current = Date.now();
            idleTimerRef.current = setInterval(() => {
              const elapsed = Date.now() - lastActivityRef.current;
              if (elapsed >= IDLE_TIMEOUT_MS) {
                console.log(`⏰ Idle ${Math.round(elapsed / 1000)}s — auto disconnecting`);
                disconnectRef.current?.("idle_timeout");
              }
            }, 5_000); // check every 5s

            // Start mic capture after session is ready
            startCapture((base64) => {
              sendToRelay({
                type: "audio",
                audio: { data: base64, mimeType: "audio/pcm;rate=16000" },
              });
            }).catch(console.error);

            // Send greeting prompt with a natural 800ms delay to make AI speak first
            // (Allows Live audio negotiation to settle and feels more lifelike to the child)
            if (greeting) {
              console.log("📤 [Client] Scheduling greeting send in 800ms:", greeting);
              setTimeout(() => {
                console.log("📤 [Client] Sending greeting text to relay:", greeting);
                sendToRelay({ type: "text", text: greeting });
              }, 800);
            } else {
              console.warn("⚠️ [Client] No greeting provided, owl will not speak first.");
            }

            return;
          }

          if (msg.type === "server.error") {
            console.error("Relay error:", msg.message);
            return;
          }

          if (msg.type === "server.status") {
            return;
          }

          if (msg.type === "server.closed") {
            setStatus("idle");
            return;
          }

          if (msg.type === "server.quota_exceeded") {
            console.log("Quota exceeded:", msg);
            setStatus("quota_exceeded");
            stopCapture();
            stopPlayback();
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
    token,
    greeting,
    initPlayback,
    startCapture,
    stopCapture,
    stopPlayback,
    disposePlayback,
    sendToRelay,
    handleGeminiMessage,
  ]);

  // ── Disconnect ──
  const disconnect = useCallback((reason: DisconnectReason = "user") => {
    if (idleTimerRef.current) {
      clearInterval(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    sendToRelay({ type: "close" });
    wsRef.current?.close(1000, "client_stop");
    wsRef.current = null;
    stopCapture();
    disposePlayback();
    setDisconnectReason(reason);
    setStatus("idle");
  }, [sendToRelay, stopCapture, disposePlayback]);

  // Keep disconnect ref in sync for timer callbacks
  useEffect(() => {
    disconnectRef.current = disconnect;
  }, [disconnect]);

  // ── Send text message ──
  const sendText = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      appendTranscript("user", text);
      sendToRelay({ type: "text", text });
    },
    [sendToRelay, appendTranscript],
  );

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
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
    disconnectReason,
    connect,
    disconnect,
    sendText,
  };
}
