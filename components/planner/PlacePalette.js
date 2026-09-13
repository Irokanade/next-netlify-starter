import { useMemo, useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import CategoryChip from '../CategoryChip'
import CategoryFilter from '../CategoryFilter'
import { fallbackFor, handleImgError } from '../imgFallback'
import styles from './Planner.module.css'

export const paletteDraggableId = (placeId) => `palette:${placeId}`

function PaletteItem({ place, category, targetDayTitle, onAdd }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, isDragging } = useDraggable({
    id: paletteDraggableId(place.id),
    data: { type: 'palette', placeId: place.id },
  })
  const src = place.image ? place.image.replace('w=600', 'w=200') : fallbackFor(category)

  return (
    <li
      ref={setNodeRef}
      className={`${styles.paletteItem} ${isDragging ? styles.paletteItemDragging : ''}`}
      style={{ '--card-tint': category.color }}
    >
      {/* One control: drag it onto any day, or click to drop it at the end of
          the selected day — the phone / keyboard path. */}
      <button
        type="button"
        className={styles.paletteGrab}
        onClick={() => onAdd(place.id)}
        aria-label={`Add ${place.name} to ${targetDayTitle}`}
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
      >
        <img
          className={styles.paletteThumb}
          src={src}
          alt=""
          loading="lazy"
          onError={handleImgError(category)}
        />
        <span className={styles.paletteBody}>
          <CategoryChip category={category} />
          <span className={styles.paletteName}>{place.name}</span>
        </span>
        <span className={styles.paletteAdd} aria-hidden="true">
          +
        </span>
      </button>
    </li>
  )
}

/**
 * Source list for the board. Everything here is a drag handle; the `+` is the
 * no-drag path (phones, keyboards) and drops onto whichever day is selected
 * above the list.
 */
export default function PlacePalette({
  places,
  categories,
  categoryMap,
  days,
  targetDayIndex,
  onTargetDayChange,
  onAddPlace,
  onAddCustom,
}) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(() => new Set())

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return places.filter((p) => {
      if (active.size && !active.has(p.category)) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q)
      )
    })
  }, [places, active, query])

  const toggle = (id) =>
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <aside className={styles.palette} aria-label="Places you can add to the trip">
      <div className={styles.paletteHead}>
        <h3 className={styles.paletteHeading}>Places</h3>
        <span className={styles.dayCount}>{visible.length}</span>
      </div>

      <label className={styles.field}>
        <span className={styles.srOnly}>Search places</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search places…"
        />
      </label>

      <div className={styles.paletteFilters}>
        <CategoryFilter
          categories={categories}
          active={active}
          onToggle={toggle}
          onClear={() => setActive(new Set())}
        />
      </div>

      <label className={styles.field}>
        <span>Clicking a place adds it to</span>
        <select
          value={targetDayIndex}
          onChange={(e) => onTargetDayChange(Number(e.target.value))}
        >
          {days.map((d, i) => (
            <option key={d.id} value={i}>
              {d.title || `Day ${i + 1}`}
            </option>
          ))}
        </select>
      </label>

      <button type="button" className={styles.newCardBtn} onClick={onAddCustom}>
        + New blank card
        <span className={styles.newCardHint}>lunch, free &amp; easy, a nap…</span>
      </button>

      <ul className={styles.paletteList}>
        {visible.length === 0 && <li className={styles.dayEmpty}>Nothing matches that.</li>}
        {visible.map((p) => (
          <PaletteItem
            key={p.id}
            place={p}
            category={categoryMap[p.category]}
            targetDayTitle={days[targetDayIndex]?.title || `Day ${targetDayIndex + 1}`}
            onAdd={onAddPlace}
          />
        ))}
      </ul>
    </aside>
  )
}
