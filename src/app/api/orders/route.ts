import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, plans } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createClient } from "@/libs/supabase/server";
import { applyRateLimit } from "@/libs/utils/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limit: 5 requests per minute per IP
  const rateLimited = applyRateLimit(request, { limit: 5 });
  if (rateLimited) return rateLimited;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { planCode } = body;

    if (!planCode) {
      return NextResponse.json({ error: "Missing planCode" }, { status: 400 });
    }

    // Find the requested plan
    const planResult = await db.select().from(plans).where(eq(plans.code, planCode)).limit(1);
    const plan = planResult[0];

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Get a unique base Cart Code (which we'll append the ID to later)
    // Drizzle with Postgres serial doesn't easily return the ID before insert,
    // so we'll just use a combination of simple string + timestamp to allow SePay matching
    // Wait, Drizzle returning() gives us the ID.
    // Let's insert a row first, then update it with the cartCode = `CUVUIVE${id}`

    // Start with a temporary cartCode just to fulfill the NOT NULL constraint
    const tempCartCode = `TMP_SEVQR_${Date.now()}`;

    const [newOrder] = await db
      .insert(orders)
      .values({
        userId: user.id,
        planId: plan.id,
        amount: plan.price,
        status: "pending",
        cartCode: tempCartCode,
      })
      .returning();

    // Now update the order with the friendly cartCode mapping back to the order ID
    const finalCartCode = `SEVQR${newOrder.id}`;

    const [finalOrder] = await db
      .update(orders)
      .set({ cartCode: finalCartCode })
      .where(eq(orders.id, newOrder.id))
      .returning();

    return NextResponse.json({ order: finalOrder });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
