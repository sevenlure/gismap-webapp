import { get as _get } from 'lodash-es'
// import TourApi from 'src/api/TourApi'
// import categoryApi from 'src/api/categoryApi'
// import moment from 'moment'
// import { DATE_FORMAT } from 'src/config/format'
import DepartmentApi from 'src/api/DepartmentApi'

// NOTE Catelory Department

export const GET_GENERAL_LIST_DEPARTURE = 'GENERAL/GET_GENERAL_LIST_DEPARTURE'
export const IS_LOADED_GENERAL_DANHMUC = 'GENERAL/IS_LOADED_GENERAL_DANHMUC'

export function isLoadedDanhMuc(isLoaded) {
  return async dispatch => {
    dispatch({ type: IS_LOADED_GENERAL_DANHMUC, payload: isLoaded })
  }
}
export function getDepartment() {
  return async dispatch => {
    let dataSource = []
    try {
      const res = await DepartmentApi.getAll({})
      if (res.status) {
        dataSource = _get(res, 'data', [])
      }
    } catch (ex) {
      console.log('GET_GENERAL_LIST_DEPARTURE', ex)
    }
    dispatch({ type: GET_GENERAL_LIST_DEPARTURE, payload: dataSource })
  }
}

//  NOTE  AUTH
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
