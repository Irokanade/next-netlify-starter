import { fallbackFor, handleImgError } from './imgFallback'

export default function PoiPopup({ place }) {
  const [lat, lng] = place.coords
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  const src = place.image || fallbackFor(place.category)
  return (
    <div className="poi-popup">
      <img
        className="poi-popup__img"
        src={src}
        alt={place.name}
        loading="lazy"
        onError={handleImgError(place.category)}
      />
      <div className="poi-popup__body">
        <span className={`chip chip--${place.category}`}>{place.category}</span>
        <h3 className="poi-popup__title">{place.name}</h3>
        <div className="poi-popup__addr">{place.address}</div>
        <p className="poi-popup__desc">{place.description}</p>
        <a
          className="poi-popup__link"
          href={place.url || directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {place.url ? 'Visit site →' : 'Directions →'}
        </a>
      </div>
    </div>
  )
}
