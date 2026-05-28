import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

const PREMIUM_DAILY_LIMIT_SECONDS = 20 * 60; // 1200s = 20 minutes

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { usedSeconds: 0, remainingSeconds: 0, limitSeconds: 0, authenticated: false },
      { status: 200 },
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const { data } = await supabase
    .from("voice_usage")
    .select("used_seconds")
    .eq("user_id", user.id)
    .eq("usage_date", today)
    .single();

  const usedSeconds = data?.used_seconds ?? 0;
  const remainingSeconds = Math.max(0, PREMIUM_DAILY_LIMIT_SECONDS - usedSeconds);

  return NextResponse.json({
    usedSeconds,
    remainingSeconds,
    limitSeconds: PREMIUM_DAILY_LIMIT_SECONDS,
    authenticated: true,
  });
}
