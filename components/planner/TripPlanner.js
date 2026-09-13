import { useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import DayColumn, { dayDroppableId } from './DayColumn'
import PlacePalette from './PlacePalette'
import { CardFace } from './TripCard'
import {
  clamp,
  findCard,
  insertCard,
  makeCustomCard,
  makeDay,
  makePlaceCard,
  makeTrip,
  moveCard,
  normalizeTrip,
  removeCard,
  updateCard,
  uid,
} from '@lib/trip'
import styles from './Planner.module.css'

/**
 * Where a drag should land, as (day, index). For a card already in the day
 * we're hovering, dnd-kit's sortable strategy has already shifted the list,
 * so the over-index is used as-is; for anything arriving from elsewhere we
 * pick the near or far side of the hovered card from the pointer position.
 */
function resolveTarget(days, event, activeDayIndex) {
  const { over, active } = event
  if (!over) return null

  if (typeof over.id === 'string' && over.id.startsWith('day:')) {
    const dayIndex = days.findIndex((d) => dayDroppableId(d.id) === over.id)
    if (dayIndex === -1) return null
    return { dayIndex, index: days[dayIndex].cards.length }
  }

  const found = findCard(days, over.id)
  if (!found) return null
  if (activeDayIndex === found.dayIndex) {
    return { dayIndex: found.dayIndex, index: found.cardIndex }
  }

  const rect = active.rect.current.translated
  const below =
    rect && over.rect
      ? rect.top + rect.height / 2 > over.rect.top + over.rect.height / 2
      : false
  return { dayIndex: found.dayIndex, index: found.cardIndex + (below ? 1 : 0) }
}

export default function TripPlanner({ trip, setTrip, places, categories, categoryMap }) {
  const [editingUid, setEditingUid] = useState(null)
  const [targetDayIndex, setTargetDayIndex] = useState(0)
  const [drag, setDrag] = useState(null) // { type, placeId?, uid? } — for the overlay
  const dragRef = useRef(null) // same value, readable synchronously inside handlers
  const [dropPreview, setDropPreview] = useState(null) // { dayIndex, index }
  const importRef = useRef(null)

  const placeMap = useMemo(() => {
    const m = Object.create(null)
    for (const p of places) m[p.id] = p
    return m
  }, [places])

  const days = trip.days
  const safeTargetDay = clamp(targetDayIndex, 0, days.length - 1)
  const totalCards = days.reduce((n, d) => n + d.cards.length, 0)

  const setDays = (updater) =>
    setTrip((t) => ({ ...t, days: typeof updater === 'function' ? updater(t.days) : updater }))

  /* ------------------------------------------------------------ mutations */

  const addDay = () =>
    setTrip((t) => ({ ...t, days: [...t.days, makeDay(t.days.length)] }))

  const removeDay = (dayIndex) =>
    setTrip((t) => {
      const next = t.days.filter((_, i) => i !== dayIndex)
      return { ...t, days: next.length ? next : [makeDay(0)] }
    })

  const moveDay = (from, to) =>
    setDays((d) => {
      if (to < 0 || to >= d.length) return d
      const next = d.slice()
      next.splice(to, 0, next.splice(from, 1)[0])
      return next
    })

  const patchDay = (dayIndex, patch) =>
    setDays((d) => d.map((day, i) => (i === dayIndex ? { ...day, ...patch } : day)))

  const addPlaceCard = (placeId, dayIndex = safeTargetDay) =>
    setDays((d) => insertCard(d, makePlaceCard(placeId), dayIndex, d[dayIndex].cards.length))

  const addCustomCard = (dayIndex = safeTargetDay) => {
    const card = makeCustomCard({ name: '' })
    setDays((d) => insertCard(d, card, dayIndex, d[dayIndex].cards.length))
    setEditingUid(card.uid)
  }

  const duplicateCard = (cardUid) =>
    setDays((d) => {
      const found = findCard(d, cardUid)
      if (!found) return d
      const copy = { ...found.card, uid: uid(found.card.kind === 'place' ? 'p' : 'x') }
      return insertCard(d, copy, found.dayIndex, found.cardIndex + 1)
    })

  const deleteCard = (cardUid) => {
    setDays((d) => removeCard(d, cardUid))
    setEditingUid((cur) => (cur === cardUid ? null : cur))
  }

  const patchCard = (cardUid, patch) => setDays((d) => updateCard(d, cardUid, patch))

  const relocateCard = (cardUid, dayIndex, index) =>
    setDays((d) => moveCard(d, cardUid, clamp(dayIndex, 0, d.length - 1), Math.max(0, index)))

  /* ---------------------------------------------------------------- drag */

  // Mouse drags after a few px so plain clicks still register; touch needs a
  // short press so a finger swipe scrolls the list instead of grabbing a card.
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const activeDayIndex = drag?.uid ? findCard(days, drag.uid)?.dayIndex ?? null : null

  const onDragStart = ({ active }) => {
    setEditingUid(null)
    const next =
      active.data.current?.type === 'palette'
        ? { type: 'palette', placeId: active.data.current.placeId }
        : { type: 'card', uid: active.id }
    dragRef.current = next
    setDrag(next)
  }

  const onDragOver = (event) => {
    const current = dragRef.current
    if (!current) return
    const target = resolveTarget(days, event, activeDayIndex)
    if (current.type === 'palette') {
      setDropPreview((prev) =>
        prev?.dayIndex === target?.dayIndex && prev?.index === target?.index ? prev : target,
      )
      return
    }
    // Hop between days live so the columns resize under the cursor; the
    // within-a-day reorder is settled on drop by the sortable strategy.
    if (target && activeDayIndex != null && target.dayIndex !== activeDayIndex) {
      setDays((d) => moveCard(d, current.uid, target.dayIndex, target.index))
    }
  }

  const onDragEnd = (event) => {
    const current = dragRef.current
    const target = resolveTarget(days, event, activeDayIndex)
    if (current?.type === 'palette' && target) {
      setDays((d) => insertCard(d, makePlaceCard(current.placeId), target.dayIndex, target.index))
    } else if (current?.type === 'card' && target) {
      setDays((d) => moveCard(d, current.uid, target.dayIndex, target.index))
    }
    dragRef.current = null
    setDrag(null)
    setDropPreview(null)
  }

  const onDragCancel = () => {
    dragRef.current = null
    setDrag(null)
    setDropPreview(null)
  }

  /* --------------------------------------------------------- import/export */

  const exportTrip = () => {
    const blob = new Blob([JSON.stringify(trip, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(trip.title || 'trip').replace(/[^\w-]+/g, '-').toLowerCase()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importTrip = async (file) => {
    if (!file) return
    try {
      const parsed = normalizeTrip(JSON.parse(await file.text()))
      if (!parsed) throw new Error('not a trip')
      setTrip(parsed)
      setTargetDayIndex(0)
    } catch {
      window.alert("That file doesn't look like a saved trip.")
    }
  }

  const resetTrip = () => {
    if (totalCards && !window.confirm('Clear the whole trip and start over?')) return
    setTrip(makeTrip())
    setTargetDayIndex(0)
  }

  /* -------------------------------------------------------------- overlay */

  let overlay = null
  if (drag?.type === 'palette') {
    const place = placeMap[drag.placeId]
    if (place) {
      overlay = (
        <CardFace
          card={{ kind: 'place', placeId: place.id, time: '', note: '' }}
          poi={place}
          category={categoryMap[place.category]}
          overlay
        />
      )
    }
  } else if (drag?.type === 'card') {
    const found = findCard(days, drag.uid)
    if (found) {
      const c = found.card
      overlay = (
        <CardFace
          card={c}
          poi={c.kind === 'place' ? placeMap[c.placeId] : null}
          category={categoryMap[c.kind === 'custom' ? c.category : placeMap[c.placeId]?.category]}
          index={found.cardIndex}
          overlay
        />
      )
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div className={styles.planner}>
        <div className={styles.toolbar}>
          <input
            className={styles.tripTitle}
            value={trip.title}
            onChange={(e) => setTrip((t) => ({ ...t, title: e.target.value }))}
            aria-label="Trip title"
            placeholder="My Seattle Trip"
          />
          <span className={styles.tripStat}>
            {days.length} {days.length === 1 ? 'day' : 'days'} · {totalCards}{' '}
            {totalCards === 1 ? 'card' : 'cards'}
          </span>
          <span className={styles.toolbarSpacer} />
          <button type="button" className={styles.toolBtn} onClick={addDay}>
            + Add day
          </button>
          <button type="button" className={styles.toolBtn} onClick={exportTrip}>
            Export
          </button>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={() => importRef.current?.click()}
          >
            Import
          </button>
          <button type="button" className={`${styles.toolBtn} ${styles.danger}`} onClick={resetTrip}>
            Reset
          </button>
          <input
            ref={importRef}
            type="file"
            accept="application/json,.json"
            className={styles.srOnly}
            onChange={(e) => {
              importTrip(e.target.files?.[0])
              e.target.value = ''
            }}
          />
        </div>

        <p className={styles.savedNote}>
          Saved in this browser automatically. Drag a place onto a day, drop cards between days
          to reorder, and add the same spot twice if you&apos;re coming back.
        </p>

        <div className={styles.layout}>
          <PlacePalette
            places={places}
            categories={categories}
            categoryMap={categoryMap}
            days={days}
            targetDayIndex={safeTargetDay}
            onTargetDayChange={setTargetDayIndex}
            onAddPlace={addPlaceCard}
            onAddCustom={() => addCustomCard()}
          />

          <div className={styles.board}>
            {days.map((day, i) => (
              <DayColumn
                key={day.id}
                day={day}
                dayIndex={i}
                dayCount={days.length}
                days={days}
                categories={categories}
                categoryMap={categoryMap}
                placeMap={placeMap}
                editingUid={editingUid}
                dropPreview={dropPreview?.dayIndex === i ? dropPreview.index : null}
                onPatchDay={(patch) => patchDay(i, patch)}
                onRemoveDay={() => removeDay(i)}
                onMoveDay={(to) => moveDay(i, to)}
                onAddCustom={() => addCustomCard(i)}
                onPatchCard={patchCard}
                onMoveCard={relocateCard}
                onDuplicateCard={duplicateCard}
                onRemoveCard={deleteCard}
                onEditCard={setEditingUid}
              />
            ))}
            <button type="button" className={styles.addDayColumn} onClick={addDay}>
              <span aria-hidden="true">+</span>
              Add day
            </button>
          </div>
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(.2,.8,.3,1)' }}>
        {overlay && (
          // A little lift and tilt so the card reads as picked up off the board.
          <motion.div
            initial={{ scale: 1, rotate: 0 }}
            animate={{ scale: 1.03, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 520, damping: 30 }}
          >
            {overlay}
          </motion.div>
        )}
      </DragOverlay>
    </DndContext>
  )
}

