import update from 'react-addons-update'
import {
  GET_LIST_TOUR_SEARCH,
  IS_LOADED_LIST_TOUR_SEARCH,
  SET_BOOKING_NOW,
  IS_LOADED_SET_BOOKING_NOW,
  CLEAR_BOOKING_NOW_SEAT,
  ADD_BOOKING_NOW_SEAT,
  REMOVE_BOOKING_NOW_SEAT,
  CLEAR_BOOKING_NOW_POINT,
  SET_BOOKING_NOW_POINT,
  SET_BOOKING_NOW_INFO_CUSTOMER,
  CLEAR_BOOKING_NOW_INFO_CUSTOMER,
  CHANGE_FILLTER
} from '../actions/BookingAction'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const InitialState = {
  filter: {},
  listTourSearch: [],
  isLoadedlistTourSearch: true,
  BookingNow: null,
  BookingNowSeat: {},
  BookingNowPoint: {
    from: null,
    to: null
  },
  BookingNowInfoCustomer: null,
  isLoadedBookingNow: true
}

// REDUCERS
const bookingReducer = (state = InitialState, action) => {
  switch (action.type) {
    case GET_LIST_TOUR_SEARCH: {
      return update(state, {
        listTourSearch: { $set: action.payload }
      })
    }
    case IS_LOADED_LIST_TOUR_SEARCH: {
      return update(state, {
        isLoadedlistTourSearch: { $set: action.payload }
      })
    }
    case SET_BOOKING_NOW: {
      return update(state, {
        BookingNow: { $set: action.payload }
      })
    }
    case IS_LOADED_SET_BOOKING_NOW: {
      return update(state, {
        isLoadedBookingNow: { $set: action.payload }
      })
    }
    case CLEAR_BOOKING_NOW_SEAT: {
      return update(state, {
        BookingNowSeat: { $set: {} }
      })
    }
    case ADD_BOOKING_NOW_SEAT: {
      return update(state, {
        BookingNowSeat: { $merge: action.payload }
      })
    }
    case REMOVE_BOOKING_NOW_SEAT: {
      const seatKey = action.payload
      return update(state, {
        BookingNowSeat: { $merge: { [seatKey]: undefined } }
      })
    }
    case SET_BOOKING_NOW_POINT: {
      return update(state, {
        BookingNowPoint: { $set: action.payload }
      })
    }
    case CLEAR_BOOKING_NOW_POINT: {
      return update(state, {
        BookingNowPoint: {
          $set: {
            from: null,
            to: null
          }
        }
      })
    }
    case SET_BOOKING_NOW_INFO_CUSTOMER: {
      return update(state, {
        BookingNowInfoCustomer: { $set: action.payload }
      })
    }
    case CLEAR_BOOKING_NOW_INFO_CUSTOMER: {
      return update(state, {
        BookingNowInfoCustomer: {
          $set: null
        }
      })
    }
    case CHANGE_FILLTER: {
      const valueChanged = action.payload
      console.log('vo day')
      return update(state, {
        filter: { $merge: valueChanged }
      })
    }
    default:
      return state
  }
}

const bookingPersistConfig = {
  key: 'BookingStore',
  storage: storage,
  blacklist: [
    'listTourSearch',
    'isLoadedlistTourSearch',
    'BookingNow',
    'isLoadedBookingNow',
    'BookingNowSeat',
    'BookingNowPoint',
    'BookingNowInfoCustomer',
    'filter'
  ]
}

export default persistReducer(bookingPersistConfig, bookingReducer)
