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
import { GoogleGenAI, Modality } from "@google/genai";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

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

/** Free/guest users: max 3 minutes per day (by IP) */
const FREE_DAILY_LIMIT_SECONDS = 3 * 60; // 180s
/** Premium users: max 20 minutes per day */
const PREMIUM_DAILY_LIMIT_SECONDS = 20 * 60; // 1200s

// ─── In-Memory IP Rate Limiter (free/guest users) ───────────────────

interface IpUsage {
  usedSeconds: number;
  date: string; // YYYY-MM-DD — auto-resets on new day
}

const ipUsageMap = new Map<string, IpUsage>();

function getIpUsage(ip: string): number {
  const today = new Date().toISOString().split("T")[0];
  const entry = ipUsageMap.get(ip);
  if (!entry || entry.date !== today) {
    ipUsageMap.set(ip, { usedSeconds: 0, date: today });
    return 0;
  }
  return entry.usedSeconds;
}

function addIpUsage(ip: string, seconds: number): void {
  if (seconds <= 0) return;
  const today = new Date().toISOString().split("T")[0];
  const entry = ipUsageMap.get(ip);
  if (!entry || entry.date !== today) {
    ipUsageMap.set(ip, { usedSeconds: seconds, date: today });
  } else {
    entry.usedSeconds += seconds;
  }
}

// Clean up stale IPs every hour to prevent memory leaks
setInterval(() => {
  const today = new Date().toISOString().split("T")[0];
  for (const [ip, entry] of ipUsageMap) {
    if (entry.date !== today) ipUsageMap.delete(ip);
  }
}, 60 * 60 * 1000);

// ─── Types ──────────────────────────────────────────────────────────

interface ClientStartMessage {
  type: "start";
  voiceName?: string;
  instructions?: string;
  token?: string; // Supabase JWT for auth
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

type ClientMessage = ClientStartMessage | ClientAudioMessage | ClientTextMessage | ClientCloseMessage;

// ─── Default System Instructions ────────────────────────────────────

const DEFAULT_INSTRUCTIONS = `Bạn là "Cú Thông Minh" — một cô giáo tiếng Anh người Việt Nam vui vẻ, dạy trẻ em Việt Nam 3-8 tuổi.
Bạn nói chuyện chủ yếu bằng tiếng Việt, xen kẽ từ vựng và câu tiếng Anh đơn giản để dạy bé.
Ví dụ: "Hôm nay mình học về màu sắc nhé! Red là màu đỏ. Con nói thử: Red!"
Khi dạy từ mới, luôn nói nghĩa tiếng Việt kèm theo.
Khi bé nói đúng, khen ngợi: "Giỏi lắm!", "Con phát âm chuẩn quá!", "Wow, con trả lời đúng rồi"
Khi bé nói sai, nhẹ nhàng sửa và khuyến khích thử lại: "Gần đúng rồi! Nghe cô nói lại nhé..."
Giữ câu trả lời ngắn gọn (1-3 câu), vui vẻ và dễ hiểu.
Thỉnh thoảng hỏi bé câu đơn giản để tương tác.
Dạy từ vựng về: màu sắc, số đếm, con vật, đồ ăn, chào hỏi, gia đình, và những thứ quen thuộc hàng ngày.
Luôn ấm áp, kiên nhẫn và khuyến khích — như một cô giáo thân thiện mà bé yêu quý.

QUY TẮC VỀ TỐC ĐỘ NÓI (CỰC KỲ QUAN TRỌNG):
- Nói CHẬM RÃI, rõ ràng, từng từ một. Tốc độ nói phải chậm hơn bình thường vì đối tượng là trẻ nhỏ 3-8 tuổi.
- Khi nói từ tiếng Anh: phát âm THẬT CHẬM, tách rõ từng âm tiết. Ví dụ: "Ap...ple" thay vì "Apple" nhanh.
- Giữa các câu phải có khoảng dừng tự nhiên để bé kịp nghe và hiểu.
- KHÔNG BAO GIỜ nói nhanh hay dồn dập. Hãy tưởng tượng bạn đang nói chuyện với một em bé 4 tuổi.
- Khi dạy phát âm, nói từ đó 2 lần: lần 1 thật chậm từng âm, lần 2 nói liền tự nhiên nhưng vẫn chậm.`;

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
  let isGuestSession = false;

  // Send typed message to client
  function sendToClient(data: Record<string, unknown>) {
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify(data));
    }
  }

  // Save session usage to DB (premium) or in-memory (guest)
  async function saveSessionUsage() {
    if (!sessionStartTime) return;
    const elapsed = Math.round((Date.now() - sessionStartTime) / 1000);
    if (elapsed > 0) {
      if (sessionUserId) {
        console.log(`💾 Saving usage: user=${sessionUserId}, seconds=${elapsed}`);
        await addUsedSeconds(sessionUserId, elapsed);
      } else if (isGuestSession) {
        console.log(`💾 Saving guest IP usage: ip=${clientIp}, seconds=${elapsed}`);
        addIpUsage(clientIp, elapsed);
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
      const userInstructions = (msg as ClientStartMessage).instructions || "";
      const token = (msg as ClientStartMessage).token;
      const systemInstruction = userInstructions.trim() || DEFAULT_INSTRUCTIONS;

      // ── Auth & Quota Check ──
      if (token) {
        const userId = await verifyToken(token);
        if (!userId) {
          // Token is invalid/expired — fall through to guest rate limit below
          console.log("⚠️ Invalid token — falling back to guest mode");
        } else {
          sessionUserId = userId;

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

      // Guest/free user: enforce IP-based rate limit (3 min/day)
      if (!sessionUserId) {
        isGuestSession = true;
        const ipUsed = getIpUsage(clientIp);
        const ipRemaining = FREE_DAILY_LIMIT_SECONDS - ipUsed;
        console.log(`📊 Guest ${clientIp}: used=${ipUsed}s, remaining=${ipRemaining}s`);

        if (ipRemaining <= 0) {
          sendToClient({
            type: "server.quota_exceeded",
            usedSeconds: ipUsed,
            limitSeconds: FREE_DAILY_LIMIT_SECONDS,
            remainingSeconds: 0,
          });
          return;
        }

        remainingQuotaSeconds = ipRemaining;
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
              realtimeInputConfig: {
                automaticActivityDetection: {
                  endOfSpeechSensitivity: "END_SENSITIVITY_HIGH" as any,
                  silenceDurationMs: 300,
                },
              },
              systemInstruction: systemInstruction,
            },
            callbacks: {
              onopen: () => {
                console.log(`🟢 Gemini session opened successfully using key ${maskedKey}`);
                isReady = true;
                sessionStartTime = Date.now();

                // Send ready with remaining quota info
                sendToClient({
                  type: "server.ready",
                  remainingSeconds: remainingQuotaSeconds,
                });

                // Auto-cut timer: force disconnect when quota runs out
                if (remainingQuotaSeconds !== null && remainingQuotaSeconds > 0) {
                  const effectiveLimit = isGuestSession ? FREE_DAILY_LIMIT_SECONDS : PREMIUM_DAILY_LIMIT_SECONDS;
                  quotaCutoffTimer = setTimeout(async () => {
                    console.log(`⏰ Quota cutoff for ${sessionUserId ?? `guest ${clientIp}`}`);
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

    // ── Forward Text ──
    if (msg.type === "text" && geminiSession) {
      const textMsg = msg as ClientTextMessage;
      console.log(`💬 Forwarding text prompt to Gemini: "${textMsg.text}"`);
      try {
        await geminiSession.sendClientContent({
          turns: [
            {
              role: "user",
              parts: [{ text: textMsg.text }],
            },
          ],
          turnComplete: true,
        });
      } catch (err) {
        console.error("❌ Failed to send text:", err);
      }
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
