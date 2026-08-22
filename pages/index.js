import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import IntroHeader from '@components/IntroHeader'
import CategoryFilter from '@components/CategoryFilter'
import Sidebar from '@components/Sidebar'
import MapView from '@components/MapView'
import places from '@data/places'
import styles from '@styles/Map.module.css'

export default function Home() {
  const [activeCategories, setActiveCategories] = useState(() => new Set())
  const [selectedPoiId, setSelectedPoiId] = useState(null)

  const visiblePlaces = useMemo(
    () =>
      activeCategories.size === 0
        ? places
        : places.filter((p) => activeCategories.has(p.category)),
    [activeCategories],
  )

  useEffect(() => {
    if (!selectedPoiId) return
    if (!visiblePlaces.some((p) => p.id === selectedPoiId)) {
      setSelectedPoiId(null)
    }
  }, [visiblePlaces, selectedPoiId])

  const toggleCategory = (id) => {
    setActiveCategories((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const clearFilters = () => setActiveCategories(new Set())

  return (
    <>
      <Head>
        <title>My Seattle Guide</title>
        <meta
          name="description"
          content="A cute pastel map of Seattle spots — libraries, Northeastern campus, parks, landmarks, museums, and eats."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.page}>
        <IntroHeader />
        <div className={styles.filters}>
          <CategoryFilter
            active={activeCategories}
            onToggle={toggleCategory}
            onClear={clearFilters}
          />
        </div>
        <div className={styles.grid}>
          <Sidebar
            places={visiblePlaces}
            selectedPoiId={selectedPoiId}
            onSelect={setSelectedPoiId}
          />
          <MapView
            places={visiblePlaces}
            selectedPoiId={selectedPoiId}
            onSelect={setSelectedPoiId}
          />
        </div>
      </main>
    </>
  )
}
