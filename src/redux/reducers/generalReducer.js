import update from 'react-addons-update'
import {
  GET_GENERAL_LIST_DEPARTURE,
  GET_GENERAL_LIST_TOUR,
  UPDATE_GENERAL_USER_INFO,
  CLEAR_GENERAL_USER_INFO
} from '../actions/generalAction'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const InitialState = {
  userInfo: null,
  danhMuc: {
    listDeparture: []
  },
  danhMucIsLoaded: false,
  listtour: []
}

// REDUCERS
const generalReducer = (state = InitialState, action) => {
  switch (action.type) {
    case GET_GENERAL_LIST_DEPARTURE: {
      return update(state, {
        danhMuc: { listDeparture: { $set: action.payload } }
      })
    }
    case GET_GENERAL_LIST_TOUR: {
      return update(state, {
        listtour: { $set: action.payload }
      })
    }
    case UPDATE_GENERAL_USER_INFO: {
      return update(state, {
        userInfo: { $set: action.payload }
      })
    }
    case CLEAR_GENERAL_USER_INFO: {
      return update(state, {
        userInfo: { $set: null }
      })
    }
    default:
      return state
  }
}

const generalPersistConfig = {
  key: 'GeneralStore',
  storage: storage,
  blacklist: ['danhMuc', 'danhMucIsLoaded', 'breadcrumb']
}

export default persistReducer(generalPersistConfig, generalReducer)
