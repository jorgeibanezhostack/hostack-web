import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS',
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

  // GET ?client_id=<uuid>&app=<app>
  if (req.method === 'GET') {
    const { client_id, app } = req.query
    if (!client_id || !app) return res.status(400).json({ error: 'client_id and app are required' })

    const { data, error } = await supabase
      .from('app_config')
      .select('config')
      .eq('client_id', client_id)
      .eq('app', app)
      .single()

    // PGRST116 = no rows found — return empty config
    if (error && error.code !== 'PGRST116') return res.status(500).json({ error: error.message })
    return res.status(200).json({ config: data?.config || {} })
  }

  // PATCH { client_id, app, config }
  if (req.method === 'PATCH') {
    const { client_id, app, config } = req.body
    if (!client_id || !app || config === undefined) {
      return res.status(400).json({ error: 'client_id, app, and config are required' })
    }

    const { data, error } = await supabase
      .from('app_config')
      .upsert(
        { client_id, app, config, updated_at: new Date().toISOString() },
        { onConflict: 'client_id,app' }
      )
      .select('config')
      .single()

    if (error) return res.status(500).json({ error: error.message })

    await supabase.from('activity_log').insert({
      client_id,
      action: `${app.replace(/_/g, ' ')} config updated`,
      actor: 'human',
      metadata: { app },
    })

    return res.status(200).json({ config: data.config })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
