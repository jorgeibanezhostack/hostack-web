import { useState, useEffect, useCallback } from 'react'

export default function useAppConfig(clientId, app, session) {
  const [config, setConfig]   = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState(null)

  const token = session?.access_token

  const fetchConfig = useCallback(async () => {
    if (!token || !clientId || !app) return
    setLoading(true)
    try {
      const res = await fetch(
        `/api/command-center/app-config?client_id=${clientId}&app=${app}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (!res.ok) throw new Error('Failed to fetch config')
      const data = await res.json()
      setConfig(data.config)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token, clientId, app])

  useEffect(() => { fetchConfig() }, [fetchConfig])

  const saveConfig = async (partialConfig) => {
    if (!token) return
    setSaving(true)
    setError(null)
    try {
      const merged = { ...config, ...partialConfig }
      const res = await fetch('/api/command-center/app-config', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ client_id: clientId, app, config: merged }),
      })
      if (!res.ok) throw new Error('Failed to save config')
      const data = await res.json()
      setConfig(data.config)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return { config, loading, saving, error, saveConfig }
}
