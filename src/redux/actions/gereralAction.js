import { pick as _pick } from 'lodash'
export const UPDATE_GENERAL_USER_INFO = 'UPDATE_GENERAL_USER_INFO'

// ACTIONS
export function updateUserInfo(data) {
  return dispatch => {
    dispatch({ type: UPDATE_GENERAL_USER_INFO, payload: _pick(data, ['Email', 'FirstName', 'LastName']) })
  }
}
