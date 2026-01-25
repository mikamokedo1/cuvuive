"use server";

import { db } from "@/db";
import { plans } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getPlans() {
  try {
    const allPlans = await db.select().from(plans).orderBy(asc(plans.price));
    return allPlans;
  } catch (error) {
    console.error("Error fetching plans:", error);
    return [];
  }
}
