"use server";

import { db } from "@/db";
import { referralCodes, referrals, users, withdrawals } from "@/db/schema";
import { eq, and, sql, desc } from "drizzle-orm";
import { createClient } from "@/libs/supabase/server";
import crypto from "crypto";
import { checkServerActionRateLimit } from "@/libs/utils/rate-limit";

const WITHDRAWAL_MIN_AMOUNT = 100_000; // 100,000 VND

function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Exclude confusing chars: I, O, 0, 1
  const bytes = crypto.randomBytes(8);
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(bytes[i] % chars.length);
  }
  return code;
}

async function getAuthUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// ============================================
// 1. Get or Create Referral Code (Premium only)
// ============================================
export async function getOrCreateReferralCode(): Promise<{
  code: string | null;
  error?: string;
}> {
  // Rate limit: 5 requests per minute per IP
  const rl = await checkServerActionRateLimit({ limit: 5, prefix: "referral-code" });
  if (rl.limited) return { code: null, error: "rate_limited" };

  try {
    const user = await getAuthUser();
    if (!user) return { code: null, error: "not_authenticated" };

    // Check existing code
    const existing = await db
      .select()
      .from(referralCodes)
      .where(eq(referralCodes.userId, user.id))
      .limit(1);

    if (existing.length > 0) {
      return { code: existing[0].code };
    }

    // Check if user is premium
    const userDb = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
    if (!userDb[0]?.isPro) {
      return { code: null, error: "premium_required" };
    }

    // Generate unique code with collision protection
    let code = generateReferralCode();
    let attempts = 0;
    let isUnique = false;
    while (attempts < 10) {
      const existingCode = await db
        .select()
        .from(referralCodes)
        .where(eq(referralCodes.code, code))
        .limit(1);
      if (existingCode.length === 0) {
        isUnique = true;
        break;
      }
      code = generateReferralCode();
      attempts++;
    }

    if (!isUnique) {
      return { code: null, error: "server_error" };
    }

    try {
      const [newCode] = await db
        .insert(referralCodes)
        .values({ userId: user.id, code })
        .returning();
      return { code: newCode.code };
    } catch (insertError: unknown) {
      // Handle race condition: another request may have created a code for this user
      const existing = await db
        .select()
        .from(referralCodes)
        .where(eq(referralCodes.userId, user.id))
        .limit(1);
      if (existing.length > 0) {
        return { code: existing[0].code };
      }
      throw insertError;
    }
  } catch (error) {
    console.error("Error getting/creating referral code:", error);
    return { code: null, error: "server_error" };
  }
}

// ============================================
// 2. Get Referral Stats
// ============================================
export async function getReferralStats(): Promise<{
  totalReferred: number;
  totalConverted: number;
  totalCommission: number;
  availableBalance: number;
  totalWithdrawn: number;
  pendingWithdrawal: number;
  commissionPercent: number;
}> {
  try {
    const user = await getAuthUser();
    if (!user) {
      return { totalReferred: 0, totalConverted: 0, totalCommission: 0, availableBalance: 0, totalWithdrawn: 0, pendingWithdrawal: 0, commissionPercent: 10 };
    }

    // Get user's commission percent from their referral code
    const userCode = await db.select({ commissionPercent: referralCodes.commissionPercent }).from(referralCodes).where(eq(referralCodes.userId, user.id)).limit(1);
    const commissionPercent = userCode[0]?.commissionPercent ?? 10;

    // Count total referred
    const totalResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(referrals)
      .where(eq(referrals.referrerUserId, user.id));
    const totalReferred = totalResult[0]?.count ?? 0;

    // Count converted (confirmed)
    const convertedResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(referrals)
      .where(and(eq(referrals.referrerUserId, user.id), eq(referrals.status, "confirmed")));
    const totalConverted = convertedResult[0]?.count ?? 0;

    // Total commission (confirmed only)
    const commissionResult = await db
      .select({ total: sql<number>`coalesce(sum(commission_amount), 0)::int` })
      .from(referrals)
      .where(and(eq(referrals.referrerUserId, user.id), eq(referrals.status, "confirmed")));
    const totalCommission = commissionResult[0]?.total ?? 0;

    // Total actually withdrawn (completed only)
    const completedResult = await db
      .select({ total: sql<number>`coalesce(sum(amount), 0)::int` })
      .from(withdrawals)
      .where(and(
        eq(withdrawals.userId, user.id),
        eq(withdrawals.status, "completed"),
      ));
    const totalWithdrawn = completedResult[0]?.total ?? 0;

    // Pending/processing withdrawal (reserved funds)
    const pendingResult = await db
      .select({ total: sql<number>`coalesce(sum(amount), 0)::int` })
      .from(withdrawals)
      .where(and(
        eq(withdrawals.userId, user.id),
        sql`${withdrawals.status} IN ('pending', 'processing')`,
      ));
    const pendingWithdrawal = pendingResult[0]?.total ?? 0;

    const availableBalance = totalCommission - totalWithdrawn - pendingWithdrawal;

    return { totalReferred, totalConverted, totalCommission, availableBalance, totalWithdrawn, pendingWithdrawal, commissionPercent };
  } catch (error) {
    console.error("Error getting referral stats:", error);
    return { totalReferred: 0, totalConverted: 0, totalCommission: 0, availableBalance: 0, totalWithdrawn: 0, pendingWithdrawal: 0, commissionPercent: 10 };
  }
}

// ============================================
// 3. Get Referral History
// ============================================
export async function getReferralHistory(): Promise<
  Array<{
    id: string;
    referredEmail: string;
    status: string;
    commissionRate: number | null;
    commissionAmount: number | null;
    createdAt: Date | null;
    confirmedAt: Date | null;
  }>
> {
  try {
    const user = await getAuthUser();
    if (!user) return [];

    const results = await db
      .select({
        id: referrals.id,
        referredEmail: users.email,
        status: referrals.status,
        commissionRate: referrals.commissionRate,
        commissionAmount: referrals.commissionAmount,
        createdAt: referrals.createdAt,
        confirmedAt: referrals.confirmedAt,
      })
      .from(referrals)
      .innerJoin(users, eq(referrals.referredUserId, users.id))
      .where(eq(referrals.referrerUserId, user.id))
      .orderBy(desc(referrals.createdAt));

    return results.map((r) => {
      const email = r.referredEmail || "unknown";
      // Mask email: show first 3 chars + *** + @domain
      const [local, domain] = email.split("@");
      const maskedEmail = local
        ? `${local.substring(0, 3)}***@${domain || ""}`
        : email;

      return {
        id: r.id,
        referredEmail: maskedEmail,
        status: r.status,
        commissionRate: r.commissionRate,
        commissionAmount: r.commissionAmount,
        createdAt: r.createdAt,
        confirmedAt: r.confirmedAt,
      };
    });
  } catch (error) {
    console.error("Error getting referral history:", error);
    return [];
  }
}

// ============================================
// 4. Record Referral Signup
// ============================================
export async function recordReferralSignup(referralCode: string): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await getAuthUser();
    if (!user) return { success: false, error: "not_authenticated" };

    // Find the referral code
    const codeResult = await db
      .select()
      .from(referralCodes)
      .where(eq(referralCodes.code, referralCode.toUpperCase()))
      .limit(1);

    if (codeResult.length === 0) {
      return { success: false, error: "invalid_code" };
    }

    const referrer = codeResult[0];

    // Don't allow self-referral
    if (referrer.userId === user.id) {
      return { success: false, error: "self_referral" };
    }

    // Check if this user has already been referred
    const existingReferral = await db
      .select()
      .from(referrals)
      .where(eq(referrals.referredUserId, user.id))
      .limit(1);

    if (existingReferral.length > 0) {
      return { success: false, error: "already_referred" };
    }

    // Create referral record (pending)
    await db.insert(referrals).values({
      referrerUserId: referrer.userId,
      referredUserId: user.id,
      status: "pending",
    });

    return { success: true };
  } catch (error) {
    console.error("Error recording referral signup:", error);
    return { success: false, error: "server_error" };
  }
}

// ============================================
// 5. Request Withdrawal
// ============================================
export async function requestWithdrawal(
  amount: number,
  bankName: string,
  bankAccount: string,
  bankAccountName: string,
): Promise<{ success: boolean; error?: string }> {
  // Rate limit: 3 requests per minute per IP
  const rl = await checkServerActionRateLimit({ limit: 3, prefix: "withdrawal" });
  if (rl.limited) return { success: false, error: "rate_limited" };

  try {
    const user = await getAuthUser();
    if (!user) return { success: false, error: "not_authenticated" };

    // Validate & sanitize bank info upfront
    const trimmedBankName = bankName.trim().slice(0, 100);
    const trimmedBankAccount = bankAccount.trim().slice(0, 50);
    const trimmedBankAccountName = bankAccountName.trim().slice(0, 100);

    if (!trimmedBankName || !trimmedBankAccount || !trimmedBankAccountName) {
      return { success: false, error: "missing_bank_info" };
    }

    if (amount < WITHDRAWAL_MIN_AMOUNT) {
      return { success: false, error: "below_minimum" };
    }

    // Use a transaction to prevent race conditions on balance check + insert
    const result = await db.transaction(async (tx) => {
      // Check for existing pending withdrawal (prevent spam)
      const pendingWithdrawals = await tx
        .select({ id: withdrawals.id })
        .from(withdrawals)
        .where(and(
          eq(withdrawals.userId, user.id),
          sql`${withdrawals.status} IN ('pending', 'processing')`,
        ))
        .limit(1);

      if (pendingWithdrawals.length > 0) {
        return { success: false as const, error: "pending_withdrawal_exists" };
      }

      // Calculate available balance within the transaction
      const commissionResult = await tx
        .select({ total: sql<number>`coalesce(sum(commission_amount), 0)::int` })
        .from(referrals)
        .where(and(eq(referrals.referrerUserId, user.id), eq(referrals.status, "confirmed")));
      const totalCommission = commissionResult[0]?.total ?? 0;

      const completedResult = await tx
        .select({ total: sql<number>`coalesce(sum(amount), 0)::int` })
        .from(withdrawals)
        .where(and(
          eq(withdrawals.userId, user.id),
          eq(withdrawals.status, "completed"),
        ));
      const totalWithdrawn = completedResult[0]?.total ?? 0;

      const pendingAmountResult = await tx
        .select({ total: sql<number>`coalesce(sum(amount), 0)::int` })
        .from(withdrawals)
        .where(and(
          eq(withdrawals.userId, user.id),
          sql`${withdrawals.status} IN ('pending', 'processing')`,
        ));
      const pendingAmount = pendingAmountResult[0]?.total ?? 0;

      const availableBalance = totalCommission - totalWithdrawn - pendingAmount;

      if (availableBalance < WITHDRAWAL_MIN_AMOUNT) {
        return { success: false as const, error: "insufficient_balance" };
      }

      if (amount > availableBalance) {
        return { success: false as const, error: "amount_exceeds_balance" };
      }

      await tx.insert(withdrawals).values({
        userId: user.id,
        amount,
        bankName: trimmedBankName,
        bankAccount: trimmedBankAccount,
        bankAccountName: trimmedBankAccountName,
      });

      return { success: true as const };
    });

    return result;
  } catch (error) {
    console.error("Error requesting withdrawal:", error);
    return { success: false, error: "server_error" };
  }
}

// ============================================
// 6. Get Withdrawal History
// ============================================
export async function getWithdrawalHistory(): Promise<
  Array<{
    id: string;
    amount: number;
    status: string;
    bankName: string;
    bankAccount: string;
    bankAccountName: string;
    note: string | null;
    createdAt: Date | null;
    processedAt: Date | null;
  }>
> {
  try {
    const user = await getAuthUser();
    if (!user) return [];

    return await db
      .select({
        id: withdrawals.id,
        amount: withdrawals.amount,
        status: withdrawals.status,
        bankName: withdrawals.bankName,
        bankAccount: withdrawals.bankAccount,
        bankAccountName: withdrawals.bankAccountName,
        note: withdrawals.note,
        createdAt: withdrawals.createdAt,
        processedAt: withdrawals.processedAt,
      })
      .from(withdrawals)
      .where(eq(withdrawals.userId, user.id))
      .orderBy(desc(withdrawals.createdAt));
  } catch (error) {
    console.error("Error getting withdrawal history:", error);
    return [];
  }
}
