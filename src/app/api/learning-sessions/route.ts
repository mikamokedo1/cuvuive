import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { db } from "@/db";
import { learningSessions } from "@/db/schema";
import { eq, and, isNull } from "drizzle-orm";

/**
 * POST /api/learning-sessions
 * Creates a new learning session when the kid starts playing a game.
 * Body: { courseId: string }
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
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }

    // Close any open sessions for this user (safety net)
    await db
      .update(learningSessions)
      .set({
        endedAt: new Date(),
        durationSeconds: 0, // Unknown duration for orphaned sessions
      })
      .where(and(eq(learningSessions.userId, user.id), isNull(learningSessions.endedAt)));

    // Create new session
    const sessionId = crypto.randomUUID();
    await db.insert(learningSessions).values({
      id: sessionId,
      userId: user.id,
      courseId,
      startedAt: new Date(),
    });

    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error("Error creating learning session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/learning-sessions
 * Ends an active learning session.
 * Body: { sessionId: string, durationSeconds: number }
 */
export async function PATCH(request: NextRequest) {
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
