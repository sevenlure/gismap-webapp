export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

// ACTIONS
export function userLogin(data) {
  return dispatch => {
    dispatch({ type: UPDATE_USER_INFO, payload: data })
  }
}
