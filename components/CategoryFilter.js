import { CATEGORIES } from '@data/places'
import styles from './CategoryFilter.module.css'

export default function CategoryFilter({ active, onToggle, onClear }) {
  const showingAll = active.size === 0
  return (
    <div className={styles.row} role="group" aria-label="Filter places by category">
      <button
        type="button"
        aria-pressed={showingAll}
        onClick={onClear}
        className={`${styles.chip} ${styles.all} ${showingAll ? styles.on : styles.off}`}
      >
        All
      </button>
      {CATEGORIES.map((c) => {
        const isOn = active.has(c.id)
        return (
          <button
            key={c.id}
            type="button"
            aria-pressed={isOn}
            onClick={() => onToggle(c.id)}
            className={`${styles.chip} ${styles[c.id]} ${isOn ? styles.on : styles.off}`}
          >
            {c.label}
          </button>
        )
      })}
    </div>
  )
}
