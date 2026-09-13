import { useEffect, useRef } from 'react'
import { PLAN_CATEGORY } from '@lib/trip'
import styles from './PinForm.module.css'

/**
 * Details panel for a pin the user just dropped (or is re-editing). Floats
 * over the map rather than living inside a Leaflet popup — Leaflet swallows
 * enough pointer and focus events to make form inputs there a coin toss.
 */
export default function PinForm({ draft, categories, onPatch, onSave, onCancel, onDelete }) {
  const nameRef = useRef(null)
  const place = draft.place

  useEffect(() => {
    nameRef.current?.focus()
  }, [place.id])

  const submit = (e) => {
    e.preventDefault()
    if (!place.name.trim()) {
      nameRef.current?.focus()
      return
    }
    onSave()
  }

  const [lat, lng] = place.coords

  return (
    <form
      className={styles.panel}
      onSubmit={submit}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onCancel()
      }}
      aria-label={draft.mode === 'create' ? 'New pin details' : 'Edit pin'}
    >
      <div className={styles.head}>
        <h3 className={styles.title}>
          {draft.mode === 'create' ? '📍 New pin' : '📍 Edit pin'}
        </h3>
        <button
          type="button"
          className={styles.close}
          onClick={onCancel}
          aria-label="Cancel"
        >
          ✕
        </button>
      </div>

      <label className={styles.field}>
        <span>Name</span>
        <input
          ref={nameRef}
          type="text"
          value={place.name}
          onChange={(e) => onPatch({ name: e.target.value })}
          placeholder="Aunt's apartment"
          required
        />
      </label>

      <label className={styles.field}>
        <span>Category</span>
        <select
          value={place.category}
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

      <label className={styles.field}>
        <span>Note</span>
        <textarea
          rows={2}
          value={place.description}
          onChange={(e) => onPatch({ description: e.target.value })}
          placeholder="Why this spot is on your map"
        />
      </label>

      <label className={styles.field}>
        <span>Address</span>
        <input
          type="text"
          value={place.address}
          onChange={(e) => onPatch({ address: e.target.value })}
          placeholder="Optional"
        />
      </label>

      <p className={styles.coords}>
        {lat.toFixed(4)}, {lng.toFixed(4)} · drag the pin to nudge it
      </p>

      <div className={styles.actions}>
        {draft.mode === 'edit' && (
          <button type="button" className={styles.delete} onClick={onDelete}>
            Delete
          </button>
        )}
        <span className={styles.spacer} />
        <button type="button" className={styles.ghost} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.save}>
          Save pin
        </button>
      </div>
    </form>
  )
}
