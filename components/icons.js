import L from 'leaflet'

const pinHtml = (category) => `
  <div class="pin-wrap" style="background:${category.color}">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#4a3a52" aria-hidden="true">
      ${category.glyph}
    </svg>
  </div>
`

/**
 * One icon per category, reused across every marker that shares it.
 *
 * This used to build a fresh L.divIcon per marker on every render, so any
 * state change (selecting a place, arming add-pin mode) rebuilt every pin's
 * icon and made react-leaflet swap the DOM for all of them. Leaflet builds
 * fresh DOM from the icon's options each time it places a marker, so sharing
 * one instance is safe.
 */
const cache = new Map()

export function makeIcon(category) {
  const key = `${category.id}|${category.color}`
  let icon = cache.get(key)
  if (!icon) {
    icon = L.divIcon({
      className: 'pastel-pin',
      html: pinHtml(category),
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -36],
    })
    cache.set(key, icon)
  }
  return icon
}
