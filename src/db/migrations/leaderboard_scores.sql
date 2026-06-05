-- Leaderboard Scores: materialized/cached scores for fast ranking queries
-- kidName → JOINed from auth.users (raw_user_meta_data->>'kidName')
-- email   → JOINed from users table
-- No denormalization — always fresh data
CREATE TABLE IF NOT EXISTS leaderboard_scores (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  total_lessons INTEGER NOT NULL DEFAULT 0,
  total_minutes INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  smart_score INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_smart_score ON leaderboard_scores(smart_score DESC);
