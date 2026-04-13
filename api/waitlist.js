import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://yskzkobduekupiobrbxr.supabase.co'
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlza3prb2JkdWVrdXBpb2JyYnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NjAxNjAsImV4cCI6MjA5MDEzNjE2MH0.5t6mm90F7k_8zXVVzUJAYzFA4IoNdTm6-UTRWFzsjfg'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, property_name, manager_name, tier_interest, notes } = req.body || {}

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const { error } = await supabase.from('waitlist_signups').insert({
    email,
    property_name: property_name || null,
    manager_name: manager_name || null,
    tier_interest: tier_interest || 'Not Sure',
    notes: notes || null,
  })

  if (error) {
    console.error('[waitlist] Supabase error:', error)
    return res.status(500).json({ error: 'Failed to save. Please try again.' })
  }

  return res.status(200).json({ success: true, message: "You're in!" })
}
