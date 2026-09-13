import dynamic from 'next/dynamic'
import PinForm from './PinForm'
import styles from '@styles/Map.module.css'

const SeattleMap = dynamic(() => import('./SeattleMap'), {
  ssr: false,
  loading: () => <div className={styles.mapLoading}>Loading map…</div>,
})

export default function MapView({
  draft,
  categories,
  onPatchDraft,
  onSaveDraft,
  onCancelDraft,
  onDeleteDraft,
  addMode,
  ...mapProps
}) {
  return (
    <div className={styles.mapWrap}>
      <SeattleMap {...mapProps} draft={draft} addMode={addMode} />
      {addMode && !draft && (
        <div className={styles.addHint} role="status">
          Click the map to drop a pin
        </div>
      )}
      {draft && (
        <PinForm
          draft={draft}
          categories={categories}
          onPatch={onPatchDraft}
          onSave={onSaveDraft}
          onCancel={onCancelDraft}
          onDelete={onDeleteDraft}
        />
      )}
    </div>
  )
}
