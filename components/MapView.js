import dynamic from 'next/dynamic'
import styles from '@styles/Map.module.css'

const SeattleMap = dynamic(() => import('./SeattleMap'), {
  ssr: false,
  loading: () => <div className={styles.mapLoading}>Loading map…</div>,
})

export default function MapView(props) {
  return (
    <div className={styles.mapWrap}>
      <SeattleMap {...props} />
    </div>
  )
}
