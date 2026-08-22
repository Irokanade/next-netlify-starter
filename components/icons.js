import L from 'leaflet'

const COLORS = {
  libraries: '#ffd5e0',
  campus: '#cdead2',
  parks: '#b8d8b8',
  landmarks: '#ffe0c2',
  museums: '#e4d4f4',
  eats: '#fff2b8',
}

const PATHS = {
  libraries:
    '<path d="M4 4h6a3 3 0 0 1 3 3v13H6a2 2 0 0 1-2-2V4zm10 3a3 3 0 0 1 3-3h4v14a2 2 0 0 1-2 2h-5V7z"/>',
  campus:
    '<path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm-7 9.99V15c0 1.66 3.14 3 7 3s7-1.34 7-3v-2.01L12 17 5 12.99z"/>',
  parks:
    '<path d="M12 2 4 14h4l-3 6h4v2h6v-2h4l-3-6h4z"/>',
  landmarks:
    '<path d="M12 2 14 9 21 11 14 13 12 20 10 13 3 11 10 9z"/>',
  museums:
    '<path d="M12 3 3 8v2h18V8L12 3zM5 12v6H4v2h16v-2h-1v-6h-2v6h-3v-6h-2v6h-2v-6H9v6H6v-6H5z"/>',
  eats:
    '<path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>',
}

const html = (category) => `
  <div class="pin-wrap" style="background:${COLORS[category]}">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#4a3a52" aria-hidden="true">
      ${PATHS[category]}
    </svg>
  </div>
`

export function makeIcon(category) {
  return L.divIcon({
    className: 'pastel-pin',
    html: html(category),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -36],
  })
}

export function categoryColor(category) {
  return COLORS[category]
}
