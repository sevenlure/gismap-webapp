import update from 'react-addons-update'
import { UPDATE_GENERAL_USER_INFO, CLEAR_GENERAL_USER_INFO } from '../actions/generalAction'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const InitialState = {
  userInfo: null
}

// REDUCERS
const generalReducer = (state = InitialState, action) => {
  switch (action.type) {
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
  blacklist: ['danhMuc']
}

export default persistReducer(generalPersistConfig, generalReducer)
