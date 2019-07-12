import update from 'react-addons-update'
import { UPDATE_GENERAL_USER_INFO, CLEAR_GENERAL_USER_INFO } from '../actions/generalAction'

const InitialState = {
  userInfo: null
}

// REDUCERS
export default (state = InitialState, action) => {
  switch (action.type) {
    case UPDATE_GENERAL_USER_INFO: {
      return update(state, {
        userInfo: { $set: action.payload }
      })
    }
    case CLEAR_GENERAL_USER_INFO: {
      return InitialState
    }
    default:
      return state
  }
}
