import { setAuthorizationforHeader } from 'src/constant/funcAixos.js'

export const LOGIN_USER_INFO = 'AUTH/UPDATE_USER_INFO'
export const LOGOUT_USER_INFO = 'AUTH/LOGOUT_USER_INFO'

// ACTIONS
export function userLogin(data) {
  setAuthorizationforHeader(data.token)
  return dispatch => {
    dispatch({ type: LOGIN_USER_INFO, payload: data })
  }
}

export function userLogout() {
  return dispatch => {
    dispatch({ type: LOGOUT_USER_INFO })
  }
}
