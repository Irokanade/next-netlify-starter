import styles from './Tabs.module.css'

/**
 * Top-level view switcher. `tabs` is [{ id, label, icon? }].
 * Rendered as a real tablist so arrow keys work the way people expect.
 */
export default function Tabs({ tabs, active, onChange }) {
  const move = (dir) => {
    const i = tabs.findIndex((t) => t.id === active)
    const next = tabs[(i + dir + tabs.length) % tabs.length]
    onChange(next.id)
  }

  return (
    <div className={styles.row} role="tablist" aria-label="Views">
      {tabs.map((t) => {
        const on = t.id === active
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={on}
            aria-controls={`panel-${t.id}`}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') { e.preventDefault(); move(1) }
              if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1) }
            }}
            className={`${styles.tab} ${on ? styles.on : ''}`}
          >
            {t.icon && <span aria-hidden="true">{t.icon}</span>}
            {t.label}
            {t.badge != null && <span className={styles.badge}>{t.badge}</span>}
          </button>
        )
      })}
    </div>
  )
}
