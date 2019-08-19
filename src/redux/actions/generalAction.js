import { pick as _pick } from 'lodash-es'
// NOTE  Quản lý các store của danh mục
export const UPDATE_GENERAL_USER_INFO = 'GENERAL/UPDATE_GENERAL_USER_INFO'
export const CLEAR_GENERAL_USER_INFO = 'GENERAL/CLEAR_GENERAL_USER_INFO'

// NOTE  Quản lý các store menu & breadcrumb
export const SET_BREADCRUMB = 'GENERAL/SET_BREADCRUMB'

/* #region  ACTIONS cho user info  */
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
/* #endregion */

/* #region  ACTIONS cho menu & breadcrumb */
export function setBreadCrumb(breadcrumbArr) {
  return dispatch => {
    const payload = Array.isArray(breadcrumbArr) ? breadcrumbArr : []
    dispatch({ type: SET_BREADCRUMB, payload })
  }
}
/* #endregion */
