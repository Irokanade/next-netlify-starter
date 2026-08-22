import categories from '@data/categories'
import places from '@data/places'
import config from '@data/config'

/**
 * Single data-access point. Returns the shape a future /api/data endpoint
 * would return: { categories, places, config }.
 *
 * When switching to a real backend, change only this function to fetch and
 * make it async — page/components will need to await it, but their data
 * shape assumptions stay identical.
 */
export function getData() {
  return { categories, places, config }
}

/**
 * Build an id → category lookup once, so components can resolve a place's
 * category quickly. Returns a defensive "unknown" category for any id that
 * isn't in the list so a typo can't crash the map.
 */
export function buildCategoryMap(categoryList) {
  const map = Object.create(null)
  for (const c of categoryList) map[c.id] = c
  return new Proxy(map, {
    get(target, key) {
      if (key in target) return target[key]
      if (typeof key !== 'string') return undefined
      return {
        id: key,
        label: key,
        color: '#e6e6e6',
        glyph:
          '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>',
      }
    },
  })
}

/**
 * Resolve the map's initial center + zoom from config, given the places list.
 * Priority: defaultPoiId → defaultCenter → fallbackCenter.
 */
export function resolveMapView(config, places) {
  const m = config.map
  if (m.defaultPoiId) {
    const p = places.find((x) => x.id === m.defaultPoiId)
    if (p) return { center: p.coords, zoom: m.defaultZoom }
  }
  if (m.defaultCenter) return { center: m.defaultCenter, zoom: m.defaultZoom }
  return { center: m.fallbackCenter, zoom: m.defaultZoom }
}
