import { motion } from 'motion/react'
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
 * The visual face of a card. Shared by the sortable list and the drag overlay,
 * so the thing under your cursor looks exactly like the thing you picked up.
 */
export function CardFace({
  card,
  poi,
  category,
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
      <div className={styles.cardMain} {...handleProps}>
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
            {pinned && (
              <span className={styles.pinBadge} title="Shows as a pin on the map">
                📍
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

/**
 * One stop on the day's timeline: a time label and dot on the left rail, the
 * card itself on the right.
 *
 * Only opacity and height are animated — never transform — because dnd-kit
 * owns this element's transform while it's being dragged, and two writers on
 * one property fight.
 */
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

  return (
    <motion.li
      ref={setNodeRef}
      layout={false}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.3, 1] }}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 2 : undefined,
      }}
      className={styles.cardSlot}
    >
      <div className={styles.rail}>
        <span className={styles.railTime}>{card.time || ''}</span>
        <button
          type="button"
          className={styles.railDot}
          aria-label={`Reorder ${cardTitle(card, poi)}`}
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
        >
          {index + 1}
        </button>
      </div>

      {/* listeners only — the rail dot above is the focusable activator */}
      <CardFace
        card={card}
        poi={poi}
        category={category}
        dragging={isDragging}
        dropHint={dropHint}
        handleProps={listeners}
      >
        <div className={styles.cardActions}>{actions}</div>
        {editor}
      </CardFace>
    </motion.li>
  )
}
