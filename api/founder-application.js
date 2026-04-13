import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yskzkobduekupiobrbxr.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlza3prb2JkdWVrdXBpb2JyYnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NjAxNjAsImV4cCI6MjA5MDEzNjE2MH0.5t6mm90F7k_8zXVVzUJAYzFA4IoNdTm6-UTRWFzsjfg';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body || {};

  // Accept both camelCase and snake_case field names
  const contact_name    = body.contact_name    || body.contactName;
  const property_name   = body.property_name   || body.propertyName;
  const property_website = body.property_website || body.propertyWebsite || null;
  const whatsapp        = body.whatsapp;
  const email           = body.email;
  const staff_size      = body.staff_size      || body.staffSize;
  const room_count      = body.room_count      || body.roomCount;
  const has_manuals     = body.has_manuals     != null ? body.has_manuals : body.hasManuals;
  const message         = body.message         || null;

  if (!contact_name || !property_name || !whatsapp || !email || !staff_size || !room_count) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { error } = await supabase.from('founder_applications').insert([{
      contact_name,
      property_name,
      property_website,
      whatsapp,
      email,
      staff_size,
      room_count,
      has_manuals: typeof has_manuals === 'boolean' ? has_manuals : has_manuals === 'yes',
      message,
    }]);

    if (error) throw error;

    return res.status(200).json({ success: true, message: 'Application received' });
  } catch (err) {
    console.error('[founder-application]', err);
    return res.status(500).json({ error: 'Failed to submit application' });
  }
}
