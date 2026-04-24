import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
}

async function verifyToken(req, res) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) { res.status(401).json({ error: 'Unauthorized' }); return null }
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) { res.status(401).json({ error: 'Invalid token' }); return null }
  return user
}

function verifyApiKey(req) {
  const key = req.headers['x-api-key']
  return key && key === process.env.COMMAND_CENTER_API_KEY
}

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v))
  if (req.method === 'OPTIONS') return res.status(200).end()

  const isAgent = verifyApiKey(req)

  // GET and PATCH accept both human JWT and agent API key
  if (req.method === 'GET' || req.method === 'PATCH') {
    if (!isAgent) {
      const user = await verifyToken(req, res)
      if (!user) return
    }
  }

  // POST requires human JWT only
  if (req.method === 'POST') {
    const user = await verifyToken(req, res)
    if (!user) return
  }

  // ── GET — list tasks ──────────────────────────────────────
  if (req.method === 'GET') {
    let query = supabase
      .from('task_queue')
      .select('*, clients(name, slug)')
      .order('created_at', { ascending: false })
      .limit(parseInt(req.query.limit || '50', 10))

    if (req.query.status) query = query.eq('status', req.query.status)
    if (req.query.client_id) query = query.eq('client_id', req.query.client_id)

    const { data, error } = await query
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ tasks: data })
  }

  // ── POST — create task ────────────────────────────────────
  if (req.method === 'POST') {
    const { title, description, task_type, priority, client_id } = req.body
    if (!title) return res.status(400).json({ error: 'title is required' })

    const { data: task, error } = await supabase
      .from('task_queue')
      .insert({
        title,
        description: description || null,
        task_type: task_type || 'other',
        priority:  priority  || 'medium',
        client_id: client_id || null,
      })
      .select('*, clients(name, slug)')
      .single()

    if (error) return res.status(500).json({ error: error.message })

    await supabase.from('activity_log').insert({
      client_id: client_id || null,
      action: `Task created: "${title}"`,
      actor: 'human',
      metadata: { task_id: task.id, task_type, priority },
    })

    return res.status(201).json({ task })
  }

  // ── PATCH — update task status (human or agent) ───────────
  if (req.method === 'PATCH') {
    const { id, status, result, assigned_agent } = req.body
    if (!id || !status) return res.status(400).json({ error: 'id and status are required' })

    const updates = { status, updated_at: new Date().toISOString() }
    if (result         !== undefined) updates.result         = result
    if (assigned_agent !== undefined) updates.assigned_agent = assigned_agent
    if (status === 'completed' || status === 'failed') {
      updates.completed_at = new Date().toISOString()
    }

    const { data: task, error } = await supabase
      .from('task_queue')
      .update(updates)
      .eq('id', id)
      .select('*, clients(name, slug)')
      .single()

    if (error) return res.status(500).json({ error: error.message })

    await supabase.from('activity_log').insert({
      client_id: task.client_id || null,
      action: `Task "${task.title}" → ${status}${result ? `: ${result.slice(0, 80)}` : ''}`,
      actor: isAgent ? 'agent' : 'human',
      metadata: { task_id: id, status, assigned_agent },
    })

    return res.status(200).json({ task })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
