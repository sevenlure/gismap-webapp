export const UPDATE_TARGET = 'ANALYTICS/UPDATE_TARGET'
export const UPDATE_FIELD_ARR = 'ANALYTICS/UPDATE_FIELD_ARR'
export const UPDATE_FIELD_NOTE = 'ANALYTICS/UPDATE_FIELD_NOTE'

export const UPDATE_TABINFO = 'ANALYTICS/UPDATE_TABINFO'
export const UPDATE_FILTER = 'ANALYTICS/UPDATE_FILTER'
export const UPDATE_BUFFER = 'ANALYTICS/UPDATE_BUFFER'
export const UPDATE_COUNT_APPLY = 'ANALYTICS/UPDATE_COUNT_APPLY'
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

export function updateFieldArr(key, fieldArr) {
  return dispatch => {
    dispatch({
      type: UPDATE_FIELD_ARR,
      payload: {
        key,
        fieldArr
      }
    })
  }
}

export function updateFieldNote(key, fieldNote) {
  return dispatch => {
    dispatch({
      type: UPDATE_FIELD_NOTE,
      payload: {
        key,
        fieldNote
      }
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

export function updateTabBuffer(key, value) {
  return dispatch => {
    dispatch({
      type: UPDATE_BUFFER,
      payload: {
        key,
        value
      }
    })
  }
}

export function updateTabFilter(key, value) {
  return dispatch => {
    dispatch({
      type: UPDATE_FILTER,
      payload: {
        key,
        value
      }
    })
  }
}

export function updateCountApply(key) {
  return dispatch => {
    dispatch({
      type: UPDATE_COUNT_APPLY,
      payload: {
        key
      }
    })
  }
}

// export function userLogout() {
//   return dispatch => {
//     dispatch({ type: LOGOUT_USER_INFO })
//   }
// }
