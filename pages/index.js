import Head from 'next/head'
import { useCallback, useEffect, useMemo, useState } from 'react'
import IntroHeader from '@components/IntroHeader'
import CategoryFilter from '@components/CategoryFilter'
import Sidebar from '@components/Sidebar'
import MapView from '@components/MapView'
import Tabs from '@components/Tabs'
import TripPlanner from '@components/planner/TripPlanner'
import { getData, buildCategoryMap, resolveMapView } from '@lib/api'
import { PLAN_CATEGORY, tripPins } from '@lib/trip'
import {
  countUsesInTrip,
  deletePlace,
  makeCustomPlace,
  upsertPlace,
} from '@lib/customPlaces'
import useCustomPlaces from '@lib/useCustomPlaces'
import useTrip from '@lib/useTrip'
import styles from '@styles/Map.module.css'

const { categories, places, config } = getData()
/** Includes the planner's pseudo-category so custom pins get a real pin style. */
const categoryMap = buildCategoryMap([...categories, PLAN_CATEGORY])
const { center: defaultCenter, zoom: defaultZoom } = resolveMapView(config, places)

export default function Home() {
  const [tab, setTab] = useState('map')
  const [activeCategories, setActiveCategories] = useState(() => new Set())
  const [selectedPoiId, setSelectedPoiId] = useState(null)
  const [showTripPins, setShowTripPins] = useState(true)
  const [addMode, setAddMode] = useState(false)
  const [draft, setDraft] = useState(null) // { mode: 'create' | 'edit', place }
  const [trip, setTrip] = useTrip()
  const [myPlaces, setMyPlaces] = useCustomPlaces()

  /** Built-in guide plus the user's own pins — identical shape, so everything
      downstream (map, sidebar, planner palette) treats them the same. */
  const allPlaces = useMemo(() => [...places, ...myPlaces], [myPlaces])
  const placeMap = useMemo(
    () => Object.fromEntries(allPlaces.map((p) => [p.id, p])),
    [allPlaces],
  )

  /** Pinned one-off cards from the planner — shown on the map, not editable here. */
  const cardPins = useMemo(() => (trip ? tripPins(trip, placeMap) : []), [trip, placeMap])
  const tripCardCount = useMemo(
    () => (trip ? trip.days.reduce((n, d) => n + d.cards.length, 0) : 0),
    [trip],
  )

  /** Your own pins default to the "Plan" category, so it's always filterable. */
  const filterCategories = useMemo(() => [...categories, PLAN_CATEGORY], [])

  const visiblePlaces = useMemo(() => {
    const all = showTripPins ? [...allPlaces, ...cardPins] : allPlaces
    return activeCategories.size === 0
      ? all
      : all.filter((p) => activeCategories.has(p.category))
  }, [activeCategories, allPlaces, cardPins, showTripPins])

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

  /* ------------------------------------------------------------- my pins */

  const dropPin = useCallback((coords) => {
    setDraft({ mode: 'create', place: makeCustomPlace(coords) })
  }, [])

  const patchDraft = useCallback((patch) => {
    setDraft((d) => (d ? { ...d, place: { ...d.place, ...patch } } : d))
  }, [])

  const moveDraft = useCallback((coords) => patchDraft({ coords }), [patchDraft])

  // These read `draft` directly rather than from inside a setDraft updater:
  // updaters must stay pure, and StrictMode runs them twice — which fired the
  // confirm() below twice and double-wrote the list.
  const saveDraft = useCallback(() => {
    if (!draft) return
    const name = draft.place.name.trim()
    if (!name) return
    setMyPlaces((list) => upsertPlace(list, { ...draft.place, name }))
    setDraft(null)
    setAddMode(false)
  }, [draft, setMyPlaces])

  const editPlace = useCallback((place) => {
    setAddMode(false)
    setDraft({ mode: 'edit', place })
  }, [])

  const deleteDraft = useCallback(() => {
    if (!draft) return
    const uses = countUsesInTrip(trip, draft.place.id)
    if (uses > 0) {
      const plural = uses === 1 ? 'card' : 'cards'
      const ok = window.confirm(
        `"${draft.place.name}" is used by ${uses} trip ${plural}. Delete the pin anyway?`,
      )
      if (!ok) return
    }
    setMyPlaces((list) => deletePlace(list, draft.place.id))
    setDraft(null)
  }, [draft, trip, setMyPlaces])

  /** Drag-to-nudge an already-saved pin. */
  const movePlace = useCallback(
    (id, coords) => {
      setMyPlaces((list) => list.map((p) => (p.id === id ? { ...p, coords } : p)))
      setDraft((d) => (d?.place.id === id ? { ...d, place: { ...d.place, coords } } : d))
    },
    [setMyPlaces],
  )

  const toggleAddMode = () => {
    setAddMode((on) => !on)
    setDraft(null)
  }

  return (
    <>
      <Head>
        <title>My Seattle Guide</title>
        <meta
          name="description"
          content="A cute pastel map of Seattle spots — libraries, Northeastern campus, parks, landmarks, museums, and eats — plus your own pins and a drag-and-drop trip planner."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.page}>
        <IntroHeader />

        <div className={styles.tabRow}>
          <Tabs
            tabs={[
              { id: 'map', label: 'Map', icon: '🗺️' },
              { id: 'plan', label: 'Trip planner', icon: '🧩', badge: tripCardCount || null },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>

        {tab === 'map' ? (
          <div
            className={styles.panel}
            role="tabpanel"
            id="panel-map"
            aria-labelledby="tab-map"
          >
            <div className={styles.filters}>
              <CategoryFilter
                categories={filterCategories}
                active={activeCategories}
                onToggle={toggleCategory}
                onClear={() => setActiveCategories(new Set())}
              />
              <button
                type="button"
                aria-pressed={addMode}
                onClick={toggleAddMode}
                className={`${styles.addPinBtn} ${addMode ? styles.addPinOn : ''}`}
              >
                📍 {addMode ? 'Cancel' : 'Add pin'}
              </button>
              {cardPins.length > 0 && (
                <label className={styles.pinToggle}>
                  <input
                    type="checkbox"
                    checked={showTripPins}
                    onChange={(e) => setShowTripPins(e.target.checked)}
                  />
                  Show my {cardPins.length} planner {cardPins.length === 1 ? 'pin' : 'pins'}
                </label>
              )}
            </div>
            <div className={styles.grid}>
              <Sidebar
                places={visiblePlaces}
                categoryMap={categoryMap}
                selectedPoiId={selectedPoiId}
                onSelect={setSelectedPoiId}
              />
              <MapView
                places={visiblePlaces}
                categoryMap={categoryMap}
                categories={categories}
                selectedPoiId={selectedPoiId}
                onSelect={setSelectedPoiId}
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                defaultPoiId={config.map.defaultPoiId}
                openDefaultOnLoad={config.map.openDefaultOnLoad}
                addMode={addMode}
                draft={draft}
                onDropPin={dropPin}
                onMoveDraft={moveDraft}
                onMovePlace={movePlace}
                onEditPlace={editPlace}
                onPatchDraft={patchDraft}
                onSaveDraft={saveDraft}
                onCancelDraft={() => setDraft(null)}
                onDeleteDraft={deleteDraft}
              />
            </div>
          </div>
        ) : (
          <div
            className={styles.panel}
            role="tabpanel"
            id="panel-plan"
            aria-labelledby="tab-plan"
          >
            {trip ? (
              <TripPlanner
                trip={trip}
                setTrip={setTrip}
                places={allPlaces}
                categories={categories}
                categoryMap={categoryMap}
              />
            ) : (
              <div className={styles.mapLoading}>Loading your trip…</div>
            )}
          </div>
        )}
      </main>
    </>
  )
}
