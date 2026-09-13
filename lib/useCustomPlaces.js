import { useEffect, useState } from 'react'
import { loadCustomPlaces, saveCustomPlaces } from './customPlaces'

/**
 * Custom pins live in localStorage, so they can't exist during SSR — the list
 * starts empty and fills in on the first client effect. `ready` guards the
 * save so a slow first paint can't write an empty list over real data.
 */
export default function useCustomPlaces() {
  const [places, setPlaces] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setPlaces(loadCustomPlaces())
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) saveCustomPlaces(places)
  }, [places, ready])

  return [places, setPlaces]
}
