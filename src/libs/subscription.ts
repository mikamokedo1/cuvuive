import { db } from "@/db";
import { subscriptions, users } from "@/db/schema";
import { eq, and, gt, desc } from "drizzle-orm";

/**
 * Checks if a user has a valid active subscription.
 * This checks the `subscriptions` table directly, ensuring we don't rely on
 * potentially stale `is_pro` flags in the `users` table.
 */
export async function checkUserSubscription(userId: string): Promise<boolean> {
  if (!userId) return false;

  // 1. Get the latest active subscription that hasn't expired
  const validSubscription = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.status, "active"),
        gt(subscriptions.endDate, new Date()), // endDate > NOW
      ),
    )
    .orderBy(desc(subscriptions.endDate))
    .limit(1);

  const isValid = validSubscription.length > 0;

  // 2. Optional: Auto-correct the user table if it's out of sync
  // This is a "lazy update" strategy.
  if (!isValid) {
    // If we didn't find a valid sub, but user is marked as pro, fix it.
    // We check purely for side-effect, don't await this if performance is critical
    // but useful to keep DB clean.
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: { isPro: true },
    });

    if (user?.isPro) {
      await db.update(users).set({ isPro: false }).where(eq(users.id, userId));
    }
  }

  return isValid;
}
