/**
 * Trip-planner model + persistence.
 *
 * A trip is an ordered list of days; each day is an ordered list of cards.
 * Cards come in two kinds:
 *   - 'place'  — references a POI from data/places.js by placeId.
 *   - 'custom' — a free-form card the user typed in ("Lunch — decide on the
 *                spot", "Free & easy afternoon"). Optionally carries coords,
 *                in which case it also shows up as a pin on the map.
 *
 * Every card has its own `uid`, so the same place can appear many times
 * (come back to Kerry Park at sunset) and each copy keeps its own note/time.
 *
 * @typedef {{
 *   uid: string,
 *   kind: 'place' | 'custom',
 *   placeId?: string,              // kind === 'place'
 *   name?: string,                 // kind === 'custom'
 *   category?: string,             // kind === 'custom' — a category id, or 'plan'
 *   coords?: [number, number] | null, // kind === 'custom' — set = show a pin
 *   address?: string,              // kind === 'custom'
 *   time?: string,                 // free text: '9:30', 'sunset', 'after dinner'
 *   note?: string
 * }} TripCard
 *
 * @typedef {{ id: string, title: string, subtitle: string, cards: TripCard[] }} TripDay
 * @typedef {{ version: number, title: string, days: TripDay[] }} Trip
 */

export const STORAGE_KEY = 'seattle-guide:trip:v1'
export const TRIP_VERSION = 1

/**
 * Pseudo-category for custom cards that aren't really any of the real ones.
 * Not added to data/categories.js on purpose — it must not show up as a
 * filter chip next to the real categories.
 */
export const PLAN_CATEGORY = {
  id: 'plan',
  label: 'Plan',
  color: '#d6ecff',
  glyph:
    '<path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14v11z"/>',
}

let counter = 0
export function uid(prefix = 'c') {
  counter += 1
  const rand =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10)
  return `${prefix}_${rand}${counter.toString(36)}`
}

export function makeDay(index, overrides = {}) {
  return {
    id: uid('d'),
    title: `Day ${index + 1}`,
    subtitle: '',
    cards: [],
    ...overrides,
  }
}

export function makeTrip() {
  return {
    version: TRIP_VERSION,
    title: 'My Seattle Trip',
    days: [makeDay(0), makeDay(1)],
  }
}

export function makePlaceCard(placeId) {
  return { uid: uid('p'), kind: 'place', placeId, time: '', note: '' }
}

export function makeCustomCard(overrides = {}) {
  return {
    uid: uid('x'),
    kind: 'custom',
    name: 'New card',
    category: PLAN_CATEGORY.id,
    coords: null,
    address: '',
    time: '',
    note: '',
    ...overrides,
  }
}

/* ---------------------------------------------------------------- storage */

/** Read the saved trip. Returns null when there's nothing usable stored. */
export function loadTrip() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return normalizeTrip(JSON.parse(raw))
  } catch {
    return null
  }
}

export function saveTrip(trip) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trip))
  } catch {
    /* quota or private mode — the in-memory trip still works */
  }
}

/**
 * Coerce anything (old save, hand-edited import) into a valid trip, dropping
 * what doesn't fit rather than throwing. Returns null if it isn't a trip.
 */
export function normalizeTrip(raw) {
  if (!raw || typeof raw !== 'object' || !Array.isArray(raw.days)) return null
  const days = raw.days
    .filter((d) => d && typeof d === 'object')
    .map((d, i) => ({
      id: typeof d.id === 'string' ? d.id : uid('d'),
      title: typeof d.title === 'string' ? d.title : `Day ${i + 1}`,
      subtitle: typeof d.subtitle === 'string' ? d.subtitle : '',
      cards: Array.isArray(d.cards) ? d.cards.map(normalizeCard).filter(Boolean) : [],
    }))
  return {
    version: TRIP_VERSION,
    title: typeof raw.title === 'string' ? raw.title : 'My Seattle Trip',
    days: days.length ? days : [makeDay(0)],
  }
}

function normalizeCard(c) {
  if (!c || typeof c !== 'object') return null
  const base = {
    uid: typeof c.uid === 'string' ? c.uid : uid('c'),
    time: typeof c.time === 'string' ? c.time : '',
    note: typeof c.note === 'string' ? c.note : '',
  }
  if (c.kind === 'custom') {
    return {
      ...base,
      kind: 'custom',
      name: typeof c.name === 'string' && c.name ? c.name : 'Untitled',
      category: typeof c.category === 'string' ? c.category : PLAN_CATEGORY.id,
      coords: validCoords(c.coords) ? [Number(c.coords[0]), Number(c.coords[1])] : null,
      address: typeof c.address === 'string' ? c.address : '',
    }
  }
  if (typeof c.placeId !== 'string') return null
  return { ...base, kind: 'place', placeId: c.placeId }
}

export function validCoords(v) {
  return (
    Array.isArray(v) &&
    v.length === 2 &&
    Number.isFinite(Number(v[0])) &&
    Number.isFinite(Number(v[1])) &&
    Math.abs(Number(v[0])) <= 90 &&
    Math.abs(Number(v[1])) <= 180
  )
}

/* ------------------------------------------------------ card ↔ POI bridge */

/**
 * Flatten a card into the shape the map/sidebar already understand, so a
 * custom card with coords can be rendered by the existing Poi components.
 * Returns null for cards that have nothing to show on a map.
 */
export function cardToPoi(card, placeMap) {
  if (card.kind === 'place') return placeMap[card.placeId] || null
  if (!card.coords) return null
  return {
    id: `trip:${card.uid}`,
    name: card.name,
    category: card.category || PLAN_CATEGORY.id,
    coords: card.coords,
    address: card.address || '',
    image: null,
    description: card.note || 'Added while planning the trip.',
  }
}

/** Every pinned custom card across the whole trip, as map-ready POIs. */
export function tripPins(trip, placeMap) {
  const out = []
  for (const day of trip.days) {
    for (const card of day.cards) {
      if (card.kind !== 'custom') continue
      const poi = cardToPoi(card, placeMap)
      if (poi) out.push(poi)
    }
  }
  return out
}

/* --------------------------------------------------------- day/card edits */

export function findCard(days, cardUid) {
  for (let d = 0; d < days.length; d += 1) {
    const i = days[d].cards.findIndex((c) => c.uid === cardUid)
    if (i !== -1) return { dayIndex: d, cardIndex: i, card: days[d].cards[i] }
  }
  return null
}

/** Insert `card` into day `dayIndex` at `cardIndex` (clamped). Pure. */
export function insertCard(days, card, dayIndex, cardIndex) {
  return days.map((day, d) => {
    if (d !== dayIndex) return day
    const cards = day.cards.slice()
    cards.splice(clamp(cardIndex, 0, cards.length), 0, card)
    return { ...day, cards }
  })
}

/**
 * Move an existing card so it ends up at `cardIndex` of day `dayIndex`.
 * `cardIndex` is a position in the *resulting* list (arrayMove semantics),
 * which is what dnd-kit's over-index gives us.
 */
export function moveCard(days, cardUid, dayIndex, cardIndex) {
  const found = findCard(days, cardUid)
  if (!found) return days
  const without = days.map((day, d) =>
    d === found.dayIndex
      ? { ...day, cards: day.cards.filter((c) => c.uid !== cardUid) }
      : day,
  )
  return insertCard(without, found.card, dayIndex, cardIndex)
}

export function removeCard(days, cardUid) {
  return days.map((day) => ({ ...day, cards: day.cards.filter((c) => c.uid !== cardUid) }))
}

export function updateCard(days, cardUid, patch) {
  return days.map((day) => ({
    ...day,
    cards: day.cards.map((c) => (c.uid === cardUid ? { ...c, ...patch } : c)),
  }))
}

export function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n))
}
