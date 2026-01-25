import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { plans, subscriptions, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    // 1. Security Check
    const secret = request.headers.get("x-webhook-secret");
    if (!process.env.PAYMENT_WEBHOOK_SECRET || secret !== process.env.PAYMENT_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse Payload
    const body = await request.json();
    const { userId, planCode, provider = "manual", transactionId } = body;

    if (!userId || !planCode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 3. Find Plan
    // Note: db.query style requires schema in db init. If not available, use select().
    // Let's use standard Drizzle select for safety.
    const planResult = await db.select().from(plans).where(eq(plans.code, planCode)).limit(1);
    const plan = planResult[0];

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // 4. Calculate Dates
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + plan.durationMonths);

    // 5. Create Subscription
    const [sub] = await db
      .insert(subscriptions)
      .values({
        userId,
        planId: plan.id,
        status: "active",
        startDate,
        endDate,
        paymentProvider: provider,
        transactionId: transactionId || `txn_${Date.now()}`,
      })
      .returning();

    console.log(`✅ Subscription created for user ${userId} on plan ${plan.name}`);

    // 6. Update User Status
    await db
      .update(users)
      .set({
        isPro: true,
        subscriptionId: sub.id,
      })
      .where(eq(users.id, userId));

    return NextResponse.json({ success: true, subscriptionId: sub.id });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
