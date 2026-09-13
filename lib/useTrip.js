import { useEffect, useState } from 'react'
import { loadTrip, makeTrip, saveTrip } from './trip'

/**
 * The trip lives in localStorage, so it can't exist during SSR. `trip` is
 * null until the first client effect runs — callers render a placeholder for
 * that one frame rather than risking a hydration mismatch.
 */
export default function useTrip() {
  const [trip, setTrip] = useState(null)

  useEffect(() => {
    setTrip(loadTrip() || makeTrip())
  }, [])

  useEffect(() => {
    if (trip) saveTrip(trip)
  }, [trip])

  return [trip, setTrip]
}
