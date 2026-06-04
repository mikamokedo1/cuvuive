-- ============================================
-- VOICE CHAT USAGE TRACKING MIGRATION
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create voice_usage table
-- Tracks daily voice chat usage per user (in seconds)
CREATE TABLE IF NOT EXISTS voice_usage (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  used_seconds INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, usage_date)
);

CREATE INDEX IF NOT EXISTS voice_usage_user_date_idx ON voice_usage(user_id, usage_date);

-- 2. Enable RLS
ALTER TABLE voice_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read their own usage
CREATE POLICY "Users can read own voice usage" ON voice_usage
  FOR SELECT USING (user_id = auth.uid()::text);

-- Service role can insert/update (relay server uses service key)
-- No INSERT/UPDATE policy for anon/authenticated — only service_role can write
