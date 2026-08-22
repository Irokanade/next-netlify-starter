import CategoryChip from './CategoryChip'
import { fallbackFor, handleImgError } from './imgFallback'
import styles from './Sidebar.module.css'

export default function Sidebar({ places, categoryMap, selectedPoiId, onSelect }) {
  return (
    <aside className={styles.sidebar} aria-label="List of places">
      <div className={styles.header}>
        <h2 className={styles.heading}>Places</h2>
        <span className={styles.count}>{places.length}</span>
      </div>
      <ul className={styles.list}>
        {places.length === 0 && (
          <li className={styles.empty}>No places match the current filter.</li>
        )}
        {places.map((p) => {
          const category = categoryMap[p.category]
          const src = p.image
            ? p.image.replace('w=600', 'w=200')
            : fallbackFor(category)
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                className={`${styles.card} ${selectedPoiId === p.id ? styles.selected : ''}`}
              >
                <img
                  className={styles.thumb}
                  src={src}
                  alt=""
                  loading="lazy"
                  onError={handleImgError(category)}
                />
                <div className={styles.body}>
                  <CategoryChip category={category} />
                  <div className={styles.name}>{p.name}</div>
                  <div className={styles.desc}>{p.description}</div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
