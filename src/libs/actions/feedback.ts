"use server";

import { db } from "@/db";
import { feedbacks } from "@/db/schema";
import { createClient } from "@/libs/supabase/server";
import { checkServerActionRateLimit } from "@/libs/utils/rate-limit";

export async function submitFeedbackAction(data: {
  title: string;
  description: string;
  email: string;
  phone?: string;
}) {
  // Rate limit: 3 requests per minute per IP (guests can submit)
  const rl = await checkServerActionRateLimit({ limit: 3, prefix: "feedback" });
  if (rl.limited) return { success: false, error: "Bạn đã gửi quá nhiều lần. Vui lòng thử lại sau." };

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await db.insert(feedbacks).values({
      userId: user?.id || null, // Allow guest submission
      title: data.title,
      description: data.description,
      email: data.email,
      phone: data.phone || null,
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Error submitting feedback:", error);
    const message = error instanceof Error ? error.message : "Failed to submit feedback";
    return { success: false, error: message };
  }
}
