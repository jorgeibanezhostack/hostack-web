-- ============================================================
-- HOSTACK COMMAND CENTER — Database Schema
-- Execute this in the Supabase SQL Editor
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── CLIENTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clients (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT        NOT NULL,
  slug          TEXT        NOT NULL UNIQUE,
  property_type TEXT        NOT NULL DEFAULT 'hostel',
  beds          INTEGER     NOT NULL DEFAULT 0,
  country       TEXT        NOT NULL,
  plan          TEXT        NOT NULL DEFAULT 'free'
                            CHECK (plan IN ('free', 'pro', 'custom')),
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── SERVICE_STATES ─────────────────────────────────────────
-- One row per client per service (guest_app, staff_app, owner_dashboard)
CREATE TABLE IF NOT EXISTS service_states (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id    UUID        NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  service      TEXT        NOT NULL
                           CHECK (service IN ('guest_app', 'staff_app', 'owner_dashboard')),
  status       TEXT        NOT NULL DEFAULT 'online'
                           CHECK (status IN ('online', 'offline', 'maintenance')),
  enabled      BOOLEAN     NOT NULL DEFAULT true,
  last_checked TIMESTAMPTZ,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (client_id, service)
);

-- ── TASK_QUEUE (Agentic Bridge) ────────────────────────────
-- Human logs tasks here; external agents poll and patch status back
CREATE TABLE IF NOT EXISTS task_queue (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id      UUID        REFERENCES clients(id) ON DELETE SET NULL,
  title          TEXT        NOT NULL,
  description    TEXT,
  task_type      TEXT        NOT NULL DEFAULT 'other'
                             CHECK (task_type IN ('fix', 'deploy', 'config', 'review', 'other')),
  priority       TEXT        NOT NULL DEFAULT 'medium'
                             CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status         TEXT        NOT NULL DEFAULT 'pending'
                             CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  assigned_agent TEXT,
  result         TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at   TIMESTAMPTZ
);

-- ── ACTIVITY_LOG ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activity_log (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id  UUID        REFERENCES clients(id) ON DELETE SET NULL,
  action     TEXT        NOT NULL,
  actor      TEXT        NOT NULL DEFAULT 'human'
                         CHECK (actor IN ('human', 'agent')),
  metadata   JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── INDEXES ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_service_states_client  ON service_states(client_id);
CREATE INDEX IF NOT EXISTS idx_task_queue_status      ON task_queue(status);
CREATE INDEX IF NOT EXISTS idx_task_queue_created     ON task_queue(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_log_created   ON activity_log(created_at DESC);

-- ── DISABLE RLS (internal admin data, auth handled at API layer) ──
ALTER TABLE clients       DISABLE ROW LEVEL SECURITY;
ALTER TABLE service_states DISABLE ROW LEVEL SECURITY;
ALTER TABLE task_queue    DISABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log  DISABLE ROW LEVEL SECURITY;

-- ── APP_CONFIG ─────────────────────────────────────────────
-- One row per client per app; config stored as JSONB for schema flexibility
CREATE TABLE IF NOT EXISTS app_config (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id  UUID        NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  app        TEXT        NOT NULL
                         CHECK (app IN ('guest_app', 'staff_app', 'owner_dashboard')),
  config     JSONB       NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (client_id, app)
);

CREATE INDEX IF NOT EXISTS idx_app_config_client ON app_config(client_id);

ALTER TABLE app_config DISABLE ROW LEVEL SECURITY;

-- ── SEED: TORRIDONIA ───────────────────────────────────────
-- Idempotent: safe to re-run
DO $$
DECLARE v_client_id UUID;
BEGIN
  INSERT INTO clients (name, slug, property_type, beds, country, plan)
  VALUES ('Torridonia', 'torridonia', 'hostel', 23, 'Scotland', 'pro')
  ON CONFLICT (slug) DO NOTHING
  RETURNING id INTO v_client_id;

  IF v_client_id IS NOT NULL THEN
    INSERT INTO service_states (client_id, service, status, enabled, last_checked)
    VALUES
      (v_client_id, 'guest_app',       'online', true, now()),
      (v_client_id, 'staff_app',       'online', true, now()),
      (v_client_id, 'owner_dashboard', 'online', true, now());
  END IF;
END $$;
