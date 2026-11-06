/**
 * Voice Chat Relay Server
 *
 * Standalone WebSocket server that bridges browser clients to the
 * Google Gemini Live API. Run alongside the Next.js dev server:
 *
 *   npx tsx server/voice-relay.ts
 *
 * Environment:
 *   GEMINI_API_KEY           — required
 *   RELAY_PORT               — optional (default 8081)
 *   NEXT_PUBLIC_SUPABASE_URL — required (for quota tracking)
 *   SUPABASE_SERVICE_ROLE_KEY — required (for quota tracking)
 */

import { WebSocketServer, WebSocket } from "ws";
import { GoogleGenAI, Modality, Type, type Tool } from "@google/genai";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";
import { GROUPS as OWL_GROUPS, getLessonGreeting, getLessonInstruction } from "../src/features/games/talk-with-owl/constants";
import { GROUPS as ALPHABET_GROUPS, getLettersForGroup } from "../src/features/games/learn-alphabet/constants";
import {
  NUDGE_TEXT,
  allowedToolResults,
  buildLetterPracticeInstruction,
  greetingFor,
  manualNextMessage,
} from "../src/features/games/learn-alphabet/letterPractice";

// Load .env.local from the frontend root
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

// Load and parse all GEMINI_API_KEY* variables from environment
const GEMINI_API_KEYS: string[] = Object.keys(process.env)
  .filter((key) => key.startsWith("GEMINI_API_KEY"))
  .map((key) => process.env[key] || "")
  .filter((val) => val.trim().length > 0);

if (GEMINI_API_KEYS.length === 0) {
  console.error("❌ No GEMINI_API_KEY set in environment or .env.local");
  process.exit(1);
}

console.log(
  `🔑 Loaded ${GEMINI_API_KEYS.length} Gemini API key(s) for rotation:`,
  GEMINI_API_KEYS.map((k) => k.slice(0, 6) + "..." + k.slice(-4)),
);

let currentKeyIndex = 0;
function getNextApiKey(): string {
  const key = GEMINI_API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % GEMINI_API_KEYS.length;
  return key;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set");
  process.exit(1);
}

const PORT = Number(process.env.RELAY_PORT) || 8081;

// Supabase admin client (service role — bypasses RLS)
const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ─── Quota Config ───────────────────────────────────────────────────

/** Non-Premium users (guests and free accounts): max 3 minutes per day, counted separately for each game */
const FREE_DAILY_LIMIT_SECONDS = 3 * 60; // 180s
/** Premium users: max 20 minutes per day */
const PREMIUM_DAILY_LIMIT_SECONDS = 20 * 60; // 1200s

// ─── In-Memory Rate Limiter (non-Premium users) ─────────────────────
// Keyed by "<user id or ip:address>|<game>" so each game has its own free minutes.
// Kept in memory on purpose: it resets when the relay restarts, acceptable for a free trial.

interface FreeUsage {
  usedSeconds: number;
  date: string; // YYYY-MM-DD — auto-resets on new day
}

const freeUsageMap = new Map<string, FreeUsage>();

function getFreeUsage(key: string): number {
  const today = new Date().toISOString().split("T")[0];
  const entry = freeUsageMap.get(key);
  if (!entry || entry.date !== today) {
    freeUsageMap.set(key, { usedSeconds: 0, date: today });
    return 0;
  }
  return entry.usedSeconds;
}

function addFreeUsage(key: string, seconds: number): void {
  if (seconds <= 0) return;
  const today = new Date().toISOString().split("T")[0];
  const entry = freeUsageMap.get(key);
  if (!entry || entry.date !== today) {
    freeUsageMap.set(key, { usedSeconds: seconds, date: today });
  } else {
    entry.usedSeconds += seconds;
  }
}

// Clean up stale entries every hour to prevent memory leaks
setInterval(() => {
  const today = new Date().toISOString().split("T")[0];
  for (const [key, entry] of freeUsageMap) {
    if (entry.date !== today) freeUsageMap.delete(key);
  }
}, 60 * 60 * 1000);

// ─── Types ──────────────────────────────────────────────────────────

/** Which lesson the page is running. The relay builds the prompt itself: clients never send one. */
type LessonSpec =
  | { kind: "talk-with-owl"; groupId: string; lessonId: string }
  | { kind: "letter-practice"; groupId: string; startIndex?: number };

interface ClientStartMessage {
  type: "start";
  voiceName?: string;
  token?: string; // Supabase JWT for auth
  lesson?: LessonSpec;
  /** Push-to-talk: the client marks speech with activity_start / activity_end instead of server VAD. */
  manualActivity?: boolean;
}

/** Predefined prompts a page may trigger during a lesson (no free text from clients). */
interface ClientCueMessage {
  type: "cue";
  cue: "nudge" | "manual_next";
  nextIndex?: number;
}

interface ClientToolResponseMessage {
  type: "tool_response";
  functionResponses: { id: string; name: string; response: Record<string, unknown> }[];
}

interface ClientActivityMessage {
  type: "activity_start" | "activity_end";
}

interface ClientAudioMessage {
  type: "audio";
  audio: { data: string; mimeType: string };
}

interface ClientTextMessage {
  type: "text";
  text: string;
}

interface ClientCloseMessage {
  type: "close" | "audioStreamEnd";
}

type ClientMessage =
  | ClientStartMessage
  | ClientAudioMessage
  | ClientTextMessage
  | ClientCloseMessage
  | ClientToolResponseMessage
  | ClientActivityMessage
  | ClientCueMessage;

// ─── Tool Sets ──────────────────────────────────────────────────────
// Declared on the server, not by the client, so a page can only ask for functions defined here.

const TOOLSETS: Record<string, Tool[]> = {
  "letter-practice": [
    {
      functionDeclarations: [
        {
          name: "be_noi_dung",
          description: "Gọi khi bé đã đọc đúng hoặc gần đúng chữ cái đang học.",
          parameters: {
            type: Type.OBJECT,
            properties: { chu: { type: Type.STRING, description: "Chữ cái bé vừa đọc, ví dụ Ơ" } },
            required: ["chu"],
          },
        },
        {
          // Called on EVERY wrong reading. The page counts them and decides when to move on:
          // the model judges a single reading well but does not count attempts reliably.
          name: "be_doc_sai",
          description: "Gọi MỖI LẦN bé đọc sai chữ cái đang học. Sau đó làm theo kết quả hàm trả về.",
          parameters: {
            type: Type.OBJECT,
            properties: { chu: { type: Type.STRING, description: "Chữ cái đang học, ví dụ Ơ" } },
            required: ["chu"],
          },
        },
      ],
    },
  ],
};

// ─── Lessons ────────────────────────────────────────────────────────

interface LessonSession {
  /** Free-quota bucket */
  game: string;
  instructions: string;
  /** First user turn, sent by the relay once Gemini is ready, so Cú speaks first */
  greeting: string;
  tools?: Tool[];
  /** Function results the page may send; anything else is replaced (null = no tools) */
  allowedResults: Set<string> | null;
  /** Text for a page cue, or null if the cue is not valid for this lesson */
  cueText: (cue: ClientCueMessage) => string | null;
}

function resolveLesson(spec: LessonSpec | undefined): LessonSession | null {
  if (!spec || typeof spec !== "object") return null;
  if (spec.kind === "talk-with-owl") {
    const group = OWL_GROUPS.find((g) => g.id === spec.groupId);
    if (!group || !/^lesson[1-9]$/.test(String(spec.lessonId))) return null;
    return {
      game: "talk-with-owl",
      instructions: getLessonInstruction(group.id, spec.lessonId),
      greeting: getLessonGreeting(group.id, spec.lessonId),
      allowedResults: null,
      cueText: () => null,
    };
  }
  if (spec.kind === "letter-practice") {
    if (!ALPHABET_GROUPS.some((g) => g.id === spec.groupId)) return null;
    const letters = getLettersForGroup(spec.groupId);
    if (letters.length === 0) return null;
    const start = Number.isInteger(spec.startIndex) ? Math.max(0, Math.min(Number(spec.startIndex), letters.length - 1)) : 0;
    return {
      game: "learn-alphabet",
      instructions: buildLetterPracticeInstruction(letters),
      greeting: greetingFor(letters, start),
      tools: TOOLSETS["letter-practice"],
      allowedResults: allowedToolResults(letters),
      cueText: (cue) => {
        if (cue.cue === "nudge") return NUDGE_TEXT;
        if (cue.cue === "manual_next" && Number.isInteger(cue.nextIndex) && cue.nextIndex! >= 0 && cue.nextIndex! <= letters.length) {
          return manualNextMessage(letters, cue.nextIndex!);
        }
        return null;
      },
    };
  }
  return null;
}

// ─── Quota Helpers ──────────────────────────────────────────────────

async function verifyToken(token: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return null;
    return data.user.id;
  } catch {
    return null;
  }
}

/** Same rule as src/libs/subscription.ts: an active subscription whose end date is in the future. */
async function isPremiumUser(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "active")
    .gt("end_date", new Date().toISOString())
    .limit(1);
  if (error) {
    console.error("❌ Premium lookup failed:", error.message);
    return false;
  }
  return (data?.length ?? 0) > 0;
}

async function getUsedSecondsToday(userId: string): Promise<number> {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const { data } = await supabase
    .from("voice_usage")
    .select("used_seconds")
    .eq("user_id", userId)
    .eq("usage_date", today)
    .single();
  return data?.used_seconds ?? 0;
}

async function addUsedSeconds(userId: string, seconds: number): Promise<void> {
  if (seconds <= 0) return;
  const today = new Date().toISOString().split("T")[0];

  // Upsert: insert or increment
  const { data: existing } = await supabase
    .from("voice_usage")
    .select("id, used_seconds")
    .eq("user_id", userId)
    .eq("usage_date", today)
    .single();

  if (existing) {
    await supabase
      .from("voice_usage")
      .update({
        used_seconds: existing.used_seconds + seconds,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("voice_usage").insert({
      user_id: userId,
      usage_date: today,
      used_seconds: seconds,
    });
  }
}

// ─── Server ─────────────────────────────────────────────────────────

const wss = new WebSocketServer({ port: PORT });
console.log(`🦉 Voice Relay Server running on ws://localhost:${PORT}`);

wss.on("connection", (clientWs: WebSocket, req) => {
  // Extract client IP (supports X-Forwarded-For behind nginx/proxy)
  const clientIp =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown";
  console.log(`📱 Client connected from ${clientIp}`);

  let geminiSession: any = null;
  let isReady = false;
  let isClosing = false;
  let audioChunkCount = 0;

  // Quota tracking
  let sessionUserId: string | null = null;
  let sessionStartTime: number | null = null;
  let remainingQuotaSeconds: number | null = null;
  let quotaCutoffTimer: ReturnType<typeof setTimeout> | null = null;
  /** Premium usage is stored in the DB; everyone else is tracked in memory, per game. */
  let isPremiumSession = false;
  let freeUsageKey: string | null = null;
  /** The lesson this connection runs, built by the relay from the page's lesson id */
  let lesson: LessonSession | null = null;

  async function sendUserTurn(text: string) {
    if (!geminiSession || !isReady) return;
    try {
      await geminiSession.sendClientContent({ turns: [{ role: "user", parts: [{ text }] }], turnComplete: true });
    } catch (err) {
      console.error("❌ Failed to send text:", err);
    }
  }

  // Send typed message to client
  function sendToClient(data: Record<string, unknown>) {
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify(data));
    }
  }

  // Save session usage to DB (premium) or in-memory (everyone else, per game)
  async function saveSessionUsage() {
    if (!sessionStartTime) return;
    const elapsed = Math.round((Date.now() - sessionStartTime) / 1000);
    if (elapsed > 0) {
      if (isPremiumSession && sessionUserId) {
        console.log(`💾 Saving usage: user=${sessionUserId}, seconds=${elapsed}`);
        await addUsedSeconds(sessionUserId, elapsed);
      } else if (freeUsageKey) {
        console.log(`💾 Saving free usage: ${freeUsageKey}, seconds=${elapsed}`);
        addFreeUsage(freeUsageKey, elapsed);
      }
    }
    sessionStartTime = null; // prevent double-save
  }

  // Close Gemini session cleanly
  async function closeGeminiSession() {
    if (quotaCutoffTimer) {
      clearTimeout(quotaCutoffTimer);
      quotaCutoffTimer = null;
    }
    await saveSessionUsage();

    if (geminiSession && !isClosing) {
      isClosing = true;
      try {
        await geminiSession.close();
      } catch {
        // ignore
      }
      geminiSession = null;
    }
  }

  // Handle incoming messages from the browser client
  clientWs.on("message", async (raw: Buffer) => {
    let msg: ClientMessage;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      return;
    }

    // ── Start Session ──
    if (msg.type === "start") {
      const voiceName = (msg as ClientStartMessage).voiceName || "Kore";
      const token = (msg as ClientStartMessage).token;
      lesson = resolveLesson((msg as ClientStartMessage).lesson);
      if (!lesson) {
        sendToClient({ type: "server.error", message: "Unknown lesson" });
        return;
      }
      const systemInstruction = lesson.instructions;
      const game = lesson.game;
      const tools = lesson.tools;
      const manualActivity = (msg as ClientStartMessage).manualActivity === true;

      // ── Auth & Quota Check ──
      if (token) {
        const userId = await verifyToken(token);
        if (!userId) {
          // Token is invalid/expired — fall through to guest rate limit below
          console.log("⚠️ Invalid token — falling back to guest mode");
        } else if (!(await isPremiumUser(userId))) {
          // Logged in but not Premium: free minutes below, keyed by account
          sessionUserId = userId;
        } else {
          sessionUserId = userId;
          isPremiumSession = true;

          // Check daily quota
          const usedToday = await getUsedSecondsToday(userId);
          const remaining = PREMIUM_DAILY_LIMIT_SECONDS - usedToday;
          console.log(`📊 User ${userId}: used=${usedToday}s, remaining=${remaining}s`);

          if (remaining <= 0) {
            sendToClient({
              type: "server.quota_exceeded",
              usedSeconds: usedToday,
              limitSeconds: PREMIUM_DAILY_LIMIT_SECONDS,
              remainingSeconds: 0,
            });
            return;
          }

          remainingQuotaSeconds = remaining;
        }
      }

      // Non-Premium (guest or free account): 3 min/day per game, by account if logged in, else by IP
      if (!isPremiumSession) {
        freeUsageKey = `${sessionUserId ?? `ip:${clientIp}`}|${game}`;
        const freeUsed = getFreeUsage(freeUsageKey);
        const freeRemaining = FREE_DAILY_LIMIT_SECONDS - freeUsed;
        console.log(`📊 Free ${freeUsageKey}: used=${freeUsed}s, remaining=${freeRemaining}s`);

        if (freeRemaining <= 0) {
          sendToClient({
            type: "server.quota_exceeded",
            usedSeconds: freeUsed,
            limitSeconds: FREE_DAILY_LIMIT_SECONDS,
            remainingSeconds: 0,
          });
          return;
        }

        remainingQuotaSeconds = freeRemaining;
      }

      let connectionAttempts = 0;
      const maxAttempts = GEMINI_API_KEYS.length;

      async function tryConnect() {
        if (isClosing) return;
        connectionAttempts++;
        const currentKey = getNextApiKey();
        const maskedKey = currentKey.slice(0, 6) + "..." + currentKey.slice(-4);
        console.log(
          `🔧 [Attempt ${connectionAttempts}/${maxAttempts}] Connecting with voice=${voiceName}, key=${maskedKey}, model=gemini-3.1-flash-live-preview...`,
        );

        const ai = new GoogleGenAI({ apiKey: currentKey });

        try {
          geminiSession = await ai.live.connect({
            model: "gemini-3.1-flash-live-preview",
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                languageCode: "vi-VN",
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: voiceName as any,
                  },
                },
              },
              realtimeInputConfig: manualActivity
                ? { automaticActivityDetection: { disabled: true } }
                : {
                    automaticActivityDetection: {
                      endOfSpeechSensitivity: "END_SENSITIVITY_HIGH" as any,
                      silenceDurationMs: 300,
                    },
                  },
              // Scripted lessons also get transcripts: the page uses them to tell whether Gemini heard the child
              ...(tools ? { tools, inputAudioTranscription: {}, outputAudioTranscription: {} } : {}),
              systemInstruction: systemInstruction,
            },
            callbacks: {
              onopen: () => {
                console.log(`🟢 Gemini session opened successfully using key ${maskedKey}`);
                isReady = true;
                sessionStartTime = Date.now();

                // Send ready with remaining quota info
                const effectiveLimit = isPremiumSession ? PREMIUM_DAILY_LIMIT_SECONDS : FREE_DAILY_LIMIT_SECONDS;
                sendToClient({
                  type: "server.ready",
                  remainingSeconds: remainingQuotaSeconds,
                  limitSeconds: effectiveLimit,
                  isPremium: isPremiumSession,
                });

                // Make Cú speak first (short delay lets the Live audio session settle)
                const greeting = lesson?.greeting;
                if (greeting) setTimeout(() => void sendUserTurn(greeting), 800);

                // Auto-cut timer: force disconnect when quota runs out
                if (remainingQuotaSeconds !== null && remainingQuotaSeconds > 0) {
                  quotaCutoffTimer = setTimeout(async () => {
                    console.log(`⏰ Quota cutoff for ${freeUsageKey ?? sessionUserId}`);
                    sendToClient({
                      type: "server.quota_exceeded",
                      usedSeconds: effectiveLimit,
                      limitSeconds: effectiveLimit,
                      remainingSeconds: 0,
                    });
                    await closeGeminiSession();
                    clientWs.close(1000, "quota_exceeded");
                  }, remainingQuotaSeconds * 1000);
                }
              },
              onmessage: (geminiMsg: any) => {
                sendToClient({
                  type: "gemini.message",
                  message: geminiMsg,
                });
              },
              onerror: async (err: any) => {
                console.error(`❌ Gemini error on key ${maskedKey}:`, err);

                // If the session is not ready yet, it means connection failed to establish (e.g. 429 rate limit or invalid key)
                // We should clean up this failed session and immediately attempt with the next available key
                if (!isReady && connectionAttempts < maxAttempts && !isClosing) {
                  console.log(`🔄 Connection failed before open. Retrying with next key...`);
                  // Reset state before retry
                  if (geminiSession) {
                    try {
                      await geminiSession.close();
                    } catch {}
                    geminiSession = null;
                  }
                  await tryConnect();
                } else {
                  sendToClient({
                    type: "server.error",
                    message: err instanceof Error ? err.message : "Gemini connection error",
                  });
                }
              },
              onclose: async (event: any) => {
                console.log(`🔴 Gemini session closed for key ${maskedKey}`, event?.code, event?.reason);

                // If it closed before becoming ready (some web socket close events occur instead of onError)
                // and we still have other keys to try, attempt fallback
                if (!isReady && connectionAttempts < maxAttempts && !isClosing) {
                  console.log(`🔄 Connection closed before open. Retrying with next key...`);
                  geminiSession = null;
                  await tryConnect();
                } else {
                  isReady = false;
                  await saveSessionUsage();
                  sendToClient({
                    type: "server.closed",
                    code: event?.code,
                    reason: event?.reason || "Session ended",
                  });
                  geminiSession = null;
                }
              },
            },
          });
        } catch (err) {
          console.error(`❌ Failed to connect on key ${maskedKey}:`, err);
          if (connectionAttempts < maxAttempts && !isClosing) {
            console.log(`🔄 Retrying next key due to connection exception...`);
            geminiSession = null;
            await tryConnect();
          } else {
            sendToClient({
              type: "server.error",
              message: err instanceof Error ? err.message : "Failed to connect to Gemini after trying all keys",
            });
          }
        }
      }

      await tryConnect();
      return;
    }

    // ── Forward Audio ──
    if (msg.type === "audio") {
      if (!geminiSession || !isReady) return; // Drop audio if not ready
      audioChunkCount++;
      if (audioChunkCount % 50 === 1) {
        console.log(`🎤 Audio chunks sent: ${audioChunkCount}`);
      }
      const audioMsg = msg as ClientAudioMessage;
      try {
        await geminiSession.sendRealtimeInput({
          audio: {
            data: audioMsg.audio.data,
            mimeType: audioMsg.audio.mimeType,
          },
        });
      } catch (err) {
        console.error("❌ Audio send error:", err instanceof Error ? err.message : err);
      }
      return;
    }

    // ── Forward function results (answers to Gemini tool calls) ──
    if (msg.type === "tool_response") {
      if (!geminiSession || !isReady) return;
      const { functionResponses } = msg as ClientToolResponseMessage;
      if (!Array.isArray(functionResponses) || functionResponses.length === 0 || !lesson?.allowedResults) return;
      const allowed = lesson.allowedResults;
      const safe = functionResponses.slice(0, 4).map((r) => {
        const result = typeof r?.response?.result === "string" ? r.response.result : "";
        if (!allowed.has(result)) console.warn("⚠️ Unexpected tool result replaced");
        return { id: String(r?.id ?? ""), name: String(r?.name ?? ""), response: { result: allowed.has(result) ? result : "Đã ghi nhận." } };
      });
      try {
        await geminiSession.sendToolResponse({ functionResponses: safe });
      } catch (err) {
        console.error("❌ Tool response error:", err instanceof Error ? err.message : err);
      }
      return;
    }

    // ── Push-to-talk boundaries (only meaningful when started with manualActivity) ──
    if (msg.type === "activity_start" || msg.type === "activity_end") {
      if (!geminiSession || !isReady) return;
      try {
        await geminiSession.sendRealtimeInput(
          msg.type === "activity_start" ? { activityStart: {} } : { activityEnd: {} },
        );
      } catch (err) {
        console.error("❌ Activity signal error:", err instanceof Error ? err.message : err);
      }
      return;
    }

    // ── Page cues (predefined prompts only; free text from clients is ignored) ──
    if (msg.type === "cue") {
      const text = lesson?.cueText(msg as ClientCueMessage);
      if (text) await sendUserTurn(text);
      return;
    }
    if (msg.type === "text") {
      console.warn("⚠️ Ignored free text from client");
      return;
    }

    // ── Close Session ──
    if (msg.type === "close" || msg.type === "audioStreamEnd") {
      await closeGeminiSession();
      return;
    }
  });

  // Clean up on client disconnect
  clientWs.on("close", async () => {
    console.log("📱 Client disconnected");
    await closeGeminiSession();
  });

  clientWs.on("error", (err) => {
    console.error("Client WebSocket error:", err.message);
  });
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down Voice Relay Server...");
  wss.close(() => process.exit(0));
});

process.on("SIGTERM", () => {
  wss.close(() => process.exit(0));
});
