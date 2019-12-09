// NOTE  Layer hanh chinh
export const UPDATE_LAYER_CAP_HANH_CHINH = 'FILTER/UPDATE_LAYER_CAP_HANH_CHINH'
export const UPDATE_LAYER_VUNG_HANH_CHINH = 'FILTER/UPDATE_LAYER_VUNG_HANH_CHINH'

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
