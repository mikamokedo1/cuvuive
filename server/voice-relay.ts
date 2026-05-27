/**
 * Voice Chat Relay Server
 *
 * Standalone WebSocket server that bridges browser clients to the
 * Google Gemini Live API. Run alongside the Next.js dev server:
 *
 *   npx tsx server/voice-relay.ts
 *
 * Environment:
 *   GEMINI_API_KEY  — required
 *   RELAY_PORT      — optional (default 8081)
 */

import { WebSocketServer, WebSocket } from "ws";
import { GoogleGenAI, Modality } from "@google/genai";
import * as dotenv from "dotenv";
import * as path from "path";

// Load .env.local from the frontend root
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is not set in .env.local");
  process.exit(1);
}

const PORT = Number(process.env.RELAY_PORT) || 8081;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// ─── Types ──────────────────────────────────────────────────────────

interface ClientStartMessage {
  type: "start";
  voiceName?: string;
  instructions?: string;
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
  | ClientCloseMessage;

// ─── Default System Instructions ────────────────────────────────────

const DEFAULT_INSTRUCTIONS = `You are "Cú Thông Minh" (Smart Owl) — a friendly, enthusiastic English teacher for Vietnamese children aged 3-8.
You ALWAYS speak in English, but you can understand Vietnamese.
When the child speaks Vietnamese, gently encourage them to try in English.
Use simple words and short sentences appropriate for young learners.
Teach vocabulary, pronunciation, colors, numbers, animals, greetings, and daily phrases.
When the child says something correctly, praise them: "Great job!", "Excellent!", "You're amazing!".
When they make a mistake, gently correct them and encourage them to try again.
Keep responses short (1-3 sentences) and fun.
Occasionally ask simple questions to engage the child.
Be warm, patient, and encouraging — like a fun friend who happens to teach English.`;

// ─── Server ─────────────────────────────────────────────────────────

const wss = new WebSocketServer({ port: PORT });
console.log(`🦉 Voice Relay Server running on ws://localhost:${PORT}`);

wss.on("connection", (clientWs: WebSocket) => {
  console.log("📱 Client connected");

  let geminiSession: any = null;
  let isReady = false;
  let isClosing = false;
  let audioChunkCount = 0;

  // Send typed message to client
  function sendToClient(data: Record<string, unknown>) {
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify(data));
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
      const systemInstruction =
        userInstructions.trim() || DEFAULT_INSTRUCTIONS;

      try {
        console.log(`🔧 Connecting with voice=${voiceName}, model=gemini-3.1-flash-live-preview...`);

        geminiSession = await ai.live.connect({
          model: "gemini-3.1-flash-live-preview",
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
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
              console.log("🟢 Gemini session opened");
              isReady = true;
              sendToClient({ type: "server.ready" });
            },
            onmessage: (geminiMsg: any) => {
              sendToClient({
                type: "gemini.message",
                message: geminiMsg,
              });
            },
            onerror: (err: any) => {
              console.error("❌ Gemini error:", err);
              sendToClient({
                type: "server.error",
                message:
                  err instanceof Error ? err.message : "Gemini connection error",
              });
            },
            onclose: (event: any) => {
              console.log("🔴 Gemini session closed", event?.code, event?.reason);
              isReady = false;
              sendToClient({
                type: "server.closed",
                code: event?.code,
                reason: event?.reason || "Session ended",
              });
              geminiSession = null;
            },
          },
        });
      } catch (err) {
        console.error("❌ Failed to connect to Gemini:", err);
        sendToClient({
          type: "server.error",
          message:
            err instanceof Error
              ? err.message
              : "Failed to connect to Gemini",
        });
      }
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
      if (geminiSession && !isClosing) {
        isClosing = true;
        try {
          await geminiSession.close();
        } catch {
          // ignore
        }
        geminiSession = null;
      }
      return;
    }
  });

  // Clean up on client disconnect
  clientWs.on("close", async () => {
    console.log("📱 Client disconnected");
    if (geminiSession && !isClosing) {
      isClosing = true;
      try {
        await geminiSession.close();
      } catch {
        // ignore
      }
      geminiSession = null;
    }
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
