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

  if (req.method === 'GET') {
    const { clientId } = req.query
    if (!clientId) return res.status(400).json({ error: 'clientId required' })

    const { data, error } = await supabase
      .from('service_states')
      .select('*')
      .eq('client_id', clientId)

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ states: data })
  }

  if (req.method === 'PATCH') {
    const { clientId, service, enabled, status } = req.body
    if (!clientId || !service) {
      return res.status(400).json({ error: 'clientId and service are required' })
    }

    const updates = { updated_at: new Date().toISOString() }
    if (enabled !== undefined) updates.enabled = enabled
    if (status  !== undefined) updates.status  = status

    const { data: state, error } = await supabase
      .from('service_states')
      .update(updates)
      .eq('client_id', clientId)
      .eq('service', service)
      .select()
      .single()

    if (error) return res.status(500).json({ error: error.message })

    const actionParts = []
    if (enabled !== undefined) actionParts.push(enabled ? 'enabled' : 'disabled')
    if (status  !== undefined) actionParts.push(`status → ${status}`)

    await supabase.from('activity_log').insert({
      client_id: clientId,
      action: `${service.replace(/_/g, ' ')} ${actionParts.join(', ')}`,
      actor: 'human',
      metadata: { service, enabled, status },
    })

    return res.status(200).json({ state })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
