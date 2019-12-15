import { getMarkerGeneralCountAll } from 'src/api/layerApi'

// NOTE  Layer hanh chinh
export const HANHCHINH_LOADED = 'LAYER/HANHCHINH_LOADED'
export const HANHCHINH_UPDATE = 'LAYER/HANHCHINH_UPDATE'

// NOTE  Layer Marker
export const UPDATE_MARKER_GENERAL_COUNT = 'LAYER/UPDATE_MARKER_GENERAL_COUNT'
export const UPDATE_MARKER_GENERAL_COUNT_LOADED = 'LAYER/UPDATE_MARKER_GENERAL_COUNT_LOADED'

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
