// import { concat as _concat } from 'lodash-es'
// import TourApi from 'src/api/TourApi'
// import categoryApi from 'src/api/categoryApi'
// import moment from 'moment'
// import { DATE_FORMAT } from 'src/config/format'

export const UPDATE_GENERAL_USER_INFO = 'GENERAL/UPDATE_GENERAL_USER_INFO'
export const CLEAR_GENERAL_USER_INFO = 'GENERAL/CLEAR_GENERAL_USER_INFO'

export function updateUserInfo(data) {
  return async dispatch => {
    dispatch({ type: UPDATE_GENERAL_USER_INFO, payload: data })
  }
}

export function clearUserInfo() {
  return dispatch => {
    dispatch({ type: CLEAR_GENERAL_USER_INFO })
  }
}
