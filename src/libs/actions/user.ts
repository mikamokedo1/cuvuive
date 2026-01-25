"use server";

import { checkUserSubscription } from "@/libs/subscription";
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
