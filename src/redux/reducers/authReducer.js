import update from 'react-addons-update'
import { LOGIN_USER_INFO, LOGOUT_USER_INFO } from '../actions/authAction'

const InitialState = {
  token: null,
  isAuthenticated: false
}

// REDUCERS
const authReducer = (state = InitialState, action) => {
  switch (action.type) {
    case LOGIN_USER_INFO: {
      const { token } = action.payload
      return update(state, {
        token: { $set: token },
        isAuthenticated: { $set: token ? true : false }
      })
    }
    case LOGOUT_USER_INFO: {
      return InitialState
    }
    default:
      return state
  }
}

export default authReducer
