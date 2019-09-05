import TourApi from 'src/api/TourApi'

// NOTE  Quản lý các store của danh mục
export const GET_LIST_TOUR_SEARCH = 'BOOKING/GET_LIST_TOUR_SEARCH'
export const IS_LOADED_LIST_TOUR_SEARCH = 'BOOKING/IS_LOADED_LIST_TOUR_SEARCH'
export const SET_BOOKING_NOW = 'BOOKING/SET_BOOKING_NOW'
export const IS_LOADED_SET_BOOKING_NOW = 'BOOKING/IS_LOADED_BOOKING_NOW'

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
