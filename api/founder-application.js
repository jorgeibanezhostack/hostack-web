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

  const {
    contact_name,
    property_name,
    property_website,
    whatsapp,
    email,
    staff_size,
    room_count,
    has_manuals,
    message,
  } = req.body || {}

  if (!contact_name || !email || !whatsapp) {
    return res.status(400).json({ error: 'Contact name, email, and WhatsApp are required' })
  }

  const { error } = await supabase.from('founder_member_applications').insert({
    contact_name,
    property_name: property_name || null,
    property_website: property_website || null,
    whatsapp,
    email,
    staff_size: staff_size || null,
    room_count: room_count || null,
    has_manuals: typeof has_manuals === 'boolean' ? has_manuals : null,
    message: message || null,
    status: 'pending',
  })

  if (error) {
    console.error('[founder-application] Supabase error:', error)
    return res.status(500).json({ error: 'Failed to submit. Please try again.' })
  }

  return res.status(200).json({
    success: true,
    message: "Thanks for applying! We'll review your application within 48 hours.",
  })
}
