// import { pick as _pick } from 'lodash-es'
import TourApi from 'src/api/TourApi'

// NOTE  Quản lý các store của danh mục

// NOTE  Quản lý các store của tour initial
export const GET_GENERAL_LIST_TOUR = 'GENERAL/GET_GENERAL_LIST_TOUR'

export function getListTour() {
  return async dispatch => {
    const res = await TourApi.getListTour({})
    if (res.data) {
      dispatch({ type: GET_GENERAL_LIST_TOUR, payload: res.data })
    }
  }
}
