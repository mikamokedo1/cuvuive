"use server";

import { checkUserSubscription, getUserSubscriptionDetails } from "@/libs/subscription";
import { createClient } from "@/libs/supabase/server";

export async function getSubscriptionStatusAction(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  return await checkUserSubscription(user.id);
}

export async function getSubscriptionDetailsAction(): Promise<{ isPremium: boolean; endDate: Date | null }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isPremium: false, endDate: null };
  }

  return await getUserSubscriptionDetails(user.id);
}
