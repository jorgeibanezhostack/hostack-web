#!/usr/bin/env node
/**
 * Hostack Command Center — Database Setup Script
 *
 * Runs the schema.sql against your Supabase project using the
 * service role key (required for DDL + disabling RLS).
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
 *   node scripts/migrate.js
 *
 * Or with a .env file:
 *   node scripts/migrate.js
 */

import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load .env if present (no dotenv dependency — manual parse)
try {
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

const SUPABASE_URL             = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  console.error('   Set them in .env or as environment variables.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const __dir  = dirname(fileURLToPath(import.meta.url))
const sqlPath = join(__dir, '../supabase/schema.sql')
const sql    = readFileSync(sqlPath, 'utf8')

// Split on statement boundaries, filter blanks, skip comments-only blocks
const statements = sql
  .split(/;\s*\n/)
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'))

console.log(`\n🚀  Hostack Command Center — Database Migration`)
console.log(`   Project: ${SUPABASE_URL}`)
console.log(`   Statements: ${statements.length}\n`)

let ok = 0, fail = 0
for (const stmt of statements) {
  const preview = stmt.slice(0, 60).replace(/\n/g, ' ')
  try {
    const { error } = await supabase.rpc('exec_sql', { query: stmt + ';' }).catch(() => ({ error: { message: 'rpc not available' }}))
    if (error && error.message !== 'rpc not available') throw error

    // Fallback: use postgres REST direct query endpoint (service role only)
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ query: stmt + ';' }),
    })

    if (!resp.ok) {
      const text = await resp.text()
      // Ignore "already exists" errors (idempotent)
      if (text.includes('already exists') || text.includes('42P07') || text.includes('42710')) {
        console.log(`  ✓  (exists) ${preview}…`)
        ok++
        continue
      }
      throw new Error(text)
    }
    console.log(`  ✓  ${preview}…`)
    ok++
  } catch (err) {
    const msg = err.message || String(err)
    if (msg.includes('already exists') || msg.includes('42P07') || msg.includes('42710')) {
      console.log(`  ✓  (exists) ${preview}…`)
      ok++
    } else {
      console.error(`  ✗  ${preview}… → ${msg}`)
      fail++
    }
  }
}

console.log(`\n${fail === 0 ? '✅' : '⚠️'} Done — ${ok} OK, ${fail} failed\n`)

if (fail > 0) {
  console.log('👉  Some statements failed. This is normal if tables already exist.')
  console.log('   If tables are NEW and failing, check your service role key and network access.')
  console.log('   You can also paste supabase/schema.sql directly into the Supabase SQL Editor.\n')
}
