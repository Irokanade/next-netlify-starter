/**
 * "My places" — pins the user drops on the map themselves.
 *
 * These are deliberately the same shape as the built-in POIs in
 * data/places.js, so the map, the sidebar and the planner palette can all
 * treat them identically. The only extra field is `custom: true`, which is
 * what earns a pin its edit/delete controls.
 *
 * Stored under their own key rather than inside the trip: resetting an
 * itinerary shouldn't throw away places you mapped out.
 *
 * @typedef {{
 *   id: string,
 *   name: string,
 *   category: string,
 *   coords: [number, number],
 *   address: string,
 *   image: null,
 *   description: string,
 *   url?: string,
 *   custom: true
 * }} CustomPlace
 */

import { PLAN_CATEGORY, uid, validCoords } from './trip'

export const PLACES_KEY = 'seattle-guide:places:v1'

export function makeCustomPlace(coords, overrides = {}) {
  return {
    id: uid('my'),
    name: '',
    category: PLAN_CATEGORY.id,
    coords,
    address: '',
    image: null,
    description: '',
    url: '',
    custom: true,
    ...overrides,
  }
}

export function loadCustomPlaces() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(PLACES_KEY)
    if (!raw) return []
    return normalizeCustomPlaces(JSON.parse(raw))
  } catch {
    return []
  }
}

export function saveCustomPlaces(list) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(PLACES_KEY, JSON.stringify(list))
  } catch {
    /* quota or private mode — the in-memory list still works */
  }
}

/** Drop anything that isn't a usable pin rather than throwing. */
export function normalizeCustomPlaces(raw) {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((p) => p && typeof p === 'object' && validCoords(p.coords))
    .map((p) => ({
      id: typeof p.id === 'string' ? p.id : uid('my'),
      name: typeof p.name === 'string' && p.name ? p.name : 'My pin',
      category: typeof p.category === 'string' ? p.category : PLAN_CATEGORY.id,
      coords: [Number(p.coords[0]), Number(p.coords[1])],
      address: typeof p.address === 'string' ? p.address : '',
      image: null,
      description: typeof p.description === 'string' ? p.description : '',
      url: typeof p.url === 'string' ? p.url : '',
      custom: true,
    }))
}

/** Insert or replace by id, preserving order. */
export function upsertPlace(list, place) {
  const i = list.findIndex((p) => p.id === place.id)
  if (i === -1) return [...list, place]
  const next = list.slice()
  next[i] = place
  return next
}

export function deletePlace(list, id) {
  return list.filter((p) => p.id !== id)
}

/** How many trip cards point at this place — used to warn before deleting. */
export function countUsesInTrip(trip, placeId) {
  if (!trip) return 0
  let n = 0
  for (const day of trip.days) {
    for (const card of day.cards) {
      if (card.kind === 'place' && card.placeId === placeId) n += 1
    }
  }
  return n
}
