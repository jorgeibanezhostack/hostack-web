#!/usr/bin/env node
/**
 * Hostack Command Center — Create Admin Auth User
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
 *   ADMIN_EMAIL=you@example.com \
 *   ADMIN_PASSWORD=YourPassword \
 *   node scripts/create-admin-user.js
 */

import { createClient } from '@supabase/supabase-js'

// Load .env if present
try {
  const { readFileSync } = await import('fs')
  const env = readFileSync('.env', 'utf8')
  for (const line of env.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq === -1) continue
    const k = t.slice(0, eq).trim()
    const v = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[k]) process.env[k] = v
  }
} catch {}

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('\n❌  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY\n')
  process.exit(1)
}
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('\n❌  Missing ADMIN_EMAIL or ADMIN_PASSWORD\n')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

console.log(`\n🔐  Creating admin user: ${ADMIN_EMAIL}`)

const { data, error } = await supabase.auth.admin.createUser({
  email:         ADMIN_EMAIL,
  password:      ADMIN_PASSWORD,
  email_confirm: true,
})

if (error) {
  if (/already registered|already exists/i.test(error.message)) {
    console.log('ℹ️   User already exists — updating password…')
    const { data: list } = await supabase.auth.admin.listUsers()
    const existing = list?.users?.find(u => u.email === ADMIN_EMAIL)
    if (existing) {
      const { error: e2 } = await supabase.auth.admin.updateUserById(existing.id, { password: ADMIN_PASSWORD })
      if (e2) { console.error('❌  Update failed:', e2.message); process.exit(1) }
      console.log(`✅  Password updated for ${ADMIN_EMAIL}`)
    }
  } else {
    console.error('❌  Failed:', error.message)
    process.exit(1)
  }
} else {
  console.log(`✅  User created: ${data.user.email}`)
}

console.log('\n👉  Sign in at /command-center/login\n')
