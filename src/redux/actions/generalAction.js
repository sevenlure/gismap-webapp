import { get as _get } from 'lodash-es'
// import DepartmentApi from 'src/api/DepartmentApi'
import UserApi from 'src/api/userApi.js'

// NOTE  THEM
export const UPDATE_THEM_BACKGROUND_COLOR = 'GENERAL/UPDATE_THEM_BACKGROUND_COLOR'
export function updateBackgroundColor(color) {
  return async dispatch => {
    dispatch({ type: UPDATE_THEM_BACKGROUND_COLOR, payload: color })
  }
}

// NOTE Catelory Department

export const GET_GENERAL_LIST_DEPARTMENT = 'GENERAL/GET_GENERAL_LIST_DEPARTMENT'
export const GET_GENERAL_LIST_USER = 'GENERAL/GET_GENERAL_LIST_USER'
export const IS_LOADED_GENERAL_DANHMUC = 'GENERAL/IS_LOADED_GENERAL_DANHMUC'

export function isLoadedDanhMuc(isLoaded) {
  return async dispatch => {
    dispatch({ type: IS_LOADED_GENERAL_DANHMUC, payload: isLoaded })
  }
}
// export function getDepartment() {
//   return async dispatch => {
//     let dataSource = []
//     try {
//       const res = await DepartmentApi.getAll({})
//       if (res.status) {
//         dataSource = _get(res, 'data', [])
//       }
//     } catch (ex) {
//       console.log('GET_GENERAL_LIST_DEPARTMENT', ex)
//     }
//     dispatch({ type: GET_GENERAL_LIST_DEPARTMENT, payload: dataSource })
//   }
// }
export function getListUser() {
  return async dispatch => {
    let dataSource = []
    try {
      const res = await UserApi.getAll()
      if (res.status) {
        dataSource = _get(res, 'data', [])
      }
    } catch (ex) {
      console.log('GET_GENERAL_LIST_USER', ex)
    }
    dispatch({ type: GET_GENERAL_LIST_USER, payload: dataSource })
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
