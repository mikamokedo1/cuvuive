import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { refreshLeaderboardScoreAction } from "@/libs/actions/leaderboard";

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await refreshLeaderboardScoreAction(user.id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error refreshing leaderboard score:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
