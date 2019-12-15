import { getMarkerGeneralCountAll, getMarkerGeneralByKey } from 'src/api/layerApi'

// NOTE  chung
export const LAYER_LOADING = 'LAYER/LAYER_LOADING'
export const LAYER_LOADED = 'LAYER/LAYER_LOADED'

// NOTE  Layer hanh chinh
export const HANHCHINH_LOADED = 'LAYER/HANHCHINH_LOADED'
export const HANHCHINH_UPDATE = 'LAYER/HANHCHINH_UPDATE'

// NOTE  Layer Marker
export const UPDATE_MARKER_GENERAL_COUNT = 'LAYER/UPDATE_MARKER_GENERAL_COUNT'
export const UPDATE_MARKER_GENERAL_COUNT_LOADED = 'LAYER/UPDATE_MARKER_GENERAL_COUNT_LOADED'
export const UPDATE_MARKER_GENERAL_BY_KEY = 'LAYER/UPDATE_MARKER_GENERAL_BY_KEY'
export const UPDATE_MARKER_GENERAL_BY_KEY_LOADING = 'LAYER/UPDATE_MARKER_GENERAL_BY_KEY_LOADING'

// export function loadingLayer() {
//   return async dispatch => {
//     dispatch({ type: LAYER_LOADING })
//   }
// }

// export function loadedLayer() {
//   return async dispatch => {
//     dispatch({ type: LAYER_LOADED })
//   }
// }

export function hanhchinhUpdate(payload) {
  return async dispatch => {
    dispatch({ type: HANHCHINH_LOADED })
    dispatch({ type: HANHCHINH_UPDATE, payload })
  }
}

export function fetchMarkerGeneralCount() {
  return async dispatch => {
    try {
      const response = await getMarkerGeneralCountAll()
      const { data } = response
      dispatch({ type: UPDATE_MARKER_GENERAL_COUNT_LOADED })
      dispatch({ type: UPDATE_MARKER_GENERAL_COUNT, payload: data })
    } catch {
      dispatch({ type: UPDATE_MARKER_GENERAL_COUNT_LOADED })
    }
  }
}

export function fetchMarkerGeneralBykey(key) {
  return async dispatch => {
    dispatch({ type: LAYER_LOADING })
    dispatch({ type: UPDATE_MARKER_GENERAL_BY_KEY_LOADING, payload: { key } })
    try {
      const response = await getMarkerGeneralByKey(key)
      const { data } = response
      dispatch({ type: UPDATE_MARKER_GENERAL_BY_KEY, payload: { key, list: data } })
      dispatch({ type: LAYER_LOADED })
      return data
    } catch {
      dispatch({ type: UPDATE_MARKER_GENERAL_BY_KEY, payload: { key, list: [] } })
      dispatch({ type: LAYER_LOADED })
    }
  }
}
