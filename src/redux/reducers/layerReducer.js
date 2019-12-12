import update from 'react-addons-update'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import { HANHCHINH_UPDATE, HANHCHINH_LOADED } from '../actions/layerAction'

const InitialState = {
  hanhChinhIsLoaded: false,
  hanhChinh: {
    province: [],
    district: [],
    ward: []
  }
}

// REDUCERS
const layerReducer = (state = InitialState, action) => {
  switch (action.type) {
    case HANHCHINH_LOADED: {
      return update(state, {
        hanhChinhIsLoaded: {
          $set: true
        }
      })
    }
    case HANHCHINH_UPDATE: {
      const { province, district, ward } = action.payload
      return update(state, {
        hanhChinh: {
          $set: {
            province,
            district,
            ward
          }
        }
      })
    }

    default:
      return state
  }
}

const layerPersistConfig = {
  key: 'LayerStore',
  storage: storage,
  blacklist: ['hanhChinh', 'hanhChinhIsLoaded']
}

export default persistReducer(layerPersistConfig, layerReducer)
