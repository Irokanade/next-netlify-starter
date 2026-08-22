import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
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

export default function SeattleMap({
  places,
  categoryMap,
  selectedPoiId,
  onSelect,
  defaultCenter,
  defaultZoom,
  defaultPoiId,
  openDefaultOnLoad,
}) {
  const markerRefs = useRef({})

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      {places.map((p) => {
        const category = categoryMap[p.category]
        return (
          <Marker
            key={p.id}
            position={p.coords}
            icon={makeIcon(category)}
            ref={(el) => {
              if (el) markerRefs.current[p.id] = el
              else delete markerRefs.current[p.id]
            }}
            eventHandlers={{
              popupopen: () => onSelect?.(p.id),
              popupclose: () => onSelect?.(null),
            }}
          >
            <Popup>
              <PoiPopup place={p} category={category} />
            </Popup>
          </Marker>
        )
      })}
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
