import { GET } from './route';
import { NextRequest } from 'next/server';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// --- MOCK DRIZZLE ORM DB ---
const mockLimit = vi.fn();
const mockWhere = vi.fn().mockReturnValue({ limit: mockLimit });
const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });

vi.mock('@/db', () => ({
  db: {
    select: (...args: any) => mockSelect(...args),
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

describe('GET /api/orders/[id]/status', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createRequest = () => {
    return new NextRequest('http://localhost:3000/api/orders/1/status', {
      method: 'GET',
    });
  };

  it('Should return 401 if user is not authenticated', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } });
    const req = createRequest();
    // In Next.js App Router context.params is a Promise yielding { id: string }
    const res = await GET(req, { params: Promise.resolve({ id: '1' }) });
    expect(res.status).toBe(401);
  });

  it('Should return 400 if order ID is invalid', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user_123' } } });
    const req = createRequest();
    const res = await GET(req, { params: Promise.resolve({ id: 'abc' }) }); // invalid ID
    expect(res.status).toBe(400);
  });

  it('Should return 404 if order is not found', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user_123' } } });
    mockLimit.mockResolvedValueOnce([]); // Order not found
    
    const req = createRequest();
    const res = await GET(req, { params: Promise.resolve({ id: '99' }) });
    expect(res.status).toBe(404);
  });

  it('Should return 403 if order belongs to another user', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user_123' } } });
    
    // Order belongs to 'user_456'
    mockLimit.mockResolvedValueOnce([{ id: 99, userId: 'user_456', status: 'pending' }]);
    
    const req = createRequest();
    const res = await GET(req, { params: Promise.resolve({ id: '99' }) });
    expect(res.status).toBe(403);
  });

  it('Should successfully return order status if user is owner', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user_123' } } });
    
    // Order belongs to 'user_123'
    const mockOrder = { 
      id: 99, 
      userId: 'user_123', 
      status: 'pending', 
      amount: 150000, 
      cartCode: 'SEVQR99' 
    };
    mockLimit.mockResolvedValueOnce([mockOrder]);
    
    const req = createRequest();
    const res = await GET(req, { params: Promise.resolve({ id: '99' }) });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.status).toBe('pending');
    expect(json.amount).toBe(150000);
    expect(json.cartCode).toBe('SEVQR99');
  });
});
