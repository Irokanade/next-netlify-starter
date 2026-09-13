import { useEffect, useRef } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import { makeIcon } from './icons'
import PoiPopup from './PoiPopup'

function FlyToController({ selectedPoiId, places, markerRefs }) {
  const map = useMap()
  useEffect(() => {
    if (!selectedPoiId) return
    const p = places.find((x) => x.id === selectedPoiId)
    if (!p) return
    map.flyTo(p.coords, 15, { duration: 1.2 })
    const t = setTimeout(() => {
      markerRefs.current[selectedPoiId]?.openPopup()
    }, 1300)
    return () => clearTimeout(t)
  }, [selectedPoiId, places, map, markerRefs])
  return null
}

function OpenDefaultOnLoad({ enabled, defaultPoiId, markerRefs }) {
  useEffect(() => {
    if (!enabled || !defaultPoiId) return
    const t = setTimeout(() => {
      markerRefs.current[defaultPoiId]?.openPopup()
    }, 400)
    return () => clearTimeout(t)
  }, [enabled, defaultPoiId, markerRefs])
  return null
}

/** Turns a click on the map into a dropped pin while add-mode is armed. */
function ClickToDropPin({ enabled, onDrop }) {
  const map = useMap()
  useMapEvents({
    click(e) {
      if (!enabled) return
      onDrop([e.latlng.lat, e.latlng.lng])
    },
  })
  useEffect(() => {
    const el = map.getContainer()
    el.style.cursor = enabled ? 'crosshair' : ''
    return () => {
      el.style.cursor = ''
    }
  }, [enabled, map])
  return null
}

export default function SeattleMap({
  places,
  categoryMap,
  selectedPoiId,
  onSelect,
  defaultCenter,
  defaultZoom,
  defaultPoiId,
  openDefaultOnLoad,
  addMode,
  draft,
  onDropPin,
  onMoveDraft,
  onEditPlace,
  onMovePlace,
}) {
  const markerRefs = useRef({})
  const draftCategory = draft ? categoryMap[draft.place.category] : null

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
    >
      {/* Esri's CDN, measured at ~200ms/tile against openstreetmap.org's
          ~700ms. Note the {z}/{y}/{x} order — Esri puts row before column.
          updateWhenZooming keeps it from firing a request storm mid-animation. */}
      <TileLayer
        attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, DeLorme, NAVTEQ, USGS'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        maxZoom={19}
        updateWhenZooming={false}
        keepBuffer={2}
      />
      {places.map((p) => {
        const category = categoryMap[p.category]
        // Your own pins can be nudged into place, but only while add-mode is on
        // or you're editing that pin — otherwise an ordinary click-and-drag on
        // the map would move them.
        const editingThis = draft?.mode === 'edit' && draft.place.id === p.id
        const draggable = Boolean(p.custom && (addMode || editingThis))
        return (
          <Marker
            key={p.id}
            // While editing, follow the draft so a drag previews live and
            // Cancel snaps the pin back to where it was saved.
            position={editingThis ? draft.place.coords : p.coords}
            icon={makeIcon(editingThis ? categoryMap[draft.place.category] : category)}
            draggable={draggable}
            ref={(el) => {
              if (el) markerRefs.current[p.id] = el
              else delete markerRefs.current[p.id]
            }}
            eventHandlers={{
              popupopen: () => onSelect?.(p.id),
              popupclose: () => onSelect?.(null),
              dragend: (e) => {
                if (!draggable) return
                const { lat, lng } = e.target.getLatLng()
                if (editingThis) onMoveDraft?.([lat, lng])
                else onMovePlace?.(p.id, [lat, lng])
              },
            }}
          >
            <Popup>
              <PoiPopup
                place={p}
                category={category}
                onEdit={p.custom ? () => onEditPlace?.(p) : undefined}
              />
            </Popup>
          </Marker>
        )
      })}

      {draft?.mode === 'create' && (
        <Marker
          position={draft.place.coords}
          icon={makeIcon(draftCategory)}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const { lat, lng } = e.target.getLatLng()
              onMoveDraft?.([lat, lng])
            },
          }}
        />
      )}

      <ClickToDropPin enabled={addMode && !draft} onDrop={onDropPin} />
      <FlyToController
        selectedPoiId={selectedPoiId}
        places={places}
        markerRefs={markerRefs}
      />
      <OpenDefaultOnLoad
        enabled={openDefaultOnLoad}
        defaultPoiId={defaultPoiId}
        markerRefs={markerRefs}
      />
    </MapContainer>
  )
}
