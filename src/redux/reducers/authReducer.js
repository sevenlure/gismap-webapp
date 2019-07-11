import update from 'react-addons-update'
import { UPDATE_USER_INFO } from '../actions/authAction'

const InitialState = {
  token: null,
  isAuthenticated: false
}

// REDUCERS
export default (state = InitialState, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO: {
      const { token } = action.payload
      return update(state, {
        token: { $set: token },
        isAuthenticated: { $set: token ? true : false }
      })
    }
    default:
      return state
  }
}
