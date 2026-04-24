import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export default function useClients(session) {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const token = session?.access_token

  const fetchClients = useCallback(async () => {
    if (!token) return
    setLoading(true)
    try {
      const res = await fetch('/api/command-center/clients', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Failed to fetch clients')
      const data = await res.json()
      setClients(data.clients)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => { fetchClients() }, [fetchClients])

  // Patch service_states in local state via Realtime — no full reload needed
  useEffect(() => {
    const channel = supabase
      .channel('command-center:service_states')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'service_states' },
        (payload) => {
          const updated = payload.new
          setClients(prev => prev.map(client => {
            if (client.id !== updated.client_id) return client
            return {
              ...client,
              service_states: client.service_states.map(s =>
                s.service === updated.service ? { ...s, ...updated } : s
              ),
            }
          }))
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const toggleService = async (clientId, service, enabled, token) => {
    await fetch('/api/command-center/service-states', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ clientId, service, enabled }),
    })
    // Realtime subscription updates local state automatically
  }

  return { clients, loading, error, toggleService, refetch: fetchClients }
}
