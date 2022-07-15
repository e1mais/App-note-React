import { useState, useEffect } from 'react'

export default function useNote (dependencies) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})

  useEffect(() => {
    setLoading(true)
    window.fetch('http://localhost:8000/notes')
      .then(response => response.json())
      .then(setNotes)
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [dependencies])

  return { notes, loading, error }
}
