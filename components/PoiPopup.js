import CategoryChip from './CategoryChip'
import { fallbackFor, handleImgError } from './imgFallback'

export default function PoiPopup({ place, category, onEdit }) {
  const [lat, lng] = place.coords
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  const src = place.image || fallbackFor(category)
  return (
    <div className="poi-popup">
      <img
        className="poi-popup__img"
        src={src}
        alt={place.name}
        loading="lazy"
        onError={handleImgError(category)}
      />
      <div className="poi-popup__body">
        <CategoryChip category={category} />
        <h3 className="poi-popup__title">{place.name}</h3>
        {place.address && <div className="poi-popup__addr">{place.address}</div>}
        {place.description && <p className="poi-popup__desc">{place.description}</p>}
        <div className="poi-popup__actions">
          <a
            className="poi-popup__link"
            href={place.url || directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {place.url ? 'Visit site →' : 'Directions →'}
          </a>
          {onEdit && (
            <button type="button" className="poi-popup__edit" onClick={onEdit}>
              Edit pin
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
