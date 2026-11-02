-- ============================================
-- LIFETIME PREMIUM PLAN
-- Run this in Supabase SQL Editor BEFORE deploying the single-plan code.
-- ============================================

-- Older plans stay in the table: existing orders and subscriptions reference them
-- with ON DELETE CASCADE. The code simply stops selling them.
-- plans.id has no database default (Drizzle generates it in app code), so set it here.
INSERT INTO plans (id, name, code, price, duration_months, description)
VALUES (gen_random_uuid()::text, 'Premium Trọn Đời', 'lifetime', 299000, 1200, 'Trả một lần, dùng trọn đời')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  duration_months = EXCLUDED.duration_months,
  description = EXCLUDED.description;
