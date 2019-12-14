// NOTE  Layer hanh chinh
export const UPDATE_LAYER_CAP_HANH_CHINH = 'FILTER/UPDATE_LAYER_CAP_HANH_CHINH'
export const UPDATE_LAYER_VUNG_HANH_CHINH = 'FILTER/UPDATE_LAYER_VUNG_HANH_CHINH'

// NOTE  Marker
export const UPDATE_MARKER_WITH_KEY = 'FILTER/UPDATE_MARKER_WITH_KEY'
export const UPDATE_MARKER_PANEL = 'FILTER/UPDATE_MARKER_PANEL'

/* #region  Action Layer */
export function updateLevelHanhChinh(key) {
  return async dispatch => {
    dispatch({ type: UPDATE_LAYER_CAP_HANH_CHINH, payload: key })
  }
}

export function updateVungHanhChinh(array) {
  return async dispatch => {
    dispatch({ type: UPDATE_LAYER_VUNG_HANH_CHINH, payload: array })
  }
}
/* #endregion */

/* #region  Action Marker */
export function updateMarkerWithKey(key, value) {
  return async dispatch => {
    dispatch({ type: UPDATE_MARKER_WITH_KEY, payload: { [key]: value } })
  }
}

export function updateMarkerPanel(value) {
  return async dispatch => {
    dispatch({ type: UPDATE_MARKER_PANEL, payload: value })
  }
}
/* #endregion */
