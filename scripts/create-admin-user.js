#!/usr/bin/env node
/**
 * Hostack Command Center — Create Admin Auth User
 *
 * Creates a Supabase Auth user with email+password for signing in
 * to the Command Center at /command-center/login.
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
 *   ADMIN_EMAIL=jorge@hostack.io \
 *   ADMIN_PASSWORD=YourSecurePassword123! \
 *   node scripts/create-admin-user.js
 */

// Load .env if present
try {
  const { readFileSync } = await import('fs')
  const env = readFileSync('.env', 'utf8')
  for (const line of env.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
} catch {}

const SUPABASE_URL              = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY
const ADMIN_EMAIL               = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD            = process.env.ADMIN_PASSWORD

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('❌  Missing ADMIN_EMAIL or ADMIN_PASSWORD')
  process.exit(1)
}
if (ADMIN_PASSWORD.length < 8) {
  console.error('❌  ADMIN_PASSWORD must be at least 8 characters')
  process.exit(1)
}

console.log(`\n🔐  Creating admin user: ${ADMIN_EMAIL}`)
console.log(`   Project: ${SUPABASE_URL}\n`)

const { createClient } = await import('@supabase/supabase-js')
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const { data, error } = await supabase.auth.admin.createUser({
  email:     ADMIN_EMAIL,
  password:  ADMIN_PASSWORD,
  email_confirm: true,  // skip email verification
})

if (error) {
  if (error.message.includes('already registered') || error.message.includes('already exists')) {
    console.log('ℹ️   User already exists — updating password…')
    const { data: users } = await supabase.auth.admin.listUsers()
    const existing = users?.users?.find(u => u.email === ADMIN_EMAIL)
    if (existing) {
      const { error: updateErr } = await supabase.auth.admin.updateUserById(existing.id, {
        password: ADMIN_PASSWORD,
      })
      if (updateErr) {
        console.error('❌  Failed to update user:', updateErr.message)
        process.exit(1)
      }
      console.log(`✅  Password updated for ${ADMIN_EMAIL}`)
    }
  } else {
    console.error('❌  Failed to create user:', error.message)
    process.exit(1)
  }
} else {
  console.log(`✅  Admin user created: ${data.user.email} (id: ${data.user.id})`)
}

console.log(`\n👉  You can now sign in at /command-center/login\n`)
