import { concat as _concat } from 'lodash-es'
import TourApi from 'src/api/TourApi'
import categoryApi from 'src/api/categoryApi'
import moment from 'moment'
import { DATE_FORMAT } from 'src/config/format'

// NOTE  Quản lý các store của danh mục
export const GET_GENERAL_LIST_DEPARTURE = 'GENERAL/GET_GENERAL_LIST_DEPARTURE'
export const GET_GENERAL_LIST_TYPE_SEAT = 'GENERAL/GET_GENERAL_LIST_TYPE_SEAT'
export const GET_GENERAL_LIST_TIME_SLOT = 'GENERAL/GET_GENERAL_LIST_TIME_SLOT'
export const GET_GENERAL_LIST_PROMOTION = 'GENERAL/GET_GENERAL_LIST_PROMOTION'

export const IS_LOADED_GENERAL_DANHMUC = 'GENERAL/IS_LOADED_GENERAL_DANHMUC'

export const GET_GENERAL_LIST_SCHEDULE = 'GENERAL/GET_GENERAL_LIST_SCHEDULE'
export const IS_LOADING_GENERAL_SCHEDULE = 'GENERAL/IS_LOADING_GENERAL_SCHEDULE'
export const IS_LOADED_GENERAL_SCHEDULE = 'GENERAL/IS_LOADED_GENERAL_SCHEDULE'

export function getListDeparture() {
  return async dispatch => {
    const res = await categoryApi.getListDepartureAll({})
    if (res.status) {
      dispatch({ type: GET_GENERAL_LIST_DEPARTURE, payload: res.data })
    }
  }
}
export function getListTypeSeat() {
  return async dispatch => {
    let res = await categoryApi.getLisTypeSeat({})
    if (res.status) {
      res.data = _concat(
        {
          value: '',
          name: 'Tất cả'
        },
        res.data
      )
      dispatch({ type: GET_GENERAL_LIST_TYPE_SEAT, payload: res.data })
    }
  }
}
export function getListTimeSlot() {
  return async dispatch => {
    let res = await categoryApi.getListTimeSlot({})
    if (res.status) {
      res.data = _concat(
        {
          value: '',
          name: 'Tất cả'
        },
        res.data
      )
      dispatch({ type: GET_GENERAL_LIST_TIME_SLOT, payload: res.data })
    }
  }
}
export function getListPromotion() {
  return async dispatch => {
    let res = await categoryApi.getListPromotionAll({})
    if (res.status) {
      dispatch({ type: GET_GENERAL_LIST_PROMOTION, payload: res.data })
    }
  }
}
export function isLoadedDanhMuc(isLoaded) {
  return async dispatch => {
    dispatch({ type: IS_LOADED_GENERAL_DANHMUC, payload: isLoaded })
  }
}

// NOTE  Quản lý các store của tour initial
export const GET_GENERAL_LIST_TOUR_POPULAR = 'GENERAL/GET_GENERAL_LIST_TOUR_POPULAR'
export const IS_LOADED_GENERAL_LIST_TOUR_POPULAR = 'GENERAL/IS_LOADED_GENERAL_LIST_TOUR_POPULAR'
export function getListTourPopular() {
  return async dispatch => {
    const res = await TourApi.getListTour({})
    if (res.status) {
      dispatch({ type: GET_GENERAL_LIST_TOUR_POPULAR, payload: res.data })
    }
  }
}
export function isListTourPopular(isLoaded) {
  return async dispatch => {
    dispatch({ type: IS_LOADED_GENERAL_LIST_TOUR_POPULAR, payload: isLoaded })
  }
}

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

// NOTE điều khiển modal login
export const SET_GENERAL_IS_REGISTER = 'GENERAL/SET_GENERAL_IS_REGISTER'
export const SET_GENERAL_IS_LOGIN = 'GENERAL/SET_GENERAL_IS_LOGIN'
export const SET_GENERAL_IS_EDIT_USER = 'GENERAL/SET_GENERAL_IS_EDIT_USER'

export function setVisibleRegister(isVisible) {
  return dispatch => {
    dispatch({ type: SET_GENERAL_IS_REGISTER, payload: isVisible })
  }
}

export function setVisibleLogin(isVisible) {
  return dispatch => {
    dispatch({ type: SET_GENERAL_IS_LOGIN, payload: isVisible })
  }
}

export function setVisibleEdituser(isVisible) {
  return dispatch => {
    dispatch({ type: SET_GENERAL_IS_EDIT_USER, payload: isVisible })
  }
}

export function getListSchedule() {
  return async dispatch => {
    try {
      dispatch({ type: IS_LOADING_GENERAL_SCHEDULE })
      const response = await TourApi.getListTourSearch({
        date: moment().format(DATE_FORMAT),
        pageSize: 5
      })
      const { data } = response
      dispatch({ type: GET_GENERAL_LIST_SCHEDULE, payload: data.list })
    } finally {
      dispatch({ type: IS_LOADED_GENERAL_SCHEDULE })
    }
  }
}
