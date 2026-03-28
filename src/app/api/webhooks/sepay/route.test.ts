import { POST } from './route';
import { NextRequest } from 'next/server';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';

// --- MOCK DRIZZLE ORM DB ---
const mockLimit = vi.fn();
const mockWhere = vi.fn().mockReturnValue({ limit: mockLimit });
const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });

const mockUpdateWhere = vi.fn();
const mockSet = vi.fn().mockReturnValue({ where: mockUpdateWhere });
const mockUpdate = vi.fn().mockReturnValue({ set: mockSet });

const mockReturning = vi.fn();
const mockValues = vi.fn().mockReturnValue({ returning: mockReturning });
const mockInsert = vi.fn().mockReturnValue({ values: mockValues });

vi.mock('@/db', () => ({
  db: {
    select: (...args: unknown[]) => mockSelect(...args),
    update: (...args: unknown[]) => mockUpdate(...args),
    insert: (...args: unknown[]) => mockInsert(...args),
  }
}));

describe('Sepay Webhook POST handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.PAYMENT_WEBHOOK_SECRET = 'test_secret';
  });

  const createRequest = (body: any, auth?: string) => {
    return new NextRequest('http://localhost:3000/api/webhooks/sepay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(auth && { 'Authorization': auth })
      },
      body: JSON.stringify(body),
    });
  };

  it('Case 1: Should return 401 if Authorization header is wrong or missing', async () => {
    const req = createRequest({ transferAmount: 100000, description: 'Test', referenceCode: 'ref123' });
    const res = await POST(req);
    expect(res.status).toBe(401);
    
    const json = await res.json();
    expect(json.error).toBe("Unauthorized");
  });

  it('Case 2: Should return 400 if required fields are missing', async () => {
    const req = createRequest({ transferAmount: 100000 }, 'test_secret'); // missing description
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('Case 3: Should ignore processing if no SEVQR prefix found in description', async () => {
    const req = createRequest({ transferAmount: 100000, description: 'Chuyen tien mua hang', referenceCode: 'ref123' }, 'test_secret');
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.message).toContain("Ignored");
  });

  it('Case 4: Should return 404 if order is not found', async () => {
    mockLimit.mockResolvedValueOnce([]); // Order query returns empty
    const req = createRequest({ transferAmount: 100000, description: 'SEVQR99', referenceCode: 'ref123' }, 'test_secret');
    const res = await POST(req);
    expect(res.status).toBe(404);
  });

  it('Case 5: Happy Flow - Should update order, user, create subscription (No Referral)', async () => {
    // 1. Mock finding order
    const mockOrder = { id: 99, amount: 200000, status: 'pending', userId: 'user1', planId: 'plan1' };
    mockLimit.mockResolvedValueOnce([mockOrder]);

    // 2. Mock finding plan
    const mockPlan = { id: 'plan1', durationMonths: 12 };
    mockLimit.mockResolvedValueOnce([mockPlan]);

    // 3. Mock referral check (empty = no referral)
    mockLimit.mockResolvedValueOnce([]);

    // Mock returning for subscription update (it returns full object)
    mockReturning.mockResolvedValueOnce([{ id: 'sub123' }]);

    const req = createRequest({ transferAmount: 200000, description: 'SEVQR99', referenceCode: 'sepay123' }, 'test_secret');
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    
    // Assert Order Update
    expect(mockUpdate).toHaveBeenCalledTimes(2); // 1 for order, 1 for user
    expect(mockSet).toHaveBeenNthCalledWith(1, { status: "paid" });
    
    // Assert Subscription Insert
    expect(mockInsert).toHaveBeenCalledTimes(1);
    expect(mockValues).toHaveBeenCalledWith(expect.objectContaining({
      userId: 'user1',
      planId: 'plan1',
      status: 'active',
      paymentProvider: 'sepay'
    }));

    // Assert User Update to Pro
    expect(mockSet).toHaveBeenNthCalledWith(2, {
      isPro: true,
      subscriptionId: 'sub123'
    });
  });

  it('Case 6: Happy Flow - Should process Referral Commission logic correctly', async () => {
    // 1. Order found
    mockLimit.mockResolvedValueOnce([{ id: 100, amount: 500000, status: 'pending', userId: 'user2', planId: 'plan2' }]);
    // 2. Plan found
    mockLimit.mockResolvedValueOnce([{ id: 'plan2', durationMonths: 12 }]);
    // Mock Sub creation
    mockReturning.mockResolvedValueOnce([{ id: 'sub456' }]);
    
    // 3. Referral record found
    mockLimit.mockResolvedValueOnce([{ id: 'ref_id', referrerUserId: 'referrer1', referredUserId: 'user2', status: 'pending' }]);
    // 4. Referrer Code found with 20% commission
    mockLimit.mockResolvedValueOnce([{ commissionPercent: 20 }]);

    const req = createRequest({ transferAmount: 500000, description: 'SEVQR100', referenceCode: 'sepay456' }, 'test_secret');
    const res = await POST(req);
    
    // We expect 3 updates: Order, User, Referral
    expect(mockUpdate).toHaveBeenCalledTimes(3); 
    
    // Assert Referral Update: 20% of 500k = 100k
    expect(mockSet).toHaveBeenNthCalledWith(3, expect.objectContaining({
      orderId: 100,
      commissionRate: 20,
      commissionAmount: 100000,
      status: 'confirmed'
    }));
  });
});
