export function fallbackFor(category) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'>` +
    `<rect width='600' height='400' fill='${category.color}'/>` +
    `<g transform='translate(228 108) scale(6)' fill='#4a3a52' opacity='0.35'>${category.glyph}</g>` +
    `</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export function handleImgError(category) {
  return (e) => {
    const el = e.currentTarget
    if (el.dataset.fallback === '1') return
    el.dataset.fallback = '1'
    el.src = fallbackFor(category)
  }
}
