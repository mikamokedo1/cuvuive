// Server-side data fetching for plans (NOT a server action)

import { db } from "@/db";
import { plans } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getPlans() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error("[getPlans] ❌ DATABASE_URL is not set!");
      return [];
    }
    console.log("[getPlans] DATABASE_URL exists, querying plans...");
    const allPlans = await db.select().from(plans).orderBy(asc(plans.price));
    console.log(`[getPlans] ✅ Found ${allPlans.length} plans`);
    return allPlans;
  } catch (error) {
    console.error("[getPlans] ❌ Error fetching plans:", error);
    return [];
  }
}
