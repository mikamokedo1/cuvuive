-- ============================================
-- REFERRAL SYSTEM MIGRATION
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create enums
DO $$ BEGIN
  CREATE TYPE referral_status AS ENUM ('pending', 'confirmed');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE withdrawal_status AS ENUM ('pending', 'processing', 'completed', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 2. Create referral_codes table
CREATE TABLE IF NOT EXISTS referral_codes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  commission_percent INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS referral_codes_user_idx ON referral_codes(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS referral_codes_code_idx ON referral_codes(code);

-- 3. Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  referrer_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referred_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id),
  commission_rate INTEGER,
  commission_amount INTEGER,
  status referral_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS referrals_referrer_idx ON referrals(referrer_user_id);
CREATE UNIQUE INDEX IF NOT EXISTS referrals_referred_idx ON referrals(referred_user_id);

-- 4. Create withdrawals table
CREATE TABLE IF NOT EXISTS withdrawals (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  status withdrawal_status NOT NULL DEFAULT 'pending',
  bank_name TEXT NOT NULL,
  bank_account TEXT NOT NULL,
  bank_account_name TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS withdrawals_user_id_idx ON withdrawals(user_id);

-- 5. Enable RLS on new tables
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own referral code" ON referral_codes
  FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can read own referrals" ON referrals
  FOR SELECT USING (referrer_user_id = auth.uid()::text);

CREATE POLICY "Users can read own withdrawals" ON withdrawals
  FOR SELECT USING (user_id = auth.uid()::text);
