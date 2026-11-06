"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useAudioCapture } from "./useAudioCapture";
import { useAudioPlayback } from "./useAudioPlayback";

export type GeminiLiveStatus = "idle" | "connecting" | "live" | "error" | "quota_exceeded";
export type DisconnectReason = "idle_timeout" | "session_expired" | "user" | null;

/**
 * The lesson to run. The relay builds the prompt and the greeting from it (server/voice-relay.ts):
 * pages never send prompts, so the relay cannot be used as a free general-purpose chatbot.
 */
export type GeminiLesson =
  | { kind: "talk-with-owl"; groupId: string; lessonId: string }
  | { kind: "letter-practice"; groupId: string; startIndex?: number };

/** Predefined prompts a page may trigger mid-lesson */
export type GeminiCue = { cue: "nudge" } | { cue: "manual_next"; nextIndex: number };

export interface GeminiToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
}

interface TranscriptEntry {
  role: "user" | "model";
  text: string;
}

interface UseGeminiLiveOptions {
  /** Relay server WebSocket URL (default: ws://localhost:8081) */
  relayUrl?: string;
  /** Gemini voice name */
  voice?: string;
  /** Lesson to run; the relay derives prompt, greeting, tools and free-quota bucket from it */
  lesson: GeminiLesson;
  /** Supabase JWT token for auth + quota tracking */
  token?: string;
  /** Called for every function call the AI makes. Answer it with sendToolResponse. */
  onToolCall?: (call: GeminiToolCall) => void;
  /** Push-to-talk: audio is only sent between startTalking() and stopTalking(). */
  pushToTalk?: boolean;
  /** Disconnect after this long without activity (default 30s). */
  idleTimeoutMs?: number;
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
  /** Trigger a predefined prompt (the relay ignores free text) */
  sendCue: (cue: GeminiCue) => void;
  /** Answer a function call from onToolCall */
  sendToolResponse: (id: string, name: string, response: Record<string, unknown>) => void;
  /** Push-to-talk only: begin / end the child's turn */
  startTalking: () => void;
  stopTalking: () => void;
  isTalking: boolean;
  /** True when the microphone could not be opened */
  micError: boolean;
}

/**
 * Orchestration hook that manages the full voice chat lifecycle:
 * WebSocket connection, mic capture, audio playback, and transcript.
 */
export function useGeminiLive(options: UseGeminiLiveOptions): UseGeminiLiveReturn {
  const {
    relayUrl = "ws://localhost:8081",
    voice = "Skye",
    lesson,
    token,
    onToolCall,
    pushToTalk = false,
    idleTimeoutMs = 30_000,
  } = options;

  const [status, setStatus] = useState<GeminiLiveStatus>("idle");
  const [disconnectReason, setDisconnectReason] = useState<DisconnectReason>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const statusRef = useRef<GeminiLiveStatus>("idle");
  const idleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const disconnectRef = useRef<((reason?: DisconnectReason) => void) | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const IDLE_TIMEOUT_MS = idleTimeoutMs;
  const [isTalking, setIsTalking] = useState(false);
  const [micError, setMicError] = useState(false);
  const talkingRef = useRef(false);
  const lessonRef = useRef(lesson);
  useEffect(() => {
    lessonRef.current = lesson;
  }, [lesson]);
  const onToolCallRef = useRef(onToolCall);
  useEffect(() => {
    onToolCallRef.current = onToolCall;
  }, [onToolCall]);

  const { isCapturing, micLevel, startCapture, stopCapture, muteMic, unmuteMic } = useAudioCapture();
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

  // Auto-mute mic when AI is speaking to prevent echo on mobile
  // (phone speaker audio gets picked up by the nearby mic)
  useEffect(() => {
    if (statusRef.current !== "live") return;
    if (isAiSpeaking) {
      muteMic();
    } else {
      unmuteMic();
    }
  }, [isAiSpeaking, muteMic, unmuteMic]);

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
      for (const fc of message.toolCall?.functionCalls ?? []) {
        lastActivityRef.current = Date.now();
        onToolCallRef.current?.({ id: fc.id, name: fc.name, args: fc.args ?? {} });
      }

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
              token: token || undefined,
              lesson: lessonRef.current,
              manualActivity: pushToTalk || undefined,
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
              if (pushToTalk && !talkingRef.current) return;
              sendToRelay({
                type: "audio",
                audio: { data: base64, mimeType: "audio/pcm;rate=16000" },
              });
            })
              .then((ok) => setMicError(!ok))
              .catch((err) => {
                console.error(err);
                setMicError(true);
              });

            // The relay sends the lesson's greeting itself, so Cú speaks first
            return;
          }

          if (msg.type === "server.error") {
            console.error("Relay error:", msg.message);
            if (statusRef.current === "connecting") reject(new Error(msg.message));
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
            // Set the ref now: the relay closes the socket right after, and onclose must not
            // overwrite this status with "idle" before React re-renders.
            statusRef.current = "quota_exceeded";
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
          if (statusRef.current !== "idle" && statusRef.current !== "quota_exceeded") {
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
    token,
    pushToTalk,
    IDLE_TIMEOUT_MS,
    initPlayback,
    startCapture,
    stopCapture,
    stopPlayback,
    disposePlayback,
    sendToRelay,
    handleGeminiMessage,
    unmuteMic,
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
    talkingRef.current = false;
    setIsTalking(false);
    setDisconnectReason(reason);
    setStatus("idle");
  }, [sendToRelay, stopCapture, disposePlayback]);

  // Keep disconnect ref in sync for timer callbacks
  useEffect(() => {
    disconnectRef.current = disconnect;
  }, [disconnect]);

  // ── Send text message ──
  const sendCue = useCallback(
    (cue: GeminiCue) => {
      sendToRelay({ type: "cue", ...cue });
    },
    [sendToRelay],
  );

  const sendToolResponse = useCallback(
    (id: string, name: string, response: Record<string, unknown>) => {
      sendToRelay({ type: "tool_response", functionResponses: [{ id, name, response }] });
    },
    [sendToRelay],
  );

  const startTalking = useCallback(() => {
    if (!pushToTalk || talkingRef.current || statusRef.current !== "live") return;
    stopPlayback(); // the child takes the turn: cut Cú off
    unmuteMic();
    talkingRef.current = true;
    setIsTalking(true);
    lastActivityRef.current = Date.now();
    sendToRelay({ type: "activity_start" });
  }, [pushToTalk, sendToRelay, stopPlayback, unmuteMic]);

  const stopTalking = useCallback(() => {
    if (!talkingRef.current) return;
    talkingRef.current = false;
    setIsTalking(false);
    lastActivityRef.current = Date.now();
    sendToRelay({ type: "activity_end" });
  }, [sendToRelay]);

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
    sendCue,
    sendToolResponse,
    startTalking,
    stopTalking,
    isTalking,
    micError,
  };
}
