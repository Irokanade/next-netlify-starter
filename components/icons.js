import L from 'leaflet'

const pinHtml = (category) => `
  <div class="pin-wrap" style="background:${category.color}">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#4a3a52" aria-hidden="true">
      ${category.glyph}
    </svg>
  </div>
`

export function makeIcon(category) {
  return L.divIcon({
    className: 'pastel-pin',
    html: pinHtml(category),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -36],
  })
}
