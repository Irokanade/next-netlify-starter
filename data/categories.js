/**
 * @typedef {{
 *   id: string,        // slug used by places.category
 *   label: string,     // shown in chips and filter buttons
 *   color: string,     // pastel hex — pin fill, chip background, fallback tint
 *   glyph: string      // inner SVG markup (e.g. '<path d="..."/>') — drawn at 24×24
 * }} Category
 */

/** @type {Category[]} */
const categories = [
  {
    id: 'libraries',
    label: 'Libraries',
    color: '#ffd5e0',
    glyph:
      '<path d="M4 4h6a3 3 0 0 1 3 3v13H6a2 2 0 0 1-2-2V4zm10 3a3 3 0 0 1 3-3h4v14a2 2 0 0 1-2 2h-5V7z"/>',
  },
  {
    id: 'campus',
    label: 'Campus',
    color: '#cdead2',
    glyph:
      '<path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm-7 9.99V15c0 1.66 3.14 3 7 3s7-1.34 7-3v-2.01L12 17 5 12.99z"/>',
  },
  {
    id: 'parks',
    label: 'Parks',
    color: '#b8d8b8',
    glyph: '<path d="M12 2 4 14h4l-3 6h4v2h6v-2h4l-3-6h4z"/>',
  },
  {
    id: 'landmarks',
    label: 'Landmarks',
    color: '#ffe0c2',
    glyph: '<path d="M12 2 14 9 21 11 14 13 12 20 10 13 3 11 10 9z"/>',
  },
  {
    id: 'museums',
    label: 'Museums',
    color: '#e4d4f4',
    glyph:
      '<path d="M12 3 3 8v2h18V8L12 3zM5 12v6H4v2h16v-2h-1v-6h-2v6h-3v-6h-2v6h-2v-6H9v6H6v-6H5z"/>',
  },
  {
    id: 'eats',
    label: 'Eats',
    color: '#fff2b8',
    glyph:
      '<path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>',
  },
  {
    id: 'coffee',
    label: 'Coffee',
    color: '#e8d5c4',
    glyph:
      '<path d="M4 3h13v5h2a3 3 0 0 1 0 6h-2v1a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V3zm13 7v2h2a1 1 0 0 0 0-2h-2zM3 21h15v2H3v-2z"/>',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    color: '#cfe3f5',
    glyph:
      '<path d="M9 6a3 3 0 0 1 6 0v1h4l1 14H4L5 7h4V6zm2 0v1h2V6a1 1 0 0 0-2 0zM8 10v2h2v-2H8zm6 0v2h2v-2h-2z"/>',
  },
]

export default categories
