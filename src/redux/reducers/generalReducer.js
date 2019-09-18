import update from 'react-addons-update'
import {
  GET_GENERAL_LIST_DEPARTURE,
  GET_GENERAL_LIST_PROMOTION,
  GET_GENERAL_LIST_TIME_SLOT,
  GET_GENERAL_LIST_TYPE_SEAT,
  IS_LOADED_GENERAL_DANHMUC,
  GET_GENERAL_LIST_TOUR_POPULAR,
  IS_LOADED_GENERAL_LIST_TOUR_POPULAR,
  UPDATE_GENERAL_USER_INFO,
  CLEAR_GENERAL_USER_INFO,
  SET_GENERAL_IS_REGISTER,
  SET_GENERAL_IS_LOGIN,
  GET_GENERAL_LIST_SCHEDULE,
  IS_LOADED_GENERAL_SCHEDULE,
  IS_LOADING_GENERAL_SCHEDULE
} from '../actions/generalAction'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const InitialState = {
  userInfo: null,
  danhMuc: {
    listDeparture: [],
    listTypeSeat: [],
    listTimeSlot: [],
    listPromotion: []
  },
  danhMucIsLoaded: false,
  listTourPopular: [],
  isLoadedListTourPopular: false,
  isRegister: false,
  isLogin: false,
  scheduleList: [],
  scheduleIsLoading: false
}

// REDUCERS
const generalReducer = (state = InitialState, action) => {
  switch (action.type) {
    case SET_GENERAL_IS_REGISTER: {
      return update(state, {
        isRegister: { $set: action.payload }
      })
    }
    case SET_GENERAL_IS_LOGIN: {
      return update(state, {
        isLogin: { $set: action.payload }
      })
    }
    case GET_GENERAL_LIST_DEPARTURE: {
      return update(state, {
        danhMuc: { listDeparture: { $set: action.payload } }
      })
    }
    case GET_GENERAL_LIST_PROMOTION: {
      return update(state, {
        danhMuc: { listPromotion: { $set: action.payload } }
      })
    }

    case GET_GENERAL_LIST_TIME_SLOT: {
      return update(state, {
        danhMuc: { listTimeSlot: { $set: action.payload } }
      })
    }
    case GET_GENERAL_LIST_TYPE_SEAT: {
      return update(state, {
        danhMuc: { listTypeSeat: { $set: action.payload } }
      })
    }
    case IS_LOADED_GENERAL_DANHMUC: {
      return update(state, {
        danhMucIsLoaded: { $set: action.payload }
      })
    }
    case GET_GENERAL_LIST_TOUR_POPULAR: {
      return update(state, {
        listTourPopular: { $set: action.payload }
      })
    }
    case IS_LOADED_GENERAL_LIST_TOUR_POPULAR: {
      return update(state, {
        isLoadedListTourPopular: { $set: action.payload }
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
    case IS_LOADING_GENERAL_SCHEDULE: {
      return update(state, {
        scheduleIsLoading: { $set: true }
      })
    }
    case IS_LOADED_GENERAL_SCHEDULE: {
      return update(state, {
        scheduleIsLoading: { $set: false }
      })
    }
    case GET_GENERAL_LIST_SCHEDULE: {
      return update(state, {
        scheduleList: { $set: action.payload }
      })
    }

    default:
      return state
  }
}

const generalPersistConfig = {
  key: 'GeneralStore',
  storage: storage,
  blacklist: ['danhMuc', 'danhMucIsLoaded', 'listTourPopular', 'isLoadedListTourPopular']
}

export default persistReducer(generalPersistConfig, generalReducer)
