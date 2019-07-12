import { pick as _pick } from 'lodash'
export const UPDATE_GENERAL_USER_INFO = 'GENERAL/UPDATE_GENERAL_USER_INFO'
export const CLEAR_GENERAL_USER_INFO = 'GENERAL/CLEAR_GENERAL_USER_INFO'

// ACTIONS
export function updateUserInfo(data) {
  return dispatch => {
    dispatch({ type: UPDATE_GENERAL_USER_INFO, payload: _pick(data, ['Email', 'FirstName', 'LastName']) })
  }
}
export function clearUserInfo() {
  return dispatch => {
    dispatch({ type: CLEAR_GENERAL_USER_INFO })
  }
}
