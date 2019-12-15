import update from 'react-addons-update'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

// MARK  Layer
import { UPDATE_LAYER_CAP_HANH_CHINH, UPDATE_LAYER_VUNG_HANH_CHINH } from '../actions/filterAction'
// MARK  Marker
import { UPDATE_MARKER_WITH_KEY, UPDATE_MARKER_PANEL } from '../actions/filterAction'

const InitialState = {
  layer: {
    hanhChinh: {
      level: undefined,
      arrayIdSelected: []
    }
  },
  marker: {},
  markerActivePanel: undefined
}

// REDUCERS
const filterReducer = (state = InitialState, action) => {
  switch (action.type) {
    /* #region  Action Layer */
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
    /* #endregion */

    /* #region  Action Maker */
    case UPDATE_MARKER_WITH_KEY: {
      return update(state, {
        marker: {
          $merge: action.payload
        }
      })
    }
    case UPDATE_MARKER_PANEL: {
      return update(state, {
        markerActivePanel: {
          $set: action.payload
        }
      })
    }
    /* #endregion */

    default:
      return state
  }
}

// MARK  Mở đoạn code này khi cần persist deep
// const filterPersistConfig = {
//   key: 'FilterStore',
//   storage: storage,
//   blacklist: ['layer', 'marker', 'markerActivePanel']
// }

// export default persistReducer(filterPersistConfig, filterReducer)

export default filterReducer
