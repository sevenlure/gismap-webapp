import uuid from 'uuid/v1'
import update from 'react-addons-update'
import { get as _get } from 'lodash-es'
import {
  UPDATE_TARGET,
  UPDATE_FIELD_ARR,
  UPDATE_FIELD_NOTE,
  UPDATE_TABINFO,
  UPDATE_BUFFER,
  UPDATE_FILTER,
  UPDATE_COUNT_APPLY
} from '../actions/analyticsAction'

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
    case UPDATE_FIELD_NOTE: {
      const { key, fieldNote } = action.payload
      return update(state, {
        $merge: {
          [key]: {
            ...state[key],
            fieldNote: fieldNote
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
            tabInfo: value,
            countApply: uuid()
          }
        }
      })
    }
    case UPDATE_BUFFER: {
      const { key, value } = action.payload
      return update(state, {
        $merge: {
          [key]: {
            ...state[key],
            tabBuffer: value,
            countApply: uuid()
          }
        }
      })
    }
    case UPDATE_FILTER: {
      const { key, value } = action.payload
      return update(state, {
        $merge: {
          [key]: {
            ...state[key],
            tabFilter: value,
            countApply: uuid()
          }
        }
      })
    }
    case UPDATE_COUNT_APPLY: {
      const { key } = action.payload
      const countValue = _get(state, `${key}.countApply`, 0)
      return update(state, {
        $merge: {
          [key]: {
            ...state[key],
            countApply: uuid()
          }
        }
      })
    }
    default:
      return state
  }
}

export default analyticsReducer
