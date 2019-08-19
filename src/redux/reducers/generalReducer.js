import update from 'react-addons-update'
import {
  UPDATE_GENERAL_USER_INFO,
  CLEAR_GENERAL_USER_INFO,
  SET_BREADCRUMB
} from '../actions/generalAction'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const InitialState = {
  userInfo: null,
  danhMuc: {},
  danhMucIsLoaded: false,
  breadcrumb: ['']
}

// REDUCERS
const generalReducer = (state = InitialState, action) => {
  switch (action.type) {
    /* #region  userInfo */
    case UPDATE_GENERAL_USER_INFO: {
      return update(state, {
        userInfo: { $set: action.payload }
      })
    }
    case CLEAR_GENERAL_USER_INFO: {
      return InitialState
    }
    /* #endregion */

    /* #region  menu & breadcrumb */
    case SET_BREADCRUMB: {
      return update(state, {
        breadcrumb: { $set: action.payload }
      })
    }
    /* #endregion */
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
