import TourApi from 'src/api/TourApi'

// NOTE  Quản lý các store của danh mục
export const GET_LIST_TOUR_SEARCH = 'BOOKING/GET_LIST_TOUR_SEARCH'
export const IS_LOADED_LIST_TOUR_SEARCH = 'BOOKING/IS_LOADED_LIST_TOUR_SEARCH'
export const SET_BOOKING_NOW = 'BOOKING/SET_BOOKING_NOW'
export const IS_LOADED_SET_BOOKING_NOW = 'BOOKING/IS_LOADED_BOOKING_NOW'
export const CLEAR_BOOKING_NOW_SEAT = 'BOOKING/CLEAR_BOOKING_NOW_SEAT'
export const ADD_BOOKING_NOW_SEAT = 'BOOKING/ADD_BOOKING_NOW_SEAT'
export const REMOVE_BOOKING_NOW_SEAT = 'BOOKING/REMOVE_BOOKING_NOW_SEAT'
export const CLEAR_BOOKING_NOW_POINT = 'BOOKING/CLEAR_BOOKING_NOW_POINT'
export const SET_BOOKING_NOW_POINT = 'BOOKING/ADD_BOOKING_NOW_POINT'
export const CLEAR_BOOKING_NOW_INFO_CUSTOMER = 'BOOKING/CLEAR_BOOKING_NOW_INFO_CUSTOMER'
export const SET_BOOKING_NOW_INFO_CUSTOMER = 'BOOKING/SET_BOOKING_NOW_INFO_CUSTOMER'
export const CHANGE_FILLTER = 'BOOKING/CHANGE_FILLTER'
export const CLEAR_FILLTER = 'BOOKING/CLEAR_FILLTER'

export function getListTourSearch(query) {
  return async dispatch => {
    const res = await TourApi.getListTourSearch(query)
    if (res.status) {
      dispatch({ type: GET_LIST_TOUR_SEARCH, payload: res.data.list })
    }
  }
}
export function setIsLoadedListTourSearch(isLoaded) {
  return async dispatch => {
    dispatch({ type: IS_LOADED_LIST_TOUR_SEARCH, payload: isLoaded })
  }
}

export function setBookingNow(data) {
  return async dispatch => {
    dispatch({ type: SET_BOOKING_NOW, payload: data })
  }
}
export function isLoadedBookingNow(isLoaded) {
  return async dispatch => {
    dispatch({ type: IS_LOADED_SET_BOOKING_NOW, payload: isLoaded })
  }
}

export function clearBookingNowSeat() {
  return async dispatch => {
    dispatch({ type: CLEAR_BOOKING_NOW_SEAT })
  }
}

export function addBookingNowSeat(data) {
  return async dispatch => {
    dispatch({ type: ADD_BOOKING_NOW_SEAT, payload: data })
  }
}

export function removeBookingNowSeat(seatKey) {
  return async dispatch => {
    dispatch({ type: REMOVE_BOOKING_NOW_SEAT, payload: seatKey })
  }
}

export function setBookingNowPoint(data) {
  return async dispatch => {
    dispatch({ type: SET_BOOKING_NOW_POINT, payload: data })
  }
}

export function clearBookingNowPoint() {
  return async dispatch => {
    dispatch({ type: CLEAR_BOOKING_NOW_POINT })
  }
}

export function setBookingNowInfoCustomer(data) {
  return async dispatch => {
    dispatch({ type: SET_BOOKING_NOW_INFO_CUSTOMER, payload: data })
  }
}

export function clearBookingNowInfoCustomer() {
  return async dispatch => {
    dispatch({ type: CLEAR_BOOKING_NOW_INFO_CUSTOMER })
  }
}

export function changeFilter(valueChanged) {
  return async dispatch => {
    dispatch({ type: CHANGE_FILLTER, payload: valueChanged })
  }
}
export function clearFilter() {
  return async dispatch => {
    dispatch({ type: CLEAR_FILLTER, payload: {} })
  }
}
