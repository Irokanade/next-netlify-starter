import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CategoryChip from '../CategoryChip'
import { fallbackFor, handleImgError } from '../imgFallback'
import { validCoords } from '@lib/trip'
import styles from './Planner.module.css'

export function cardTitle(card, poi) {
  if (card.kind === 'custom') return card.name || 'Untitled card'
  return poi?.name || 'Place no longer in the guide'
}

/**
 * The visual face of a card. Shared by the sortable list and the drag
 * overlay, so the thing under your cursor looks exactly like the thing you
 * picked up.
 */
export function CardFace({
  card,
  poi,
  category,
  index,
  dragging,
  overlay,
  dropHint,
  children,
  handleProps,
}) {
  const missing = card.kind === 'place' && !poi
  const name = cardTitle(card, poi)
  const image = poi?.image ? poi.image.replace('w=600', 'w=200') : fallbackFor(category)
  const pinned = card.kind === 'custom' && validCoords(card.coords)

  return (
    <article
      className={[
        styles.card,
        dragging ? styles.cardDragging : '',
        overlay ? styles.cardOverlay : '',
        missing ? styles.cardMissing : '',
        dropHint === 'before' ? styles.dropBefore : '',
        dropHint === 'after' ? styles.dropAfter : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--card-tint': category.color }}
    >
      <div className={styles.cardMain}>
        {handleProps ? (
          <button
            type="button"
            className={styles.grip}
            aria-label={`Reorder ${name}`}
            {...handleProps}
          >
            <span className={styles.gripDots} aria-hidden="true" />
            {index != null && <span className={styles.order}>{index + 1}</span>}
          </button>
        ) : (
          <span className={styles.grip} aria-hidden="true">
            <span className={styles.gripDots} />
            {index != null && <span className={styles.order}>{index + 1}</span>}
          </span>
        )}

        <img
          className={styles.thumb}
          src={image}
          alt=""
          loading="lazy"
          onError={handleImgError(category)}
        />

        <div className={styles.cardBody}>
          <div className={styles.cardMeta}>
            <CategoryChip category={category} />
            {card.time && <span className={styles.time}>{card.time}</span>}
            {pinned && (
              <span className={styles.pinBadge} title="Shows as a pin on the map">
                📍 pinned
              </span>
            )}
          </div>
          <h4 className={styles.cardName}>{name}</h4>
          {card.note && <p className={styles.cardNote}>{card.note}</p>}
        </div>
      </div>
      {children}
    </article>
  )
}

/** A card inside a day column: draggable, with an inline editor drawer. */
export default function SortableCard({ card, poi, category, index, dropHint, actions, editor }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.uid, data: { type: 'card', uid: card.uid } })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 2 : undefined,
  }

  return (
    <li ref={setNodeRef} style={style} className={styles.cardSlot}>
      <CardFace
        card={card}
        poi={poi}
        category={category}
        index={index}
        dragging={isDragging}
        dropHint={dropHint}
        handleProps={{ ...listeners, ...attributes, ref: setActivatorNodeRef }}
      >
        <div className={styles.cardActions}>{actions}</div>
        {editor}
      </CardFace>
    </li>
  )
}
