import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/libs/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const supabase = await createServerClient();

    // 1. Verify user is logged in
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Initialize Supabase Admin Client
    // We need the service role key to delete a user
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // 3. Delete the user
    // This will cascade and delete the user's row in public.users if RLS and foreign keys are set up correctly
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (deleteError) {
      console.error("Error deleting user:", deleteError);
      return NextResponse.json({ error: "Failed to delete user account" }, { status: 500 });
    }

    // 4. Return success
    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Unexpected error during user deletion:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
