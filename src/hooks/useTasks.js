import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export default function useTasks(session) {
  const [tasks, setTasks]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  const token = session?.access_token

  const fetchTasks = useCallback(async () => {
    if (!token) return
    setLoading(true)
    try {
      const res = await fetch('/api/command-center/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Failed to fetch tasks')
      const data = await res.json()
      setTasks(data.tasks)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  useEffect(() => {
    const channel = supabase
      .channel('command-center:task_queue')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'task_queue' },
        (payload) => setTasks(prev => [payload.new, ...prev])
      )
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'task_queue' },
        (payload) => setTasks(prev => prev.map(t => t.id === payload.new.id ? payload.new : t))
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const createTask = async (taskData) => {
    const res = await fetch('/api/command-center/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    })
    if (!res.ok) throw new Error('Failed to create task')
    // Realtime INSERT event will prepend to tasks automatically
  }

  return { tasks, loading, error, createTask, refetch: fetchTasks }
}
