import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, plans, subscriptions, users, referrals, referralCodes } from "@/db/schema";
import { eq, and } from "drizzle-orm";
const key = process.env.PAYMENT_WEBHOOK_SECRET;
export async function POST(request: NextRequest) {
  try {
    // 1. Security Check via SePay API key set in Headers if configured
    // Alternatively, SePay usually puts an Authorization header or we verify IP.
    // Here we check for an environment variable token just in case.
    const authHeader = request.headers.get("Authorization");
    if (key) {
      if (!authHeader || !authHeader.includes(key)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // 2. Parse Payload from SePay
    // SePay webhook structure typically looks like:
    // { gateway, transactionDate, accountId, subAccount, transferType, transferAmount, accumulated, transferCode, referenceCode, description, ... }
    const body = await request.json();
    const { transferAmount, description, referenceCode } = body;

    console.log("🔔 Received SePay Webhook:", body);

    if (!description || !transferAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 3. Extract Order ID from description
    // Look for our specific cart code prefix "SEVQR" followed by digits
    const match = description.match(/SEVQR(\d+)/i);
    if (!match) {
      console.log("No matching SEVQR order code found in transfer description.");
      return NextResponse.json({ success: true, message: "Ignored: No order code" });
    }

    const orderId = parseInt(match[1], 10);

    // 4. Find the matching Order
    const orderResult = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    const order = orderResult[0];

    if (!order) {
      console.log(`Order ${orderId} not found.`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status === "paid") {
      console.log(`Order ${orderId} is already paid.`);
      return NextResponse.json({ success: true, message: "Order already paid" });
    }

    // Optional but recommended: Verify transferAmount >= order.amount
    // Sometimes users transfer a little less/more by accident. Accept if exact or over.
    if (parseInt(transferAmount, 10) < order.amount) {
      console.log(`Insufficient amount transferred. Expected: ${order.amount}, Received: ${transferAmount}`);
      // Mark order as partial or just leave pending for manual review
      return NextResponse.json({ success: true, message: "Insufficient amount" });
    }

    // 5. Find the Plan to determine duration
    const planResult = await db.select().from(plans).where(eq(plans.id, order.planId)).limit(1);
    const plan = planResult[0];

    if (!plan) {
      console.error(`Plan ${order.planId} for order ${orderId} not found.`);
      return NextResponse.json({ error: "Plan not found" }, { status: 500 });
    }

    // 6. Update Order Status
    await db.update(orders).set({ status: "paid" }).where(eq(orders.id, order.id));

    // 7. Calculate Subscription Dates
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + plan.durationMonths);

    // 8. Create or Update Subscription
    // Check if user already has an active subscription to extend it, or just create a new one.
    // For simplicity, we just create a new one matching the original /upgrade logic
    const [sub] = await db
      .insert(subscriptions)
      .values({
        userId: order.userId,
        planId: plan.id,
        status: "active",
        startDate,
        endDate,
        paymentProvider: "sepay",
        transactionId: referenceCode || `sepay_${Date.now()}`,
      })
      .returning();

    // 9. Update User Status
    await db
      .update(users)
      .set({
        isPro: true,
        subscriptionId: sub.id,
      })
      .where(eq(users.id, order.userId));

    // 10. Process Referral Commission
    try {
      const pendingReferral = await db
        .select()
        .from(referrals)
        .where(and(eq(referrals.referredUserId, order.userId), eq(referrals.status, "pending")))
        .limit(1);

      if (pendingReferral.length > 0) {
        const referral = pendingReferral[0];

        // Get commission percent from referrer's referral code
        const referrerCode = await db
          .select({ commissionPercent: referralCodes.commissionPercent })
          .from(referralCodes)
          .where(eq(referralCodes.userId, referral.referrerUserId))
          .limit(1);

        const commissionRate = referrerCode[0]?.commissionPercent ?? 10;
        const commissionAmount = Math.floor((order.amount * commissionRate) / 100);

        await db
          .update(referrals)
          .set({
            orderId: order.id,
            commissionRate,
            commissionAmount,
            status: "confirmed",
            confirmedAt: new Date(),
          })
          .where(eq(referrals.id, referral.id));

        console.log(
          `💰 Referral commission recorded: ${commissionAmount} VND (${commissionRate}%) for referrer ${referral.referrerUserId}`,
        );
      }
    } catch (refError) {
      // Don't fail the webhook if referral processing fails
      console.error("Error processing referral commission:", refError);
    }

    console.log(`✅ SePay webhook processed. Order ${orderId} paid and subscription granted for user ${order.userId}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SePay Webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
