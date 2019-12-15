import update from 'react-addons-update'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import { HANHCHINH_UPDATE, HANHCHINH_LOADED } from '../actions/layerAction'
import { UPDATE_MARKER_GENERAL_COUNT_LOADED, UPDATE_MARKER_GENERAL_COUNT } from '../actions/layerAction'

const InitialState = {
  hanhChinhIsLoaded: false,
  hanhChinh: {
    province: [],
    district: [],
    ward: []
  },
  markerGeneralCountIsLoaded: false,
  markerGeneralCount: {}
}

// REDUCERS
const layerReducer = (state = InitialState, action) => {
  switch (action.type) {
    /* #region  Hanh chinh */
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
    /* #endregion */
    /* #region  marker general */
    case UPDATE_MARKER_GENERAL_COUNT_LOADED: {
      return update(state, {
        markerGeneralCountIsLoaded: {
          $set: true
        }
      })
    }
    case UPDATE_MARKER_GENERAL_COUNT: {
      return update(state, {
        markerGeneralCount: {
          $merge: action.payload
        }
      })
    }
    /* #endregion */
    default:
      return state
  }
}

// MARK  Mở đoạn code này khi cần persist deep
// const layerPersistConfig = {
//   key: 'LayerStore',
//   storage: storage
//   // blacklist: ['hanhChinh', 'hanhChinhIsLoaded', 'markerGeneralCountIsLoaded', 'markerGeneralCount']
// }
// export default persistReducer(layerPersistConfig, layerReducer)

export default layerReducer
