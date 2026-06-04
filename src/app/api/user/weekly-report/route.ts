import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * PATCH /api/user/weekly-report
 * Updates the weekly_report_enabled flag in the users table.
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
    const enabled = body.enabled === true;

    await db.update(users).set({ weeklyReportEnabled: enabled }).where(eq(users.id, user.id));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error updating weekly report setting:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
