import { PLAN_CATEGORY, validCoords } from '@lib/trip'
import styles from './Planner.module.css'

/**
 * Inline drawer for one card. Place cards get time + note; custom cards also
 * get their own name, category, address and an optional map pin — that's the
 * "lunch, decided on the spot" / "free & easy" case.
 */
export default function CardEditor({
  card,
  categories,
  days,
  dayIndex,
  cardIndex,
  onPatch,
  onMove,
  onClose,
}) {
  const isCustom = card.kind === 'custom'
  const pinned = validCoords(card.coords)
  const cardCount = days[dayIndex].cards.length

  return (
    <div className={styles.editor}>
      {isCustom && (
        <label className={styles.field}>
          <span>Name</span>
          <input
            type="text"
            value={card.name}
            onChange={(e) => onPatch({ name: e.target.value })}
            placeholder="Lunch — decide on the spot"
          />
        </label>
      )}

      <div className={styles.fieldRow}>
        <label className={styles.field}>
          <span>Time</span>
          <input
            type="text"
            value={card.time}
            onChange={(e) => onPatch({ time: e.target.value })}
            placeholder="9:30 · sunset · after dinner"
          />
        </label>
        {isCustom && (
          <label className={styles.field}>
            <span>Style</span>
            <select
              value={card.category}
              onChange={(e) => onPatch({ category: e.target.value })}
            >
              <option value={PLAN_CATEGORY.id}>{PLAN_CATEGORY.label}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <label className={styles.field}>
        <span>Note</span>
        <textarea
          rows={2}
          value={card.note}
          onChange={(e) => onPatch({ note: e.target.value })}
          placeholder="Anything you want to remember"
        />
      </label>

      {isCustom && (
        <div className={styles.pinNote}>
          {card.coords ? (
            <>
              {/* Keyed off coords, not `pinned`, so a card carrying a malformed
                  coordinate still offers a way to clear it. */}
              <span className={styles.pinCoords}>
                📍{' '}
                {pinned
                  ? `${Number(card.coords[0]).toFixed(4)}, ${Number(card.coords[1]).toFixed(4)}`
                  : 'Invalid coordinates'}
              </span>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => onPatch({ coords: null })}
              >
                Remove pin
              </button>
            </>
          ) : (
            <span>
              Want this on the map? Drop a pin on the <strong>Map</strong> tab — it becomes a
              place you can drag into any day.
            </span>
          )}
        </div>
      )}

      <div className={styles.moveRow}>
        <label className={styles.field}>
          <span>Move to</span>
          <select
            value={dayIndex}
            onChange={(e) => onMove(Number(e.target.value), cardIndex)}
          >
            {days.map((d, i) => (
              <option key={d.id} value={i}>
                {d.title || `Day ${i + 1}`}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.nudge}>
          <button
            type="button"
            className={styles.iconBtn}
            disabled={cardIndex === 0}
            onClick={() => onMove(dayIndex, cardIndex - 1)}
            aria-label="Move earlier"
          >
            ↑
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            disabled={cardIndex === cardCount - 1}
            onClick={() => onMove(dayIndex, cardIndex + 1)}
            aria-label="Move later"
          >
            ↓
          </button>
        </div>
        <button type="button" className={styles.doneBtn} onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  )
}
