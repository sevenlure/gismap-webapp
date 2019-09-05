import update from 'react-addons-update'
import {
  GET_LIST_TOUR_SEARCH,
  IS_LOADED_LIST_TOUR_SEARCH,
  SET_BOOKING_NOW,
  IS_LOADED_SET_BOOKING_NOW
} from '../actions/BookingAction'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const InitialState = {
  listTourSearch: [],
  isLoadedlistTourSearch: true,
  BookingNow: null,
  isLoadedBookingNow: true
}

// REDUCERS
const generalReducer = (state = InitialState, action) => {
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
    default:
      return state
  }
}

const generalPersistConfig = {
  key: 'GeneralStore',
  storage: storage,
  blacklist: ['listTourSearch', 'isLoadedlistTourSearch', 'BookingNow', 'isLoadedBookingNow']
}

export default persistReducer(generalPersistConfig, generalReducer)
