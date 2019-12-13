import update from 'react-addons-update'
import { UPDATE_LAYER_CAP_HANH_CHINH, UPDATE_LAYER_VUNG_HANH_CHINH } from '../actions/filterAction'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const InitialState = {
  layer: {
    hanhChinh: {
      level: undefined,
      arrayIdSelected: []
    }
  }
}

// REDUCERS
const filterReducer = (state = InitialState, action) => {
  switch (action.type) {
    case UPDATE_LAYER_CAP_HANH_CHINH: {
      return update(state, {
        layer: {
          hanhChinh: {
            level: { $set: action.payload }
          }
        }
      })
    }
    case UPDATE_LAYER_VUNG_HANH_CHINH: {
      return update(state, {
        layer: {
          hanhChinh: {
            arrayIdSelected: { $set: action.payload }
          }
        }
      })
    }

    default:
      return state
  }
}

const generalPersistConfig = {
  key: 'FilterStore',
  storage: storage,
  blacklist: ['layer']
}

export default persistReducer(generalPersistConfig, filterReducer)
