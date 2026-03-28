"use server";

import { db } from "@/db";
import { feedbacks } from "@/db/schema";
import { createClient } from "@/libs/supabase/server";

export async function submitFeedbackAction(data: {
  title: string;
  description: string;
  email: string;
  phone?: string;
}) {
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
