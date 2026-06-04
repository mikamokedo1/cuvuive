import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { db } from "@/db";
import { learningSessions } from "@/db/schema";
import { eq, and } from "drizzle-orm";

/**
 * POST /api/learning-sessions/end
 * Dedicated endpoint for ending sessions — needed because navigator.sendBeacon()
 * only supports POST (not PATCH).
 * Body: { sessionId: string, durationSeconds: number }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { sessionId, durationSeconds } = body;

    if (!sessionId || typeof durationSeconds !== "number") {
      return NextResponse.json({ error: "sessionId and durationSeconds are required" }, { status: 400 });
    }

    // Cap duration at 2 hours max to prevent abuse
    const cappedDuration = Math.min(Math.max(0, Math.round(durationSeconds)), 7200);

    await db
      .update(learningSessions)
      .set({
        endedAt: new Date(),
        durationSeconds: cappedDuration,
      })
      .where(and(eq(learningSessions.id, sessionId), eq(learningSessions.userId, user.id)));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error ending learning session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
