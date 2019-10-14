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

// NOTE Menu
export const UPDATE_GENERAL_SUB_MENU = 'GENERAL/UPDATE_GENERAL_SUB_MENU'
export const UPDATE_GENERAL_KEY_PATCH = 'GENERAL/UPDATE_GENERAL_KEY_PATCH'
export const UPDATE_GENERAL_SET_BREADCRUMB = 'GENERAL/UPDATE_GENERAL_SET_BREADCRUMB'

export function updateSubMenu(data) {
  return async dispatch => {
    dispatch({ type: UPDATE_GENERAL_SUB_MENU, payload: data })
  }
}

export function updateKeyPath(data) {
  return async dispatch => {
    dispatch({ type: UPDATE_GENERAL_KEY_PATCH, payload: data })
  }
}

export function setBreadCrumb(breadcrumbArr) {
  return dispatch => {
    const payload = Array.isArray(breadcrumbArr) ? breadcrumbArr : []
    dispatch({ type: UPDATE_GENERAL_SET_BREADCRUMB, payload })
  }
}
