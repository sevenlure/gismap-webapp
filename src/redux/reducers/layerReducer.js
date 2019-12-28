import update from 'react-addons-update'
// import storage from 'redux-persist/lib/storage'
// import { persistReducer } from 'redux-persist'

import { LAYER_LOADING, LAYER_LOADED } from '../actions/layerAction'
import { HANHCHINH_UPDATE, HANHCHINH_LOADED } from '../actions/layerAction'
import { UPDATE_MARKER_GENERAL_COUNT_LOADED, UPDATE_MARKER_GENERAL_COUNT } from '../actions/layerAction'
import { UPDATE_MARKER_GENERAL_BY_KEY, UPDATE_MARKER_GENERAL_BY_KEY_LOADING } from '../actions/layerAction'
import { UPDATE_MARKER_OWN_COUNT_LOADED, UPDATE_MARKER_OWN_COUNT } from '../actions/layerAction'
import { UPDATE_MARKER_OWN_BY_KEY, UPDATE_MARKER_OWN_BY_KEY_LOADING } from '../actions/layerAction'

const InitialState = {
  isLoadingLayer: [],
  hanhChinhIsLoaded: false,
  hanhChinh: {
    province: [],
    district: [],
    ward: []
  },

  markerGeneralCountIsLoaded: false,
  markerGeneralCount: {},
  markerGeneral: {},

  markerOwnCountIsLoaded: false,
  markerOwnCount: {},
  markerOwn: {}
}

// REDUCERS
const layerReducer = (state = InitialState, action) => {
  switch (action.type) {
    /* #region  chung */
    case LAYER_LOADING: {
      return update(state, {
        isLoadingLayer: {
          $push: [action.payload]
        }
      })
    }
    case LAYER_LOADED: {
      return update(state, {
        isLoadingLayer: {
          $set: state.isLoadingLayer.filter(ele => ele != action.payload)
        }
      })
    }
    /* #endregion */
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
    // MARK  markerGeneral
    case UPDATE_MARKER_GENERAL_BY_KEY_LOADING: {
      const { key } = action.payload
      return update(state, {
        markerGeneral: {
          $merge: {
            [key]: {
              isLoading: true
            }
          }
        }
      })
    }
    case UPDATE_MARKER_GENERAL_BY_KEY: {
      const { key, list } = action.payload
      return update(state, {
        markerGeneral: {
          $merge: {
            [key]: {
              isLoading: false,
              list
            }
          }
        }
      })
    }
    /* #endregion */
    /* #region  marker own */
    case UPDATE_MARKER_OWN_COUNT_LOADED: {
      return update(state, {
        markerOwnCountIsLoaded: {
          $set: true
        }
      })
    }
    case UPDATE_MARKER_OWN_COUNT: {
      return update(state, {
        markerOwnCount: {
          $merge: action.payload
        }
      })
    }
    // MARK  markerOwn
    case UPDATE_MARKER_OWN_BY_KEY_LOADING: {
      const { key } = action.payload
      return update(state, {
        markerOwn: {
          $merge: {
            [key]: {
              isLoading: true
            }
          }
        }
      })
    }
    case UPDATE_MARKER_OWN_BY_KEY: {
      const { key, list } = action.payload
      return update(state, {
        markerOwn: {
          $merge: {
            [key]: {
              isLoading: false,
              list
            }
          }
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
