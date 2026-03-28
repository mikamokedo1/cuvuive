import { POST } from './route';
import { NextRequest } from 'next/server';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// --- MOCK DRIZZLE ORM DB ---
const mockLimit = vi.fn();
const mockWhere = vi.fn().mockReturnValue({ limit: mockLimit });
const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });

const mockReturningInsert = vi.fn();
const mockValues = vi.fn().mockReturnValue({ returning: mockReturningInsert });
const mockInsert = vi.fn().mockReturnValue({ values: mockValues });

const mockReturningUpdate = vi.fn();
const mockUpdateWhere = vi.fn().mockReturnValue({ returning: mockReturningUpdate });
const mockSet = vi.fn().mockReturnValue({ where: mockUpdateWhere });
const mockUpdate = vi.fn().mockReturnValue({ set: mockSet });

vi.mock('@/db', () => ({
  db: {
    select: (...args: unknown[]) => mockSelect(...args),
    update: (...args: unknown[]) => mockUpdate(...args),
    insert: (...args: unknown[]) => mockInsert(...args),
  }
}));

// --- MOCK SUPABASE ---
const mockGetUser = vi.fn();
vi.mock('@/libs/supabase/server', () => ({
  createClient: async () => ({
    auth: {
      getUser: mockGetUser
    }
  })
}));

describe('POST /api/orders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createRequest = (body: Record<string, unknown>) => {
    return new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  it('Should return 401 if user is not authenticated', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } });
    const req = createRequest({ planCode: 'seed' });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('Should return 400 if planCode is missing', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user_123' } } });
    const req = createRequest({}); // missing planCode
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('Should return 404 if plan is not found in database', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user_123' } } });
    mockLimit.mockResolvedValueOnce([]); // Empty plans

    const req = createRequest({ planCode: 'invalid_plan' });
    const res = await POST(req);
    expect(res.status).toBe(404);
  });

  it('Should successfully create an order and return it', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user_123' } } });
    
    // Mock found plan
    mockLimit.mockResolvedValueOnce([{ id: 'plan_id', price: 100000 }]);
    
    // Mock insert returning ID
    mockReturningInsert.mockResolvedValueOnce([{ id: 55, cartCode: 'TMP' }]);
    
    // Mock update returning final order
    const finalOrder = { id: 55, cartCode: 'SEVQR55', status: 'pending' };
    mockReturningUpdate.mockResolvedValueOnce([finalOrder]);

    const req = createRequest({ planCode: 'seed' });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.order.cartCode).toBe('SEVQR55');
    
    // Verify Insert values
    expect(mockValues).toHaveBeenCalledWith(expect.objectContaining({
      userId: 'user_123',
      planId: 'plan_id',
      amount: 100000,
      status: 'pending'
    }));

    // Verify Update was called to update cartCode
    expect(mockSet).toHaveBeenCalledWith({ cartCode: 'SEVQR55' });
  });
});
