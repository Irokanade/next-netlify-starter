/**
 * App-wide config. Same shape a future /api/data (or /api/config) response
 * would use, so this file can be swapped for a fetch later without touching
 * the components that consume it.
 *
 * @typedef {{
 *   map: {
 *     defaultPoiId?: string,       // id of a place in data/places.js — wins if set
 *     defaultCenter?: [number, number], // used only if defaultPoiId is not set/found
 *     defaultZoom: number,
 *     fallbackCenter: [number, number], // last-resort center if everything above fails
 *     openDefaultOnLoad?: boolean  // open the default POI's popup on first load
 *   }
 * }} Config
 */

/** @type {Config} */
const config = {
  map: {
    defaultPoiId: 'northeastern-seattle',
    defaultZoom: 14,
    fallbackCenter: [47.6205, -122.3493],
    openDefaultOnLoad: false,
  },
}

export default config
