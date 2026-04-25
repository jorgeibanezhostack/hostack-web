#!/usr/bin/env node
/**
 * Hostack Command Center — Database Setup Script
 *
 * Applies supabase/schema.sql to your Supabase project using the
 * Management API (requires SUPABASE_ACCESS_TOKEN) or direct REST API.
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
 *   SUPABASE_ACCESS_TOKEN=sbp_... \
 *   node scripts/migrate.js
 *
 * SUPABASE_ACCESS_TOKEN: your personal access token from
 *   supabase.com → Account → Access Tokens → Generate new token
 *
 * If you don't have a PAT, open scripts/setup.html in your browser instead.
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load .env if present
try {
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

const SUPABASE_URL    = process.env.SUPABASE_URL
const SRV_KEY         = process.env.SUPABASE_SERVICE_ROLE_KEY
const PAT             = process.env.SUPABASE_ACCESS_TOKEN

if (!SUPABASE_URL || !SRV_KEY) {
  console.error('\n❌  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  console.error('   Set them in .env or as environment variables.\n')
  process.exit(1)
}

const ref   = new URL(SUPABASE_URL).hostname.split('.')[0]
const mgmtURL = `https://api.supabase.com/v1/projects/${ref}/database/query`

const __dir  = dirname(fileURLToPath(import.meta.url))
const sqlPath = join(__dir, '../supabase/schema.sql')
const rawSQL  = readFileSync(sqlPath, 'utf8')

// Split into individual statements
const statements = rawSQL
  .split(/;\s*\n/)
  .map(s => s.trim())
  .filter(s => s && !s.startsWith('--') && s !== 'END $$')

async function execSQL(sql) {
  if (!PAT) {
    throw new Error(
      'SUPABASE_ACCESS_TOKEN not set. Get one at: supabase.com → Account → Access Tokens\n' +
      '  Or open scripts/setup.html in your local browser for a no-token alternative.'
    )
  }

  const resp = await fetch(mgmtURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PAT}`,
    },
    body: JSON.stringify({ query: sql }),
  })
  const data = await resp.json().catch(() => ({}))
  if (!resp.ok) {
    throw new Error(data.error || data.message || `HTTP ${resp.status}`)
  }
  return data
}

console.log(`\n🚀  Hostack Command Center — Database Migration`)
console.log(`   Project: ${SUPABASE_URL} (ref: ${ref})`)
if (!PAT) {
  console.log(`\n⚠️   No SUPABASE_ACCESS_TOKEN found.`)
  console.log(`   → Get a PAT from: https://supabase.com/dashboard/account/tokens`)
  console.log(`   → Or open scripts/setup.html in your local browser (no PAT needed)\n`)
  process.exit(1)
}

console.log(`   Statements: ${statements.length}\n`)

let ok = 0, skipped = 0, failed = 0
for (const stmt of statements) {
  const preview = stmt.slice(0, 60).replace(/\n/g, ' ')
  try {
    await execSQL(stmt)
    console.log(`  ✓  ${preview}…`)
    ok++
  } catch (e) {
    const msg = e.message || String(e)
    if (/already exists|42P07|42710|23505/i.test(msg)) {
      console.log(`  ○  (exists) ${preview}…`)
      skipped++
    } else {
      console.error(`  ✗  ${preview}… → ${msg.split('\n')[0]}`)
      failed++
    }
  }
}

console.log(`\n${failed === 0 ? '✅' : '⚠️ '}  Done — ${ok} created, ${skipped} existed, ${failed} failed\n`)
