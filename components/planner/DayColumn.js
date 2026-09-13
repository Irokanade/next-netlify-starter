import { AnimatePresence } from 'motion/react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableCard from './TripCard'
import CardEditor from './CardEditor'
import styles from './Planner.module.css'

export const dayDroppableId = (dayId) => `day:${dayId}`

/**
 * One day of the trip: an editable header plus a sortable, droppable stack of
 * cards. `dropPreview` is the index an incoming palette place would land at.
 * It's drawn as a line on the neighbouring card rather than as an inserted
 * slot — adding a node mid-drag would shift the list under the cursor and
 * make the collision detection chase itself.
 */
export default function DayColumn({
  day,
  dayIndex,
  dayCount,
  categoryMap,
  categories,
  placeMap,
  days,
  editingUid,
  dropPreview,
  onPatchDay,
  onRemoveDay,
  onMoveDay,
  onAddCustom,
  onPatchCard,
  onMoveCard,
  onDuplicateCard,
  onRemoveCard,
  onEditCard,
}) {
  const { setNodeRef } = useDroppable({
    id: dayDroppableId(day.id),
    data: { type: 'day', dayIndex },
  })

  const isOver = dropPreview != null
  const lastIndex = day.cards.length - 1

  return (
    <section className={`${styles.day} ${isOver ? styles.dayOver : ''}`}>
      <header className={styles.dayHead}>
        <div className={styles.dayTitles}>
          <input
            className={styles.dayTitle}
            value={day.title}
            onChange={(e) => onPatchDay({ title: e.target.value })}
            placeholder={`Day ${dayIndex + 1}`}
            aria-label={`Title for day ${dayIndex + 1}`}
          />
          <input
            className={styles.daySubtitle}
            value={day.subtitle}
            onChange={(e) => onPatchDay({ subtitle: e.target.value })}
            placeholder="Sat 20 Sep · night"
            aria-label={`Subtitle for day ${dayIndex + 1}`}
          />
        </div>
        <div className={styles.dayTools}>
          <span className={styles.dayCount}>{day.cards.length}</span>
          <button
            type="button"
            className={styles.iconBtn}
            disabled={dayIndex === 0}
            onClick={() => onMoveDay(dayIndex - 1)}
            aria-label="Move day earlier"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            disabled={dayIndex === dayCount - 1}
            onClick={() => onMoveDay(dayIndex + 1)}
            aria-label="Move day later"
          >
            →
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onRemoveDay}
            aria-label={`Delete ${day.title || `day ${dayIndex + 1}`}`}
          >
            ✕
          </button>
        </div>
      </header>

      <SortableContext items={day.cards.map((c) => c.uid)} strategy={verticalListSortingStrategy}>
        <ul className={styles.cardList} ref={setNodeRef}>
          <AnimatePresence initial={false}>
          {day.cards.length === 0 && (
            <li className={`${styles.dayEmpty} ${isOver ? styles.dayEmptyOver : ''}`}>
              Drag places here — or add a card for lunch, a nap, free &amp; easy…
            </li>
          )}
          {day.cards.map((card, i) => {
            const category =
              categoryMap[card.kind === 'custom' ? card.category : placeMap[card.placeId]?.category]
            const editing = editingUid === card.uid
            // The line sits above the card it would push down, except at the
            // very end of the list where it sits below the last card.
            const dropHint =
              dropPreview === i ? 'before' : dropPreview > lastIndex && i === lastIndex ? 'after' : null
            return (
              <SortableCard
                key={card.uid}
                card={card}
                poi={card.kind === 'place' ? placeMap[card.placeId] : null}
                category={category}
                index={i}
                dropHint={dropHint}
                actions={
                  <>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      aria-expanded={editing}
                      onClick={() => onEditCard(editing ? null : card.uid)}
                    >
                      {editing ? 'Close' : 'Edit'}
                    </button>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => onDuplicateCard(card.uid)}
                      title="Add another copy right below"
                    >
                      Duplicate
                    </button>
                    <button
                      type="button"
                      className={`${styles.iconBtn} ${styles.danger}`}
                      onClick={() => onRemoveCard(card.uid)}
                    >
                      Remove
                    </button>
                  </>
                }
                editor={
                  editing ? (
                    <CardEditor
                      card={card}
                      categories={categories}
                      days={days}
                      dayIndex={dayIndex}
                      cardIndex={i}
                      onPatch={(patch) => onPatchCard(card.uid, patch)}
                      onMove={(toDay, toIndex) => onMoveCard(card.uid, toDay, toIndex)}
                      onClose={() => onEditCard(null)}
                    />
                  ) : null
                }
              />
            )
          })}
          </AnimatePresence>
        </ul>
      </SortableContext>

      <button type="button" className={styles.addCardBtn} onClick={onAddCustom}>
        + Add a card
      </button>
    </section>
  )
}
