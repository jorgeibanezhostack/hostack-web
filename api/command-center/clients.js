import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

async function verifyToken(req, res) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) { res.status(401).json({ error: 'Unauthorized' }); return null }
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) { res.status(401).json({ error: 'Invalid token' }); return null }
  return user
}

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v))
  if (req.method === 'OPTIONS') return res.status(200).end()

  const user = await verifyToken(req, res)
  if (!user) return

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('clients')
      .select('*, service_states(*)')
      .order('created_at', { ascending: true })

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ clients: data })
  }

  if (req.method === 'POST') {
    const { name, slug, property_type, beds, country, plan, notes } = req.body
    if (!name || !slug || !country) {
      return res.status(400).json({ error: 'name, slug, country are required' })
    }

    const { data: client, error: clientErr } = await supabase
      .from('clients')
      .insert({ name, slug, property_type: property_type || 'hostel', beds: beds || 0, country, plan: plan || 'free', notes })
      .select()
      .single()

    if (clientErr) return res.status(500).json({ error: clientErr.message })

    // Seed the 3 service_states rows for this new client
    await supabase.from('service_states').insert([
      { client_id: client.id, service: 'guest_app',       status: 'online', enabled: true },
      { client_id: client.id, service: 'staff_app',       status: 'online', enabled: true },
      { client_id: client.id, service: 'owner_dashboard', status: 'online', enabled: true },
    ])

    await supabase.from('activity_log').insert({
      client_id: client.id,
      action: `Client "${name}" added`,
      actor: 'human',
      metadata: { slug, plan },
    })

    return res.status(201).json({ client })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
