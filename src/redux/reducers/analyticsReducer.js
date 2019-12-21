import update from 'react-addons-update'
import { UPDATE_TARGET, UPDATE_FIELD_ARR, UPDATE_TABINFO } from '../actions/analyticsAction'

const InitialState = {
  __target: undefined
}

// REDUCERS
const analyticsReducer = (state = InitialState, action) => {
  switch (action.type) {
    case UPDATE_TARGET: {
      return update(state, {
        __target: {
          $set: action.payload
        }
      })
    }
    case UPDATE_FIELD_ARR: {
      const { key, fieldArr } = action.payload
      return update(state, {
        $merge: {
          [key]: {
            ...state[key],
            fieldArr: fieldArr
          }
        }
      })
    }
    case UPDATE_TABINFO: {
      const { key, value } = action.payload
      return update(state, {
        $merge: {
          [key]: {
            ...state[key],
            tabInfo: value
          }
        }
      })
    }
    default:
      return state
  }
}

export default analyticsReducer
