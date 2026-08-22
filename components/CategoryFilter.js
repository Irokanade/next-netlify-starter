import styles from './CategoryFilter.module.css'

export default function CategoryFilter({ categories, active, onToggle, onClear }) {
  const showingAll = active.size === 0
  return (
    <div className={styles.row} role="group" aria-label="Filter places by category">
      <button
        type="button"
        aria-pressed={showingAll}
        onClick={onClear}
        className={`${styles.chip} ${showingAll ? styles.on : styles.off}`}
      >
        All
      </button>
      {categories.map((c) => {
        const isOn = active.has(c.id)
        return (
          <button
            key={c.id}
            type="button"
            aria-pressed={isOn}
            onClick={() => onToggle(c.id)}
            className={`${styles.chip} ${isOn ? styles.on : styles.off}`}
            style={isOn ? { background: c.color, borderColor: 'transparent' } : undefined}
          >
            {c.label}
          </button>
        )
      })}
    </div>
  )
}
