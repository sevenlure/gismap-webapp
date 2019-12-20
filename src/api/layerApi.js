import fetch from './fetch'

const SLUG = '/layer'
export const MARKER_GENERAL_KEY = {
  'GENERAL/UNCATEGORIZED_MARKERS': 'GENERAL/UNCATEGORIZED_MARKERS'
}
export function getList({ page = 1, pageSize = 200, ...querySearch }) {
  return fetch.get(`${SLUG}`, {
    params: {
      page,
      pageSize,
      ...querySearch
    }
  })
}
export function getAllHanhChinh() {
  return fetch.get(`${SLUG}/getAllHanhChinh`)
}

/* #region  marker-general */
export function getMarkerGeneralCountAll() {
  return fetch.get(`${SLUG}/marker-general/countAll`)
}

// MARK  params key, value nằm trong MARKER_GENERAL_KEY
export function getMarkerGeneralByKey(key) {
  return fetch.get(`${SLUG}/marker-general`, { params: { key } })
}
/* #endregion */

/* #region  marker-own  */
export function getMarkerOwnCountAll() {
  return fetch.get(`${SLUG}/marker-own/countAll`)
}

// MARK  params key, value nằm trong MARKER_OWN_KEY
export function getMarkerOwnByKey(key) {
  return fetch.get(`${SLUG}/marker-own`, { params: { key } })
}
/* #endregion */

export default {
  getAllHanhChinh,
  getMarkerGeneralCountAll,
  getMarkerGeneralByKey,
  getMarkerOwnCountAll,
  getMarkerOwnByKey
}
