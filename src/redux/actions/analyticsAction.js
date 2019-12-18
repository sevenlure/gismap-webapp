export const UPDATE_TARGET = 'ANALYTICS/UPDATE_TARGET'
export const UPDATE_TABINFO = 'ANALYTICS/UPDATE_TABINFO'
// export const LOGOUT_USER_INFO = 'AUTH/LOGOUT_USER_INFO'

// ACTIONS
export function updateTarget(target) {
  return dispatch => {
    dispatch({
      type: UPDATE_TARGET,
      payload: target
    })
  }
}

export function updateTabInfo(key, value) {
  return dispatch => {
    dispatch({
      type: UPDATE_TABINFO,
      payload: {
        key,
        value
      }
    })
  }
}

// export function userLogout() {
//   return dispatch => {
//     dispatch({ type: LOGOUT_USER_INFO })
//   }
// }
