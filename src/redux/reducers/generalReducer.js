import update from 'react-addons-update'
import {
  UPDATE_GENERAL_USER_INFO,
  CLEAR_GENERAL_USER_INFO,
  UPDATE_GENERAL_SUB_MENU,
  UPDATE_GENERAL_KEY_PATCH,
  UPDATE_GENERAL_SET_BREADCRUMB,
  GET_GENERAL_LIST_DEPARTMENT,
  GET_GENERAL_LIST_USER,
  IS_LOADED_GENERAL_DANHMUC
} from '../actions/generalAction'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const InitialState = {
  userInfo: null,
  menu: {
    subMenu: [],
    keyPath: [],
    breadcrumb: []
  },
  danhMuc: {
    listDepartment: [],
    listUser: []
  },
  danhMucIsLoaded: false
}

// REDUCERS
const generalReducer = (state = InitialState, action) => {
  switch (action.type) {
    case GET_GENERAL_LIST_USER: {
      return update(state, {
        danhMuc: {
          listUser: { $set: action.payload }
        }
      })
    }
    case GET_GENERAL_LIST_DEPARTMENT: {
      return update(state, {
        danhMuc: {
          listDepartment: { $set: action.payload }
        }
      })
    }
    case IS_LOADED_GENERAL_DANHMUC: {
      return update(state, {
        danhMucIsLoaded: { $set: action.payload }
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
    case UPDATE_GENERAL_SUB_MENU: {
      return update(state, {
        menu: { subMenu: { $set: action.payload } }
      })
    }
    case UPDATE_GENERAL_KEY_PATCH: {
      return update(state, {
        menu: { keyPath: { $set: action.payload } }
      })
    }
    case UPDATE_GENERAL_SET_BREADCRUMB: {
      return update(state, {
        menu: { breadcrumb: { $set: action.payload } }
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
