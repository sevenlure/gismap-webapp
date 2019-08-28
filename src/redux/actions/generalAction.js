// import { pick as _pick } from 'lodash-es'
import TourApi from 'src/api/TourApi'

// NOTE  Quản lý các store của danh mục

// NOTE  Quản lý các store của tour initial
export const GET_GENERAL_LIST_TOUR = 'GENERAL/GET_GENERAL_LIST_TOUR'
export const UPDATE_GENERAL_USER_INFO = 'GENERAL/UPDATE_GENERAL_USER_INFO'

export function getListTour() {
  return async dispatch => {
    const res = await TourApi.getListTour({})
    if (res.status) {
      dispatch({ type: GET_GENERAL_LIST_TOUR, payload: res.data })
    }
  }
}

export function updateUserInfo(data) {
  return async dispatch => {
    dispatch({ type: UPDATE_GENERAL_USER_INFO, payload: data })
  }
}
