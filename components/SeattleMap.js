import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { makeIcon } from './icons'
import PoiPopup from './PoiPopup'

const SEATTLE_CENTER = [47.6205, -122.3493]
const DEFAULT_ZOOM = 12

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

export default function SeattleMap({ places, selectedPoiId, onSelect }) {
  const markerRefs = useRef({})

  return (
    <MapContainer
      center={SEATTLE_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      {places.map((p) => (
        <Marker
          key={p.id}
          position={p.coords}
          icon={makeIcon(p.category)}
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
            <PoiPopup place={p} />
          </Popup>
        </Marker>
      ))}
      <FlyToController
        selectedPoiId={selectedPoiId}
        places={places}
        markerRefs={markerRefs}
      />
    </MapContainer>
  )
}
